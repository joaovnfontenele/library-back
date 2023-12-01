import {  IsNotEmpty, IsString, IsUrl } from "class-validator"

export class EditStatusBody {

    @IsNotEmpty()
    @IsString()
    description: string
}