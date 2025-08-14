import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn,
} from 'typeorm';

export enum EntityType {
    USER = 'user',
    VEHICLE = 'vehicle',
}

@Entity('document_category')
@Unique(['name', 'entityType', 'isDeleted'])
export class DocumentCategory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'enum',
        enum: EntityType,
        nullable: false,
        name: 'entity_type'
    })
    entityType: EntityType;

    @Column({ type: 'varchar', length: 100, nullable: false })
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'boolean', default: true, name: 'is_active' })
    isActive: boolean;

    @Column({ type: 'boolean', default: false, name: 'is_deleted' })
    isDeleted: boolean;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: Date;
}
