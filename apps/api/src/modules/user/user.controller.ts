import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserService } from './user.service';

@Controller('me')
export class UserController {
    constructor(private userService: UserService) { }

    @Get()
    @UseGuards(JwtAuthGuard)
    async getProfile(@Request() req) {
        return this.userService.getProfileBootstrap(req.user.id);
    }
}
