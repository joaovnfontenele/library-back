import {  IsNotEmpty, IsString, IsUrl } from "class-validator"

export class EditSiteBody {

    @IsNotEmpty()
    @IsString()
    name: string
    
    @IsNotEmpty()
    @IsString()
    @IsUrl()
    url: string
}