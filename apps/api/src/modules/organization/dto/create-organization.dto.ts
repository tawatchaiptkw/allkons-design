import { IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { OrganizationType } from '../../../entities/organization.entity';

export class CreateOrganizationDto {
    @IsString()
    @IsNotEmpty()
    legalName: string;

    @IsEnum(OrganizationType)
    type: OrganizationType;

    @IsString()
    @IsOptional()
    taxId?: string;

    @IsString()
    @IsOptional()
    registrationNumber?: string;

    @IsString()
    @IsOptional()
    address?: string;
}
