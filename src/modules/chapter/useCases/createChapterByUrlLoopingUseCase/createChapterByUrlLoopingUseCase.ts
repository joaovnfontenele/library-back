import { Injectable, NotFoundException } from "@nestjs/common";
import { UseCase } from "src/shared/useCases/useCase";
import { ChapterRepository } from "../../repositories/ChapterRepository";
import { BookRepository } from "src/modules/book/repositories/BookRepository";
import { Chapter } from "../../entities/chapter";
import { ParagraphRepository } from "src/modules/paragraph/repositories/ParagraphRepository";
import { Paragraph } from "src/modules/paragraph/entities/paragraph";
import { ChapterWebScrapingRepository } from "../../repositories/ChapterWebScrapingRepository";

interface CreateChapterByUrlLoopingRequest {
    bookId: string
    url: string
    looping: number
}

@Injectable()
export class CreateChapterByUrlLoopingUseCase extends UseCase {
    constructor(
        private bookRepository: BookRepository,
        private chapterRepository: ChapterRepository,
        private paragraphRepository: ParagraphRepository,
        private chapterWebScrapingRepository: ChapterWebScrapingRepository
    ) {
        super()
    }
    async execute({ url, bookId, looping }: CreateChapterByUrlLoopingRequest) {

        const book = await this.bookRepository.findById(bookId)

        if (!book) throw new NotFoundException()

        let currentUrl = url

        for (var i = 0; i < looping; i++) {

            const { title, nextChapter, number, paragraphs } = await this.chapterWebScrapingRepository.findByUrl(currentUrl, book.siteId)

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

            currentUrl = nextChapter

        }
    }



}