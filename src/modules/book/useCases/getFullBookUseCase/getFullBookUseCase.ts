import { Injectable, NotFoundException } from "@nestjs/common";
import { UseCase } from "src/shared/useCases/useCase";
import { BookRepository } from "../../repositories/BookRepository";


@Injectable()
export class GetFullBookUseCase extends UseCase {
    constructor(private bookRepository: BookRepository) {
        super()
    }
    async execute({ bookId }: any): Promise<any> {

        const book = await this.bookRepository.findFullBook(bookId)

        if (!book) throw new NotFoundException()

        return book

    }
}