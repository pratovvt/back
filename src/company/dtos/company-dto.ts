import {IsString} from "class-validator";

export class CreateCompanyDto {
    id: string;
    @IsString()
    name: string;
    @IsString()
    address: string;
    @IsString()
    phone: string;
}