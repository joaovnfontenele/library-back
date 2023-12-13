import {  IsNotEmpty, IsNumber, IsString, IsUrl } from "class-validator"

export class createChapterByUrlLoopingBody {
    @IsNotEmpty()
    @IsString()
    @IsUrl()
    url: string

    @IsNotEmpty()
    @IsString()
    bookId: string

    @IsNotEmpty()
    @IsNumber()
    looping: number

}