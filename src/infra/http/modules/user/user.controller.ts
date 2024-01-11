import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserUseCase } from "src/modules/user/useCases/createUserUseCase/createUserUseCase";
import { CreateUserBody } from "./dtos/createUserBody";
import { UserViewModel } from "./viewModel/userViewMOdel";
import { ApiTags } from "@nestjs/swagger";
import { Public } from "../auth/decorators/isPublic";

@ApiTags('users')
@Controller('users')
export class UserController {
    constructor(private createUserUseCase: CreateUserUseCase) { }
    @Public()
    @Post()
    async createUser(@Body() body: CreateUserBody) {
        const { email, password, name, login } = body
        const user = await this.createUserUseCase.execute({
            email,
            password,
            name,
            login
        })

        return UserViewModel.toHttp(user)
    }
}