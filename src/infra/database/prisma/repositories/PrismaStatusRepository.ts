import { Injectable } from "@nestjs/common";
import { StatusRepository } from "src/modules/status/repositories/StatusRepository";
import { PrismaService } from "../prisma.service";
import { PrismaStatusMapper } from "../mappers/PrismaStatusMapper";
import { Status } from "src/modules/status/entities/status";


@Injectable()
export class PrismaStatusRepository implements StatusRepository {
    constructor(private prisma: PrismaService) { }

    async create(site: Status): Promise<void> {
        const siteRow = PrismaStatusMapper.toPrisma(site)
        await this.prisma.status.create({ data: siteRow })
    }

    async findById(id: string): Promise<Status | null> {
        const status = await this.prisma.status.findUnique({ where: { id: id } })

        if (!status) return null

        return PrismaStatusMapper.toDomain(status)
    }

    async findMany(page: number, perPage: number): Promise<Status[]> {
        const sites = await this.prisma.status.findMany({
            orderBy: {
                description: 'asc'
            },

            take: perPage,
            skip: (page - 1) * perPage
        })
        return sites.map(PrismaStatusMapper.toDomain)
    }

    async delete(id: string): Promise<void> {
        await this.prisma.status.delete({
            where: {
                id: id
            }
        })
    }
    async save(status: Status): Promise<void> {
        await this.prisma.status.update({
            data: PrismaStatusMapper.toPrisma(status),
            where: {
                id: status.id
            }
        })
    }

    async count(query?: any): Promise<number> {
        return await this.prisma.status.count({ where: query })
    }

}