import { Injectable, ConflictException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shop } from '../../entities/shop.entity';
import { Organization } from '../../entities/organization.entity';
import { User } from '../../entities/user.entity';
import { CreateShopDto } from './dto/create-shop.dto';

@Injectable()
export class ShopService {
    constructor(
        @InjectRepository(Shop)
        private shopRepository: Repository<Shop>,
        @InjectRepository(Organization)
        private organizationRepository: Repository<Organization>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async create(userId: string, dto: CreateShopDto): Promise<Shop> {
        // Verify organization belongs to user
        const organization = await this.organizationRepository.findOne({
            where: { id: dto.organizationId },
        });

        if (!organization) {
            throw new NotFoundException('Organization not found');
        }

        if (organization.ownerId !== userId) {
            throw new ForbiddenException('You do not own this organization');
        }

        // Check slug availability
        const existing = await this.shopRepository.findOne({
            where: { slug: dto.slug },
        });

        if (existing) {
            throw new ConflictException('Slug is already taken');
        }

        const shop = this.shopRepository.create(dto);
        const saved = await this.shopRepository.save(shop);

        // Mark user onboarding as complete
        await this.userRepository.update(userId, {
            onboardingCompleted: true,
        });

        return saved;
    }

    async checkSlugAvailability(slug: string): Promise<{ available: boolean }> {
        const existing = await this.shopRepository.findOne({
            where: { slug },
        });

        return { available: !existing };
    }

    async findByOrganization(organizationId: string): Promise<Shop[]> {
        return this.shopRepository.find({
            where: { organizationId },
        });
    }

    async findById(id: string): Promise<Shop> {
        const shop = await this.shopRepository.findOne({
            where: { id },
        });

        if (!shop) {
            throw new NotFoundException('Shop not found');
        }

        return shop;
    }
}
