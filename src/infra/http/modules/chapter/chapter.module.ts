import { Module } from "@nestjs/common";
import { ChapterController } from "./chapter.controller";
import { DatabaseModule } from "src/infra/database/database.module";
import { WebScrapingModule } from "src/infra/webScraping/webScraping.module";
import { CreateChapterUseCase } from "src/modules/chapter/useCases/createChapterUseCase/createChapterUseCase";
import { createChapterByUrlUseCase } from "src/modules/chapter/useCases/createChapterByUrlUseCase/createChapterByUrlUseCase";
import { GetChapterUseCase } from "src/modules/chapter/useCases/getChapterUseCase/getChapterUseCase";
import { CreateChapterByUrlLoopingUseCase } from "src/modules/chapter/useCases/createChapterByUrlLoopingUseCase/createChapterByUrlLoopingUseCase";
import { GetManyChapterUseCase } from "src/modules/chapter/useCases/getManyUseCase/getManyUseCase";
import { DeleteChapterUseCase } from "src/modules/chapter/useCases/deleteChapterUseCase/deleteChapterUseCase";
import { EditChapterUseCase } from "src/modules/chapter/useCases/editChapterUseCase/editChapterUseCase";


@Module({
    imports: [DatabaseModule, WebScrapingModule],
    controllers: [ChapterController],
    providers: [
        CreateChapterUseCase,
        createChapterByUrlUseCase,
        CreateChapterByUrlLoopingUseCase,
        GetChapterUseCase,
        GetManyChapterUseCase,
        DeleteChapterUseCase,
        EditChapterUseCase
    ]

})

export class ChapterModule { }