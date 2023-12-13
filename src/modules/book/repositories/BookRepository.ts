import { Book } from "../entities/book";

export abstract class BookRepository {
    abstract create(book: Book): Promise<void>
    abstract findById(id: string): Promise<Book | null>
    abstract delete(id: string): Promise<void>
    abstract save(book: Book): Promise<void>
    abstract findMany(page: number, perPage: number, query?: any): Promise<Book[]>
    abstract findFullBook(id: string): Promise<Book | null>
    abstract count(query?: any): Promise<number>
}