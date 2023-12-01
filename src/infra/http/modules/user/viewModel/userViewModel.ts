import { User } from "src/modules/user/entities/User";


export class UserViewModel {
    static toHttp({ email, password, name, id }: User) {
        return {
            id,
            name,
            email
        }

    }
}