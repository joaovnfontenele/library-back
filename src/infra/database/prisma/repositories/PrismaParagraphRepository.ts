import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { ParagraphRepository } from "src/modules/paragraph/repositories/ParagraphRepository";
import { Paragraph } from "src/modules/paragraph/entities/paragraph";
import { PrismaParagraphMapper } from "../mappers/PrismaParagraphMapper";



@Injectable()
export class PrismaParagraphRepository implements ParagraphRepository {
    constructor(private prisma: PrismaService) { }
     async create(paragraph:Paragraph): Promise<void> {
        const paragraphRow = PrismaParagraphMapper.toPrisma(paragraph)
        await this.prisma.paragraph.create({ data: paragraphRow })
    }
    findById(id: string): Promise<Paragraph | null> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    save(paragraph: Paragraph): Promise<void> {
        throw new Error("Method not implemented.");
    }
    findMany(page: number, perPage: number): Promise<Paragraph[]> {
        throw new Error("Method not implemented.");
    }
    count(query?: any): Promise<number> {
        throw new Error("Method not implemented.");
    }



 


}