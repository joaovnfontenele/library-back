import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { UserRepository } from "src/modules/user/repositories/UserRepository";
import { PrismaUserRepository } from "./prisma/repositories/PrismaUserRepository";
import { SiteRepository } from "src/modules/site/repositories/SiteRepository";
import { PrismaSiteRepository } from "./prisma/repositories/PrismaSiteRepository";
import { BookRepository } from "src/modules/book/repositories/BookRepository";
import { PrismaBookRepository } from "./prisma/repositories/PrismaBookRepository";
import { StatusRepository } from "src/modules/status/repositories/StatusRepository";
import { PrismaStatusRepository } from "./prisma/repositories/PrismaStatusRepository";
import { ChapterRepository } from "src/modules/chapter/repositories/ChapterRepository";
import { PrismaChapterRepository } from "./prisma/repositories/PrismaChapterRepository";
import { ParagraphRepository } from "src/modules/paragraph/repositories/ParagraphRepository";
import { PrismaParagraphRepository } from "./prisma/repositories/PrismaParagraphRepository";

@Module({
    providers: [PrismaService,
        {
            provide: UserRepository,
            useClass: PrismaUserRepository
        },
        {
            provide: SiteRepository,
            useClass: PrismaSiteRepository
        },
        {
            provide: BookRepository,
            useClass: PrismaBookRepository
        },

        {
            provide: StatusRepository,
            useClass: PrismaStatusRepository
        },
        {
            provide: ChapterRepository,
            useClass: PrismaChapterRepository
        },
        {
            provide: ParagraphRepository,
            useClass: PrismaParagraphRepository
        }
    ],
    exports: [UserRepository, SiteRepository, BookRepository, StatusRepository, ChapterRepository, ParagraphRepository]
})

export class DatabaseModule { }