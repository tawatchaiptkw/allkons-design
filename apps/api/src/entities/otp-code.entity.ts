import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
} from 'typeorm';

@Entity('otp_codes')
export class OtpCode {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    phone: string;

    @Column()
    code: string;

    @Column()
    refCode: string;

    @Column()
    expiresAt: Date;

    @Column({ default: false })
    isUsed: boolean;

    @CreateDateColumn()
    createdAt: Date;
}
