import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { BookRepository } from "src/modules/book/repositories/BookRepository";
import { Book } from "src/modules/book/entities/Book";
import { PrismaBookMapper } from "../mappers/PrismaBookMapper";



@Injectable()
export class PrismaBookRepository implements BookRepository {
    constructor(private prisma: PrismaService) { }
  

    async create(book: Book): Promise<void> {
        const siteRow = PrismaBookMapper.toPrisma(book)
        await this.prisma.book.create({ data: siteRow })
    }

    async findById(id: string): Promise<Book | null> {
        const book = await this.prisma.book.findUnique({ where: { id: id } })

        if (!book) return null

        return PrismaBookMapper.toDomain(book)
    }

    async findMany(page: number, perPage: number): Promise<Book[]> {
        const books = await this.prisma.book.findMany({
            orderBy:{
                title:'asc'
            },
            take: perPage,
            skip: (page - 1) * perPage
        })
        return books.map(PrismaBookMapper.toDomain)
    }


    async save(book: Book): Promise<void> {
        await this.prisma.book.update({
            data: PrismaBookMapper.toPrisma(book),
            where: {
                id: book.id
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
       return await  this.prisma.book.count({ where: query })
    }
}