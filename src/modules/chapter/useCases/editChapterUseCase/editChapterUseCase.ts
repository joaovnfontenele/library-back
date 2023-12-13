
import { Injectable, NotFoundException } from "@nestjs/common";
import { UseCase } from "src/shared/useCases/useCase";
import { ChapterRepository } from "../../repositories/ChapterRepository";
import { BookRepository } from "src/modules/book/repositories/BookRepository";
import { Chapter } from "../../entities/chapter";



interface EditChapterRequest {
    id: string,
    bookId: string
    title: string
    number: number
    url: string
    nextChapter: string

}

@Injectable()
export class EditChapterUseCase extends UseCase {
    constructor(
        private bookRepository: BookRepository,
        private chapterRepository: ChapterRepository,
    ) {
        super()
    }
    async execute({ url, bookId, nextChapter, number, title, id }: EditChapterRequest) {

        const book = await this.bookRepository.findById(bookId)

        if (!book) throw new NotFoundException()

        const chapter = new Chapter({ url, bookId, nextChapter, number, title }, id)

        await this.chapterRepository.save(chapter)
        return chapter
    }

}