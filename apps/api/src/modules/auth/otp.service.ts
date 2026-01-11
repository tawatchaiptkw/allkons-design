import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OtpCode } from '../../entities/otp-code.entity';

@Injectable()
export class OtpService {
    constructor(
        @InjectRepository(OtpCode)
        private otpRepository: Repository<OtpCode>,
    ) { }

    async generateOtp(phone: string): Promise<{ refCode: string; expiresAt: Date }> {
        // Mock OTP: always "123456" for MVP
        const code = '123456';
        const refCode = this.generateRefCode();
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

        // Invalidate previous OTPs for this phone
        await this.otpRepository.update(
            { phone, isUsed: false },
            { isUsed: true },
        );

        // Create new OTP
        const otp = this.otpRepository.create({
            phone,
            code,
            refCode,
            expiresAt,
        });

        await this.otpRepository.save(otp);

        console.log(`📱 OTP for ${phone}: ${code} (Ref: ${refCode})`);

        return { refCode, expiresAt };
    }

    async verifyOtp(phone: string, code: string): Promise<boolean> {
        const otp = await this.otpRepository.findOne({
            where: {
                phone,
                code,
                isUsed: false,
            },
            order: {
                createdAt: 'DESC',
            },
        });

        if (!otp) {
            return false;
        }

        if (otp.expiresAt < new Date()) {
            return false;
        }

        // Mark as used
        otp.isUsed = true;
        await this.otpRepository.save(otp);

        return true;
    }

    private generateRefCode(): string {
        return Math.random().toString(36).substring(2, 8).toUpperCase();
    }
}
