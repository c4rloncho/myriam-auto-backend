import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentCategoryController } from './document-category.controller';
import { DocumentCategoryService } from './document-category.service';
import { DocumentCategory } from './entities/document-category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([DocumentCategory]),
  ],
  controllers: [DocumentCategoryController],
  providers: [DocumentCategoryService],
  exports: [DocumentCategoryService],
})
export class DocumentCategoryModule { }
