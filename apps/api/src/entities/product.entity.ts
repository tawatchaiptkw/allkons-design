import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Shop } from './shop.entity';

export enum ProductStatus {
    DRAFT = 'DRAFT',
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
}

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ type: 'text', nullable: true })
    description?: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number;

    @Column({ type: 'int', default: 0 })
    stock: number;

    @Column({ nullable: true })
    sku?: string;

    @Column({ type: 'simple-array', nullable: true })
    images?: string[];

    @Column({
        type: 'enum',
        enum: ProductStatus,
        default: ProductStatus.DRAFT,
    })
    status: ProductStatus;

    @Column()
    shopId: string;

    @ManyToOne(() => Shop)
    @JoinColumn({ name: 'shopId' })
    shop: Shop;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
