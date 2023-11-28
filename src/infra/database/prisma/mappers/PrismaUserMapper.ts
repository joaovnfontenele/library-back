
import { User } from "src/modules/user/entities/User";
import { User as UserRow } from "@prisma/client";

export class PrimaUserMapper {
    static toPrisma({ email, id, name, password }: User): UserRow {
        return {
            id,
            name,
            email,
            password
        }
    }

    static toDomain({ id, ...userData }: UserRow): User {
        return new User({ ...userData }, id)
    }
}