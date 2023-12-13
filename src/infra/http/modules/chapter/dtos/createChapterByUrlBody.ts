import {  IsNotEmpty, IsString, IsUrl } from "class-validator"

export class createChapterByUrlBody {
    @IsNotEmpty()
    @IsString()
    @IsUrl()
    url: string

    @IsNotEmpty()
    @IsString()
    bookId: string

}