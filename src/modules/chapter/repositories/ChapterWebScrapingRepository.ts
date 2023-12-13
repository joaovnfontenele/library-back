import { ChapterWeb } from "../entities/chapterWeb";





interface createChapterRequest {

}
export abstract class ChapterWebScrapingRepository {

    abstract findByUrl(url: string, siteId: string, number?:number): Promise<ChapterWeb>

}