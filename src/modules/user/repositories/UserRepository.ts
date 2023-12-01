import { User } from "../entities/User";

export abstract class UserRepository {
    abstract create(user: User): Promise<void>
    abstract findByLogin(login: string): Promise<User | null>
}