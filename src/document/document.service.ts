import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DocumentCategoryService } from 'src/document-category/document-category.service';
import { DocumentCategory } from 'src/document-category/entities/document-category.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { Document } from './entities/document.entity';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(Document)
    private readonly documentRepository: Repository<Document>,
    @InjectRepository(DocumentCategory)
    private readonly documentCategoryRepository: Repository<DocumentCategory>,
    private readonly documentCategoryService: DocumentCategoryService,
    private readonly userService: UserService,
  ) { }
  async create(documentData: CreateDocumentDto & {
    filename: string;
    fileSize: number;
    basePath: string;
    baseUrl: string;
    createdBy: number;
  }) {
    const {
      name,
      filename,
      emissionDate,
      expirationDate,
      documentCategoryId,
      entityId,
      basePath,
      baseUrl,
      createdBy,
      fileSize
    } = documentData;
    //verify if the category exists
    const document_category = await this.documentCategoryService.findOne(documentCategoryId);
    if (!document_category) {
      throw new Error(`Document Category with id ${documentCategoryId} not found`);
    }
    const userCreator = await this.userService.findOne(createdBy);
    if (!userCreator) {
      throw new Error(`User with id ${createdBy} not found`);
    }
    const document = new Document();
    document.name = name;
    document.filename = filename;
    document.emissionDate = emissionDate ? new Date(emissionDate) : null;
    document.expirationDate = expirationDate ? new Date(expirationDate) : null;
    document.fileSize = fileSize;
    document.basePath = basePath;
    document.baseUrl = baseUrl;
    document.entityId = entityId;
    document.documentCategoryId = documentCategoryId;
    //not id is user
    document.creator = userCreator;
    return this.documentRepository.save(document);
  }
  private formatDate(data: string) {

  }

  findAll() {
    return `This action returns all document`;
  }

  findOne(id: number) {
    return `This action returns a #${id} document`;
  }

  update(id: number, updateDocumentDto: UpdateDocumentDto) {
    return `This action updates a #${id} document`;
  }

  remove(id: number) {
    return `This action removes a #${id} document`;
  }

}
