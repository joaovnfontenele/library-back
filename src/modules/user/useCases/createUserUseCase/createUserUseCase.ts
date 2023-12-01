import { Injectable } from "@nestjs/common";
import { UserRepository } from "../../repositories/UserRepository";
import { User } from "../../entities/User";
import { hash } from "bcrypt";
import { UseCase } from "src/shared/useCases/useCase";

interface CreateUserRequest {
    email: string
    name: string
    password: string
    login:string
}

@Injectable()
export class CreateUserUseCase extends UseCase {
    constructor(private userRepository: UserRepository) {
        super()
    }
    async execute({ email, name, password,login }: CreateUserRequest) {

        const user = new User({
            email: email,
            name: name,
            password: await hash(password, 10),
            login
        })

        await this.userRepository.create(user)
        return user

    }
}