import {  IsNotEmpty, IsString, IsUrl } from "class-validator"

export class CreateSiteBody {

    @IsNotEmpty()
    @IsString()
    name: string
    
    @IsNotEmpty()
    @IsString()
    @IsUrl()
    url: string
}