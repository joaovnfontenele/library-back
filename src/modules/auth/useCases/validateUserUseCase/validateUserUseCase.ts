import { Injectable, UnauthorizedException } from "@nestjs/common";
import { compare } from "bcrypt";
import { UserRepository } from "src/modules/user/repositories/UserRepository";

interface ValidateUserRequest {
    email: string
    password: string
}

@Injectable()
export class validateUserUseCase {
    constructor(private userRepository: UserRepository) { }

    async execute({ email, password }: ValidateUserRequest) {
        const user = await this.userRepository.findByEmail(email)

        if (!user) throw new UnauthorizedException('Email ou Senha incorretos')

        const isPasswordMatched = await compare(password, user.password)
        
        if (!isPasswordMatched) {
            throw new UnauthorizedException('Email ou Senha incorretos')
        }
        return user
    }
}