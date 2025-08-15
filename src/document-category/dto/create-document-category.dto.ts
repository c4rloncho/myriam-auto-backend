import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateDocumentCategoryDto {
    @IsString()
    @IsNotEmpty()
    entityType: string;

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
