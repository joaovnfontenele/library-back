import { Module } from "@nestjs/common";
import { BookWebScrapingRepository } from "src/modules/book/repositories/BookWebScrapingRepository";
import { PuppeteerBookRepository } from "./puppeteer/repositories/PuppeteerBookRepository";



@Module({
    providers: [
        {
            provide: BookWebScrapingRepository,
            useClass: PuppeteerBookRepository
        }
    ],
    exports: [BookWebScrapingRepository]
})

export class WebScrapingModule { }