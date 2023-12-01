import { Module } from "@nestjs/common";
import { ChapterController } from "./chapter.controller";
import { DatabaseModule } from "src/infra/database/database.module";
import { WebScrapingModule } from "src/infra/webScraping/webScraping.module";
import { CreateChapterUseCase } from "src/modules/chapter/useCases/createChapterUseCase/createChapterUseCase";


@Module({
    imports: [DatabaseModule, WebScrapingModule],
    controllers: [ChapterController],
    providers: [
        CreateChapterUseCase
    ]

})

export class ChapterModule { }