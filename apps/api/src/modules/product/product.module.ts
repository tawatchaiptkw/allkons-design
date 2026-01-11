import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../../entities/product.entity';
import { Shop } from '../../entities/shop.entity';
import { Organization } from '../../entities/organization.entity';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Product, Shop, Organization])],
    controllers: [ProductController],
    providers: [ProductService],
    exports: [ProductService],
})
export class ProductModule { }
