import { Injectable, UnauthorizedException } from "@nestjs/common";
import { compare } from "bcrypt";
import { UserRepository } from "src/modules/user/repositories/UserRepository";

interface ValidateUserRequest {
    login: string
    password: string
}

@Injectable()
export class validateUserUseCase {
    constructor(private userRepository: UserRepository) { }

    async execute({ login, password }: ValidateUserRequest) {
        const user = await this.userRepository.findByLogin(login)

        if (!user) throw new UnauthorizedException('login ou Senha incorretos')

        const isPasswordMatched = await compare(password, user.password)
        
        if (!isPasswordMatched) {
            throw new UnauthorizedException('login ou Senha incorretos')
        }
        return user
    }
}