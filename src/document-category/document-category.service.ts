import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDocumentCategoryDto } from './dto/create-document-category.dto';
import { UpdateDocumentCategoryDto } from './dto/update-document-category.dto';
import { DocumentCategory, EntityType } from './entities/document-category.entity';

@Injectable()
export class DocumentCategoryService {
  constructor(
    @InjectRepository(DocumentCategory)
    private readonly documentCategoryRepository: Repository<DocumentCategory>,
  ) { }
  async create(input: CreateDocumentCategoryDto) {
    const { name, entityType, description, isActive, isDeleted } = input;
    const documentCategoryExist = await this.documentCategoryRepository.findOne({ where: { entityType } })
    return 'This action adds a new documentCategory';
  }

  findAll() {
    return `This action returns all documentCategory`;
  }

  findOne(id: number) {
    const documentCategory = this.documentCategoryRepository.findOne({
      where: { id, isActive: true, isDeleted: false },
    });
    if (!documentCategory) {
      throw new Error(`Document Category with id ${id} not found`);
    }
    return documentCategory;
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
        isDeleted: false
      }
    });
  }
}
