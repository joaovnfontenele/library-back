import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"

export class SignInBody {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    login: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string
}