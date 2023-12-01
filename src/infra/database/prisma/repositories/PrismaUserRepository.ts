import { User } from "src/modules/user/entities/User";
import { UserRepository } from "src/modules/user/repositories/UserRepository";
import { PrismaService } from "../prisma.service";
import { PrismaUserMapper } from "../mappers/PrismaUserMapper";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaUserRepository implements UserRepository {
    constructor(private prisma: PrismaService) { }

    async create(user: User): Promise<void> {
        const userRow = PrismaUserMapper.toPrisma(user)
        await this.prisma.user.create({
            data: userRow
        })
    }
    async findByLogin(login: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: {
                login
            }
        })

        if (!user) return null
        return PrismaUserMapper.toDomain(user)
    }
}