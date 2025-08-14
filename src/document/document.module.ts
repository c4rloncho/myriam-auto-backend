import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentCategoryModule } from 'src/document-category/document-category.module';
import { DocumentCategory } from 'src/document-category/entities/document-category.entity';
import { UserModule } from 'src/user/user.module';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';
import { Document } from './entities/document.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Document, DocumentCategory]),
    DocumentCategoryModule,
    UserModule,
  ],
  controllers: [DocumentController],
  providers: [DocumentService],
})
export class DocumentModule { }
