import { Injectable } from "@nestjs/common";
import { ChapterWebScraping } from "../webScraping/ChapterWebScraping";
import { ChapterWebScrapingRepository } from "src/modules/chapter/repositories/ChapterWebScrapingRepository";
import { ChapterWeb } from "src/modules/chapter/entities/chapterWeb";



@Injectable()
export class PuppeteerChapterRepository implements ChapterWebScrapingRepository {
    async findByUrl(url: string, siteId: string, number?:number): Promise<ChapterWeb> {
        const chapter = await ChapterWebScraping.createChapter(url, siteId,number)
        return chapter
    }
}