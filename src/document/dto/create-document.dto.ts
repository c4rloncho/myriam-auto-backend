import { Type } from 'class-transformer';
import {
    IsDateString,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsPositive,
    IsString,
    MaxLength
} from 'class-validator';

export class CreateDocumentDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    name: string;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    filename?: string;

    @IsOptional()
    @IsDateString()
    emissionDate?: string;

    @IsOptional()
    @IsDateString()
    expirationDate?: string;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    @Type(() => Number)
    fileSize?: number;

    @IsOptional()
    @IsString()
    @MaxLength(500)
    basePath?: string;

    @IsOptional()
    @IsString()
    @MaxLength(500)
    baseUrl?: string;

    @IsNumber()
    @IsPositive()
    @Type(() => Number)
    entityId: number;

    @IsNumber()
    @IsPositive()
    @Type(() => Number)
    documentCategoryId: number;

}
