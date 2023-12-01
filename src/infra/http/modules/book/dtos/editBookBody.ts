import { IsNotEmpty, IsString, IsUrl } from "class-validator"

export class EditBookBody {

    @IsNotEmpty()
    @IsString()
    title: string

    @IsString()
    description: string

    @IsString()
    image: string

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


