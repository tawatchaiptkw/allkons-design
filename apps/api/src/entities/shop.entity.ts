import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Organization } from './organization.entity';

export enum ShopStatus {
    ACTIVE = 'ACTIVE',
    SUSPENDED = 'SUSPENDED',
    INACTIVE = 'INACTIVE',
}

@Entity('shops')
export class Shop {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ unique: true })
    slug: string;

    @Column({ nullable: true })
    description?: string;

    @Column({ nullable: true })
    logoUrl?: string;

    @Column({
        type: 'enum',
        enum: ShopStatus,
        default: ShopStatus.ACTIVE,
    })
    status: ShopStatus;

    @Column()
    organizationId: string;

    @ManyToOne(() => Organization, (org) => org.shops)
    @JoinColumn({ name: 'organizationId' })
    organization: Organization;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
