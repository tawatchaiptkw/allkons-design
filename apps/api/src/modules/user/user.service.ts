import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { Organization } from '../../entities/organization.entity';
import { Shop } from '../../entities/shop.entity';

export interface ProfileBootstrapResponse {
    id: string;
    phone: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    hasOrg: boolean;
    orgId?: string;
    shops: Array<{
        id: string;
        name: string;
        slug: string;
    }>;
    onboardingCompleted: boolean;
}

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Organization)
        private organizationRepository: Repository<Organization>,
        @InjectRepository(Shop)
        private shopRepository: Repository<Shop>,
    ) { }

    async getProfileBootstrap(userId: string): Promise<ProfileBootstrapResponse> {
        const user = await this.userRepository.findOne({
            where: { id: userId },
        });

        if (!user) {
            throw new Error('User not found');
        }

        // Check if user has an organization
        const organization = await this.organizationRepository.findOne({
            where: { ownerId: userId },
        });

        let shops: Array<{ id: string; name: string; slug: string }> = [];

        if (organization) {
            const shopEntities = await this.shopRepository.find({
                where: { organizationId: organization.id },
                select: ['id', 'name', 'slug'],
            });
            shops = shopEntities.map((shop) => ({
                id: shop.id,
                name: shop.name,
                slug: shop.slug,
            }));
        }

        return {
            id: user.id,
            phone: user.phone,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            hasOrg: !!organization,
            orgId: organization?.id,
            shops,
            onboardingCompleted: user.onboardingCompleted,
        };
    }

    async updateProfile(
        userId: string,
        data: Partial<Pick<User, 'email' | 'firstName' | 'lastName'>>,
    ): Promise<User> {
        await this.userRepository.update(userId, data);
        return this.userRepository.findOne({ where: { id: userId } });
    }
}
