import { Injectable } from "@nestjs/common";
import { Site } from "src/modules/site/entities/Site";
import { SiteRepository } from "src/modules/site/repositories/SiteRepository";
import { PrismaSiteMapper } from "../mappers/PrismaSiteMapper";
import { PrismaService } from "../prisma.service";



@Injectable()
export class PrismaSiteRepository implements SiteRepository {
    constructor(private prisma: PrismaService) { }
  

    async create(site: Site): Promise<void> {
        const siteRow = PrismaSiteMapper.toPrisma(site)
        await this.prisma.site.create({ data: siteRow })
    }

    async findById(id: string): Promise<Site | null> {
        const site = await this.prisma.site.findUnique({ where: { id: id } })

        if (!site) return null

        return PrismaSiteMapper.toDomain(site)
    }

    async findMany(page: number, perPage: number): Promise<Site[]> {
        const sites = await this.prisma.site.findMany({
            orderBy:{
                name:'asc'
            },
            
            take: perPage,
            skip: (page - 1) * perPage
        })
        return sites.map(PrismaSiteMapper.toDomain)
    }


    async save(site: Site): Promise<void> {
        await this.prisma.site.update({
            data: PrismaSiteMapper.toPrisma(site),
            where: {
                id: site.id
            }
        })
    }

    async delete(id: string): Promise<void> {
        await this.prisma.site.delete({
            where: {
                id: id
            }
        })
    }


   async count(query?: any): Promise<number> {
       return await  this.prisma.site.count({ where: query })
    }
}