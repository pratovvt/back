import {IsEmail, IsString, IsStrongPassword} from "class-validator";

export class CreateUserDto {
    id: string;
    @IsEmail()
    email: string;
    @IsStrongPassword()
    password: string;
    @IsString()
    first_name: string;
    @IsString()
    last_name: string;
    @IsString()
    patronymic: string;
    @IsString()
    company_id: string;
}