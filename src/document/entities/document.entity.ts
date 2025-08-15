import { DocumentCategory } from 'src/document-category/entities/document-category.entity';
import { User } from 'src/user/entities/user.entity';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('document')
export class Document {
    @PrimaryGeneratedColumn('increment', { type: 'bigint' })
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    name: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    filename: string;

    @Column({ type: 'timestamp', default: null, nullable: true, name: 'emission_date' })
    emissionDate: Date | null;

    @Column({ type: 'timestamp', default: null, nullable: true, name: 'expiration_date' })
    expirationDate: Date | null;

    @Column({ type: 'bigint', nullable: true, name: 'file_size' })
    fileSize: number;

    @Column({ type: 'varchar', length: 500, nullable: true, name: 'base_path' })
    basePath: string;

    @Column({ type: 'varchar', length: 500, nullable: true, name: 'base_url' })
    baseUrl: string;

    @Column({ type: 'int', nullable: false, name: 'entity_id' })
    entityId: number;

    @Column({ type: 'int', nullable: false, name: 'document_category_id' })
    documentCategoryId: number;

    @Column({ type: 'int', nullable: true, name: 'created_by' })
    createdBy: number;

    @Column({ type: 'boolean', default: false, name: 'is_deleted' })
    isDeleted: boolean;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: Date;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    // Relaciones
    @ManyToOne(() => DocumentCategory, { onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'document_category_id' })
    documentCategory: DocumentCategory;

    @ManyToOne(() => User, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'created_by' })
    creator: User;
}
