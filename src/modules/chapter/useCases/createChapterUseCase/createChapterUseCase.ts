import { Injectable, NotFoundException } from "@nestjs/common";
import { UseCase } from "src/shared/useCases/useCase";
import { SiteRepository } from "src/modules/site/repositories/SiteRepository";
import { ChapterRepository } from "../../repositories/ChapterRepository";
import { BookRepository } from "src/modules/book/repositories/BookRepository";
import { Chapter } from "../../entities/chapter";
import { ParagraphRepository } from "src/modules/paragraph/repositories/ParagraphRepository";
import { Paragraph } from "src/modules/paragraph/entities/paragraph";

interface ParagraphsRequest {
    content: string
    order: number
}

interface createChapterRequest {
    bookId: string
    title: string
    number: number
    url: string
    nextChapter: string
    paragraphs?: ParagraphsRequest[]
}

@Injectable()
export class CreateChapterUseCase extends UseCase {
    constructor(
        private bookRepository: BookRepository,
        private chapterRepository: ChapterRepository,
        private paragraphRepository: ParagraphRepository
    ) {
        super()
    }
    async execute({ url, bookId, nextChapter, number, title, paragraphs }: createChapterRequest) {

        const book = await this.bookRepository.findById(bookId)

        if (!book) throw new NotFoundException()

        const chapter = new Chapter({ url, bookId, nextChapter, number, title })

        await this.chapterRepository.create(chapter)

        if (paragraphs && paragraphs.length) {
             await Promise.all(paragraphs.map(async (paragraph) => {
                const createParagraph = new Paragraph({
                    ...paragraph,
                    chapterId: chapter.id
                })
                await this.paragraphRepository.create(createParagraph)
                return createParagraph
            }))
        }

        return chapter
    }



}