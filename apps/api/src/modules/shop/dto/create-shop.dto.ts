import { IsString, IsNotEmpty, Matches, IsOptional } from 'class-validator';

export class CreateShopDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    @Matches(/^[a-z0-9-]+$/, {
        message: 'Slug must contain only lowercase letters, numbers, and hyphens',
    })
    slug: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsNotEmpty()
    organizationId: string;
}

export class CheckSlugDto {
    @IsString()
    @IsNotEmpty()
    slug: string;
}
