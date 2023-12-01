import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";

import { ChapterRepository } from "src/modules/chapter/repositories/ChapterRepository";
import { Chapter } from "src/modules/chapter/entities/chapter";
import { PrismaChapterMapper } from "../mappers/PrismaChapterMapper";



@Injectable()
export class PrismaChapterRepository implements ChapterRepository {
    constructor(private prisma: PrismaService) { }

    async create(chapter:Chapter): Promise<void> {
        const chapterRow = PrismaChapterMapper.toPrisma(chapter)
        await this.prisma.chapter.create({ data: chapterRow })
    }

    findById(id: string): Promise<Chapter | null> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    save(chapter: Chapter): Promise<void> {
        throw new Error("Method not implemented.");
    }
    findMany(page: number, perPage: number): Promise<Chapter[]> {
        throw new Error("Method not implemented.");
    }
    count(query?: any): Promise<number> {
        throw new Error("Method not implemented.");
    }
  


}