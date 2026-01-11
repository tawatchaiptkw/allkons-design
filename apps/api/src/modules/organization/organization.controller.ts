import { Controller, Post, Get, Body, UseGuards, Request, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { OrganizationService } from './organization.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';

@Controller('organizations')
@UseGuards(JwtAuthGuard)
export class OrganizationController {
    constructor(private organizationService: OrganizationService) { }

    @Post()
    async create(@Request() req, @Body(ValidationPipe) dto: CreateOrganizationDto) {
        return this.organizationService.create(req.user.id, dto);
    }

    @Get('mine')
    async getMine(@Request() req) {
        return this.organizationService.findByOwner(req.user.id);
    }
}
