import { makeUser } from "src/infra/http/modules/user/factories/userFactory"
import { UserRepositoryInMemory } from "../../repositories/UserRepositoryInMemory"
import { CreateUserUseCase } from "./createUserUseCase"
import { hash } from "bcrypt"

let createUserUseCase: CreateUserUseCase
let userRepositoryInMemory: UserRepositoryInMemory

describe('Create user', () => {
    beforeEach(() => {
        userRepositoryInMemory = new UserRepositoryInMemory();
        createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
    })
    it('Should be able to create user', async () => {
        expect(userRepositoryInMemory.users).toEqual([])

        const user = makeUser({
            password: await hash('123', 10)
        })

        
    })
})