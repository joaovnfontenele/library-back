
import { Chapter as ChapterRow, Paragraph as ParagraphRow } from "@prisma/client";
import { Chapter } from "src/modules/chapter/entities/chapter";
import { Paragraph } from "src/modules/paragraph/entities/paragraph";

interface ChapterIncludeParagraphs extends ChapterRow {
    paragraphs: ParagraphRow[]
}



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

    static toDomainIncludeParagraphs({ id, paragraphs, ...userData }: ChapterIncludeParagraphs): Chapter {

        const paragraphChapter = paragraphs.map((paragraph) => {
            return new Paragraph(paragraph)
        })

        return new Chapter({ ...userData, paragraphs: paragraphChapter }, id)
    }
}