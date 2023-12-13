import { Injectable, NotFoundException } from "@nestjs/common";
import { UseCase } from "src/shared/useCases/useCase";
import { ChapterRepository } from "../../repositories/ChapterRepository";
import { BookRepository } from "src/modules/book/repositories/BookRepository";
import { Chapter } from "../../entities/chapter";
import { ParagraphRepository } from "src/modules/paragraph/repositories/ParagraphRepository";
import { Paragraph } from "src/modules/paragraph/entities/paragraph";
import { ChapterWebScrapingRepository } from "../../repositories/ChapterWebScrapingRepository";

interface CreateChapterByUrRequest {
    bookId: string
    url: string
}

@Injectable()
export class createChapterByUrlUseCase extends UseCase {
    constructor(
        private bookRepository: BookRepository,
        private chapterRepository: ChapterRepository,
        private paragraphRepository: ParagraphRepository,
        private chapterWebScrapingRepository: ChapterWebScrapingRepository
    ) {
        super()
    }
    async execute({ url, bookId }: CreateChapterByUrRequest) {

        const book = await this.bookRepository.findById(bookId)

        if (!book) throw new NotFoundException()

        const numberTotalChapters = await this.chapterRepository.count({
            bookId
        })

        const { title, nextChapter, number, paragraphs } = await this.chapterWebScrapingRepository.findByUrl(url, book.siteId, numberTotalChapters)

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