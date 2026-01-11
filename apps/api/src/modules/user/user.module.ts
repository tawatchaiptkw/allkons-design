import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { Organization } from '../../entities/organization.entity';
import { Shop } from '../../entities/shop.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
    imports: [TypeOrmModule.forFeature([User, Organization, Shop])],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule { }
