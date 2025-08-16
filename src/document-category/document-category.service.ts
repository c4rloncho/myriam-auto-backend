import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDocumentCategoryDto } from './dto/create-document-category.dto';
import { UpdateDocumentCategoryDto } from './dto/update-document-category.dto';
import {
  DocumentCategory,
  EntityType,
} from './entities/document-category.entity';

@Injectable()
export class DocumentCategoryService {
  constructor(
    @InjectRepository(DocumentCategory)
    private readonly documentCategoryRepository: Repository<DocumentCategory>,
  ) {}
  async create(input: CreateDocumentCategoryDto) {
    const {
      name,
      entityType,
      description,
      isActive = true,
      isDeleted = false,
    } = input;

    const existingCategory = await this.documentCategoryRepository.findOne({
      where: { name, entityType, isDeleted: false },
    });

    if (existingCategory) {
      throw new ConflictException(
        `Document category '${name}' already exists for ${entityType}`,
      );
    }

    const documentCategory = this.documentCategoryRepository.create({
      name,
      entityType,
      description,
      isActive,
      isDeleted,
    });

    return this.documentCategoryRepository.save(documentCategory);
  }

  findAll() {
    return `This action returns all documentCategory`;
  }

  async findOne(id: number) {
    const documentCategory = await this.documentCategoryRepository.findOne({
      where: { id, isActive: true, isDeleted: false },
    });
    if (!documentCategory) {
      throw new Error(`Document Category with id ${id} not found`);
    }
    return documentCategory;
  }
  async findByName(name: string, entityType: string) {
    return this.documentCategoryRepository.findOne({
      where: {
        name,
        entityType: entityType as EntityType,
        isActive: true,
        isDeleted: false,
      },
    });
  }

  update(id: number, updateDocumentCategoryDto: UpdateDocumentCategoryDto) {
    return `This action updates a #${id} documentCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} documentCategory`;
  }
  async findByEntityType(entityType: EntityType) {
    return this.documentCategoryRepository.find({
      where: {
        entityType,
        isActive: true,
        isDeleted: false,
      },
    });
  }
}
