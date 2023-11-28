import { User } from "@prisma/client";

export class UserViewModel {
    static toHttp({ email, password, name, id }: User) {
        return {
            id,
            name,
            email
        }

    }
}