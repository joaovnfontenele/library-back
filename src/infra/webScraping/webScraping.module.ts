import { Module } from "@nestjs/common";
import { BookWebScrapingRepository } from "src/modules/book/repositories/BookWebScrapingRepository";
import { PuppeteerBookRepository } from "./puppeteer/repositories/PuppeteerBookRepository";
import { ChapterWebScrapingRepository } from "src/modules/chapter/repositories/ChapterWebScrapingRepository";
import { PuppeteerChapterRepository } from "./puppeteer/repositories/PuppeteerChapterRepository";



@Module({
    providers: [
        {
            provide: BookWebScrapingRepository,
            useClass: PuppeteerBookRepository
        },
        {
            provide: ChapterWebScrapingRepository,
            useClass: PuppeteerChapterRepository
        }

    ],
    exports: [BookWebScrapingRepository, ChapterWebScrapingRepository]
})

export class WebScrapingModule { }