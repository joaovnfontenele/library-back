import {  IsNotEmpty, IsString, IsUrl } from "class-validator"

export class CreateBookByUrlBody {


    @IsNotEmpty()
    @IsString()
    @IsUrl()
    url: string

    @IsNotEmpty()
    @IsString()
    siteId: string

    @IsNotEmpty()
    @IsString()
    statusId: string
}