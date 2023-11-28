import { UserRepositoryInMemory } from "src/modules/user/repositories/UserRepositoryInMemory";
import { CreateUserUseCase } from "src/modules/user/useCases/createUserUseCase/createUserUseCase";


let createUserUseCase: CreateUserUseCase
let userRepositoryInMemory: UserRepositoryInMemory

describe('Create user', () => {
    beforeEach(() => {
        userRepositoryInMemory = new UserRepositoryInMemory();
        createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
    })
    it('Should be able to create user', ()=>{
        expect(userRepositoryInMemory.users).toEqual([])
    })
})