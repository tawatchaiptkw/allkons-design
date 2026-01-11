import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shop } from '../../entities/shop.entity';
import { Organization } from '../../entities/organization.entity';
import { User } from '../../entities/user.entity';
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Shop, Organization, User])],
    controllers: [ShopController],
    providers: [ShopService],
    exports: [ShopService],
})
export class ShopModule { }
