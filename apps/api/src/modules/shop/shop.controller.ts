import { Controller, Post, Get, Body, UseGuards, Request, ValidationPipe, Query } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ShopService } from './shop.service';
import { CreateShopDto, CheckSlugDto } from './dto/create-shop.dto';

@Controller('shops')
@UseGuards(JwtAuthGuard)
export class ShopController {
    constructor(private shopService: ShopService) { }

    @Post()
    async create(@Request() req, @Body(ValidationPipe) dto: CreateShopDto) {
        return this.shopService.create(req.user.id, dto);
    }

    @Get('check-slug')
    async checkSlug(@Query(ValidationPipe) query: CheckSlugDto) {
        return this.shopService.checkSlugAvailability(query.slug);
    }

    @Get()
    async getMyShops(@Request() req) {
        // Get user's organization first
        const user = await req.user;
        // This would need to be enhanced to get org ID
        // For now, return empty array
        return [];
    }
}
