import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organization } from '../../entities/organization.entity';
import { User } from '../../entities/user.entity';
import { CreateOrganizationDto } from './dto/create-organization.dto';

@Injectable()
export class OrganizationService {
    constructor(
        @InjectRepository(Organization)
        private organizationRepository: Repository<Organization>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async create(userId: string, dto: CreateOrganizationDto): Promise<Organization> {
        // Check if user already has an organization
        const existing = await this.organizationRepository.findOne({
            where: { ownerId: userId },
        });

        if (existing) {
            throw new ConflictException('User already has an organization');
        }

        const organization = this.organizationRepository.create({
            ...dto,
            ownerId: userId,
        });

        const saved = await this.organizationRepository.save(organization);

        // Update user onboarding status
        await this.userRepository.update(userId, {
            onboardingCompleted: false, // Still need to create shop
        });

        return saved;
    }

    async findByOwner(userId: string): Promise<Organization | null> {
        return this.organizationRepository.findOne({
            where: { ownerId: userId },
            relations: ['shops'],
        });
    }

    async findById(id: string): Promise<Organization> {
        const org = await this.organizationRepository.findOne({
            where: { id },
            relations: ['shops'],
        });

        if (!org) {
            throw new NotFoundException('Organization not found');
        }

        return org;
    }
}
