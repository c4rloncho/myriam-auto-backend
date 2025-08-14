import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterUserDto {
    @IsString()
    @IsNotEmpty()
    username: string;
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;
    @IsString()
    @IsNotEmpty()
    name: string;
    @IsEmail()
    email: string;
}
