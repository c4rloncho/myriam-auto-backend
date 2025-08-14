import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DocumentCategoryService } from './document-category.service';
import { CreateDocumentCategoryDto } from './dto/create-document-category.dto';
import { UpdateDocumentCategoryDto } from './dto/update-document-category.dto';

@Controller('document-category')
export class DocumentCategoryController {
  constructor(private readonly documentCategoryService: DocumentCategoryService) {}

  @Post()
  create(@Body() createDocumentCategoryDto: CreateDocumentCategoryDto) {
    return this.documentCategoryService.create(createDocumentCategoryDto);
  }

  @Get()
  findAll() {
    return this.documentCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.documentCategoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDocumentCategoryDto: UpdateDocumentCategoryDto) {
    return this.documentCategoryService.update(+id, updateDocumentCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.documentCategoryService.remove(+id);
  }
}
