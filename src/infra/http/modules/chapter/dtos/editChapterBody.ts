import { IsNotEmpty, IsNumber, IsString, IsUrl } from "class-validator"

export class EditChapterBody {


    @IsNotEmpty()
    @IsString()
    bookId: string

    @IsNotEmpty()
    @IsString()
    title: string

    @IsNotEmpty()
    number: number

    @IsNotEmpty()
    @IsString()
    @IsUrl()
    url: string

    @IsNotEmpty()
    @IsString()
    nextChapter: string

    paragraphs?: {
        content: string
        order: number
    }[]
}