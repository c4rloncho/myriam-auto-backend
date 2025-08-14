import { User } from 'src/user/entities/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('Vehicle')
export class Vehicle {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    licensePlate: string;

    @Column()
    brand: string;

    @Column()
    model: string;

    @Column()
    year: number;

    @Column()
    color: string;

    @Column({
        type: 'enum',
        enum: ['CAR', 'TRUCK', 'PICKUP', 'MOTORCYCLE', 'BUS', 'VAN'],
        comment: 'Vehicle type'
    })
    type: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => User, user => user.vehicles)
    owner: User;
}
