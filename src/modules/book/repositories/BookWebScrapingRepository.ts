import { BookWeb } from "../entities/BookWeb";

export abstract class BookWebScrapingRepository {

    abstract findByUrl(url: string, siteId: string): Promise<BookWeb>

}