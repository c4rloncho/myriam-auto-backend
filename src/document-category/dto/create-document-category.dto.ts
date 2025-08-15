import { IsNotEmpty, IsString } from "class-validator";

export class CreateDocumentCategoryDto {
    @IsString()
    @IsNotEmpty()
    entityType: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    description: string;
}
