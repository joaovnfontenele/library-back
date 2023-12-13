import { Injectable, NotFoundException } from "@nestjs/common";
import { UseCase } from "src/shared/useCases/useCase";
import { BookRepository } from "../../repositories/BookRepository";
import { MergeEpub } from "src/utils/epubMaker";


@Injectable()
export class DownloadEpubUseCase extends UseCase {
    constructor(private bookRepository: BookRepository) {
        super()
    }
    async execute({ bookId }: any): Promise<any> {

        const book = await this.bookRepository.findFullBook(bookId)

        if (!book) throw new NotFoundException()

        const buffer = await MergeEpub.merge(book)

        return buffer
    }
}