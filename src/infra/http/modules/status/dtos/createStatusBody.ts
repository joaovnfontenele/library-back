import { IsNotEmpty, IsString, IsUrl } from "class-validator"

export class CreateStatusBody {

    @IsNotEmpty()
    @IsString()
    description: string
}