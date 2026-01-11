import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany,
    JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Shop } from './shop.entity';

export enum OrganizationType {
    INDIVIDUAL = 'INDIVIDUAL',
    REGISTERED_BUSINESS = 'REGISTERED_BUSINESS',
    JURISTIC = 'JURISTIC',
}

export enum VerificationStatus {
    PENDING = 'PENDING',
    VERIFIED = 'VERIFIED',
    REJECTED = 'REJECTED',
}

@Entity('organizations')
export class Organization {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    legalName: string;

    @Column({
        type: 'enum',
        enum: OrganizationType,
        default: OrganizationType.INDIVIDUAL,
    })
    type: OrganizationType;

    @Column({ nullable: true })
    taxId?: string;

    @Column({ nullable: true })
    registrationNumber?: string;

    @Column({
        type: 'enum',
        enum: VerificationStatus,
        default: VerificationStatus.PENDING,
    })
    verificationStatus: VerificationStatus;

    @Column({ nullable: true })
    address?: string;

    @Column()
    ownerId: string;

    @ManyToOne(() => User, (user) => user.organizations)
    @JoinColumn({ name: 'ownerId' })
    owner: User;

    @OneToMany(() => Shop, (shop) => shop.organization)
    shops: Shop[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
