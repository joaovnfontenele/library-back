
import { Chapter as ChapterRow } from "@prisma/client";
import { Chapter } from "src/modules/chapter/entities/chapter";


export class PrismaChapterMapper {
    static toPrisma({ id, bookId, nextChapter, number, title, url }: Chapter): ChapterRow {
        return {
            id,
            bookId,
            title,
            url,
            number,
            nextChapter
        }
    }

    static toDomain({ id, ...userData }: ChapterRow): Chapter {
        return new Chapter({ ...userData }, id)
    }
}