import { Injectable } from "@nestjs/common";
import { BookWeb } from "src/modules/book/entities/BookWeb";
import { BookWebScrapingRepository } from "src/modules/book/repositories/BookWebScrapingRepository";
import { BookWebScraping } from "../webScraping/BookWebScraping";



@Injectable()
export class PuppeteerBookRepository implements BookWebScrapingRepository {
    async findByUrl(url: string, siteId: string): Promise<BookWeb> {
        const book = await BookWebScraping.createBook(url, siteId)
        return book
    }
}