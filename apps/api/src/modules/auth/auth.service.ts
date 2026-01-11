import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { OtpService } from './otp.service';
import { RequestOtpDto, VerifyOtpDto, LoginResponseDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService,
        private otpService: OtpService,
    ) { }

    async requestOtp(dto: RequestOtpDto) {
        const { refCode, expiresAt } = await this.otpService.generateOtp(dto.phone);

        return {
            refCode,
            expiresAt,
            message: 'OTP sent successfully (check console for mock OTP)',
        };
    }

    async verifyOtp(dto: VerifyOtpDto): Promise<LoginResponseDto> {
        const isValid = await this.otpService.verifyOtp(dto.phone, dto.otp);

        if (!isValid) {
            throw new UnauthorizedException('Invalid or expired OTP');
        }

        // Find or create user
        let user = await this.userRepository.findOne({
            where: { phone: dto.phone },
        });

        if (!user) {
            user = this.userRepository.create({
                phone: dto.phone,
                isActive: true,
                onboardingCompleted: false,
            });
            await this.userRepository.save(user);
        }

        // Generate JWT
        const payload = { sub: user.id, phone: user.phone };
        const accessToken = this.jwtService.sign(payload);

        return {
            accessToken,
            user: {
                id: user.id,
                phone: user.phone,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
            },
        };
    }

    async validateUser(userId: string): Promise<User | null> {
        return this.userRepository.findOne({ where: { id: userId } });
    }
}
