import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { EntityType } from '../entities/document-category.entity';

export class CreateDocumentCategoryDto {
  @IsString()
  @IsNotEmpty()
  entityType: EntityType;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;

  @IsBoolean()
  isActive: boolean;

  @IsBoolean()
  isDeleted: boolean;
}
