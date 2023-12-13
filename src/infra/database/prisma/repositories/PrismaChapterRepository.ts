import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";

import { ChapterRepository } from "src/modules/chapter/repositories/ChapterRepository";
import { Chapter } from "src/modules/chapter/entities/chapter";
import { PrismaChapterMapper } from "../mappers/PrismaChapterMapper";



@Injectable()
export class PrismaChapterRepository implements ChapterRepository {
    constructor(private prisma: PrismaService) { }

    async create(chapter: Chapter): Promise<void> {
        const chapterRow = PrismaChapterMapper.toPrisma(chapter)
        await this.prisma.chapter.create({ data: chapterRow })
    }

    async findById(id: string): Promise<Chapter | null> {
        const chapter = await this.prisma.chapter.findUnique({
            where: { id: id }, include: {
                paragraphs: {
                    orderBy: {
                        order: "asc"
                    }
                }
            }
        })

        if (!chapter) return null

        return PrismaChapterMapper.toDomainIncludeParagraphs(chapter)
    }
    async delete(id: string): Promise<void> {
        await this.prisma.chapter.delete({
            where: {
                id: id
            }
        })
    }
    async save(chapter: Chapter): Promise<void> {
        const chapterRow = PrismaChapterMapper.toPrisma(chapter)
        await this.prisma.chapter.update({
            data: chapterRow,
            where: {
                id: chapter.id
            }
        })
    }
    async findMany(page: number, perPage: number, query?: any): Promise<Chapter[]> {
        const chapters = await this.prisma.chapter.findMany({
            where: query,
            orderBy: {
                number: 'desc'
            },
            take: perPage,
            skip: (page - 1) * perPage
        })
        return chapters.map(PrismaChapterMapper.toDomain)
    }
    async count(query?: any): Promise<number> {
        return await this.prisma.chapter.count({ where: query })

    }



}