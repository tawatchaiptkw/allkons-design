import { IsString, IsNotEmpty, Matches } from 'class-validator';

export class RequestOtpDto {
    @IsString()
    @IsNotEmpty()
    @Matches(/^\+66[0-9]{9}$/, {
        message: 'Phone must be a valid Thai phone number (+66XXXXXXXXX)',
    })
    phone: string;
}

export class VerifyOtpDto {
    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsString()
    @IsNotEmpty()
    otp: string;
}

export class LoginResponseDto {
    accessToken: string;
    refreshToken?: string;
    user: {
        id: string;
        phone: string;
        email?: string;
        firstName?: string;
        lastName?: string;
    };
}
