import { User } from "src/modules/user/entities/User";
import { UserRepository } from "src/modules/user/repositories/UserRepository";
import { PrismaService } from "../prisma.service";
import { PrimaUserMapper } from "../mappers/PrismaUserMapper";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrimaUserRepository implements UserRepository {
    constructor(private prisma: PrismaService) { }

    async create(user: User): Promise<void> {
        const userRow = PrimaUserMapper.toPrisma(user)
        await this.prisma.user.create({
            data: userRow
        })
    }
    async findByEmail(email: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: {
                email
            }
        })

        if (!user) return null
        return PrimaUserMapper.toDomain(user)
    }
}