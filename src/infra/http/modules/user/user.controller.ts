import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserUseCase } from "src/modules/user/useCases/createUserUseCase/createUserUseCase";
import { CreateUserBody } from "./dtos/createUserBody";
import { UserViewModel } from "./viewModel/userViewMOdel";

@Controller('users')
export class UserController {
    constructor(private createUserUseCase: CreateUserUseCase) { }
    @Post()
    async createUser(@Body() body: CreateUserBody) {
        const { email, password, name } = body
        const user = await this.createUserUseCase.execute({
            email,
            password,
            name
        })

        return UserViewModel.toHttp(user)
    }
}