import { Book as BookRow } from "@prisma/client";
import { Book } from "src/modules/Book/entities/Book";
import { Chapter } from "src/modules/chapter/entities/chapter";
import { Paragraph } from "src/modules/paragraph/entities/paragraph";

interface fullBook {
    chapter: {
        id: string,
        title: string,
        bookId: string
        number: number
        url: string
        nextChapter: string
        paragraphs: {
            id: string;
            chapterId: string;
            content: string;
            order: number;
        }[];
    }[],
    id:string
    title: string
    siteId: string
    statusId: string
    description: string | null
    image: string
    url: string
}

export class PrismaBookMapper {
    static toPrisma({ description, id, image, siteId, statusId,
        title, url }: Book): BookRow {
        return {
            id,
            title,
            description,
            url,
            image,
            statusId,
            siteId,
        }
    }

    static toDomain({ id, ...userData }: BookRow): Book {
        return new Book({ ...userData }, id)
    }

    static toDomainFullBook({ id, ...userData }: fullBook ): Book {

        const chapters = userData.chapter.map((item) => {

            const paragraphs = item.paragraphs.map((paragraph) => {
                return new Paragraph({
                    chapterId: paragraph.chapterId,
                    content: paragraph.content,
                    order: paragraph.order
                }, paragraph.id)
            })

            return new Chapter({
                bookId: item.bookId,
                nextChapter: item.nextChapter,
                number: item.number,
                title: item.title,
                url: item.url,
                paragraphs
            }, item.id)

        })

        return new Book({
            description: userData.title,
            image: userData.image,
            siteId: userData.siteId,
            statusId:userData.statusId,
            title: userData.title,
            url: userData.url,
            chapters
        }, id)
    }
}

