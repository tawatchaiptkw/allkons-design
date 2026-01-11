import { IsString, IsNotEmpty, IsNumber, IsOptional, IsEnum, Min } from 'class-validator';
import { ProductStatus } from '../../../entities/product.entity';

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsNumber()
    @Min(0)
    price: number;

    @IsNumber()
    @Min(0)
    stock: number;

    @IsString()
    @IsOptional()
    sku?: string;

    @IsString()
    @IsNotEmpty()
    shopId: string;
}

export class UpdateProductDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsNumber()
    @Min(0)
    @IsOptional()
    price?: number;

    @IsNumber()
    @Min(0)
    @IsOptional()
    stock?: number;

    @IsString()
    @IsOptional()
    sku?: string;

    @IsEnum(ProductStatus)
    @IsOptional()
    status?: ProductStatus;
}
