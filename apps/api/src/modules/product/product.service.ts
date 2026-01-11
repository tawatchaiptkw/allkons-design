import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../entities/product.entity';
import { Shop } from '../../entities/shop.entity';
import { Organization } from '../../entities/organization.entity';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
        @InjectRepository(Shop)
        private shopRepository: Repository<Shop>,
        @InjectRepository(Organization)
        private organizationRepository: Repository<Organization>,
    ) { }

    async create(userId: string, dto: CreateProductDto): Promise<Product> {
        // Verify shop ownership
        await this.verifyShopOwnership(userId, dto.shopId);

        const product = this.productRepository.create(dto);
        return this.productRepository.save(product);
    }

    async findAll(userId: string, shopId: string): Promise<Product[]> {
        // Verify shop ownership
        await this.verifyShopOwnership(userId, shopId);

        return this.productRepository.find({
            where: { shopId },
            order: { createdAt: 'DESC' },
        });
    }

    async findOne(userId: string, id: string): Promise<Product> {
        const product = await this.productRepository.findOne({
            where: { id },
            relations: ['shop'],
        });

        if (!product) {
            throw new NotFoundException('Product not found');
        }

        // Verify ownership
        await this.verifyShopOwnership(userId, product.shopId);

        return product;
    }

    async update(userId: string, id: string, dto: UpdateProductDto): Promise<Product> {
        const product = await this.findOne(userId, id);

        Object.assign(product, dto);
        return this.productRepository.save(product);
    }

    async remove(userId: string, id: string): Promise<void> {
        const product = await this.findOne(userId, id);
        await this.productRepository.remove(product);
    }

    private async verifyShopOwnership(userId: string, shopId: string): Promise<void> {
        const shop = await this.shopRepository.findOne({
            where: { id: shopId },
            relations: ['organization'],
        });

        if (!shop) {
            throw new NotFoundException('Shop not found');
        }

        const organization = await this.organizationRepository.findOne({
            where: { id: shop.organizationId },
        });

        if (!organization || organization.ownerId !== userId) {
            throw new ForbiddenException('You do not have access to this shop');
        }
    }
}
