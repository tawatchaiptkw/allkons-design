import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RequestOtpDto, VerifyOtpDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('otp/request')
    async requestOtp(@Body(ValidationPipe) dto: RequestOtpDto) {
        return this.authService.requestOtp(dto);
    }

    @Post('otp/verify')
    async verifyOtp(@Body(ValidationPipe) dto: VerifyOtpDto) {
        return this.authService.verifyOtp(dto);
    }
}
