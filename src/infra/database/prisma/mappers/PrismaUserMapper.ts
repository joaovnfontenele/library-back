
import { User } from "src/modules/user/entities/User";
import { User as UserRow } from "@prisma/client";

export class PrismaUserMapper {
    static toPrisma({ email, id, name, password, login }: User): UserRow {
        return {
            id,
            name,
            email,
            password,
            login
        }
    }

    static toDomain({ id, ...userData }: UserRow): User {
        return new User({ ...userData }, id)
    }
}