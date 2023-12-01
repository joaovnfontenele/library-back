import { Module } from "@nestjs/common";
import { BookController } from "./book.controller";
import { DatabaseModule } from "src/infra/database/database.module";
import { CreateBookUseCase } from "src/modules/book/useCases/createBookUseCase/createBookUseCase";
import { EditBookUseCase } from "src/modules/book/useCases/editBookUseCase/editBookUseCase";
import { DeleteBookUseCase } from "src/modules/book/useCases/deleteBookUseCase/deleteBookUseCase";
import { GetBookUseCase } from "src/modules/book/useCases/getBookUseCase/getBookUseCase";
import { GetManyBookUseCase } from "src/modules/book/useCases/getManyUseCase/getManyUseCase";
import { CreateBookByUrlUseCase } from "src/modules/book/useCases/createBookByUrlUseCase/createBookByUrlUseCase";
import { WebScrapingModule } from "src/infra/webScraping/webScraping.module";


@Module({
    imports: [DatabaseModule, WebScrapingModule],
    controllers: [BookController],
    providers: [CreateBookUseCase,
        EditBookUseCase,
        DeleteBookUseCase,
        GetBookUseCase,
        GetManyBookUseCase,
        CreateBookByUrlUseCase
    ]

})

export class BookModule { }