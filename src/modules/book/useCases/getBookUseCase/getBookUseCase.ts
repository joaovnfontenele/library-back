import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { UseCase } from "src/shared/useCases/useCase";
import { BookRepository } from "../../repositories/BookRepository";



interface GetBookRequest {
    bookId: string
}

@Injectable()
export class GetBookUseCase extends UseCase {
    constructor(private bookRepository: BookRepository) {
        super()
    }
    async execute({ bookId }: GetBookRequest) {
        const book = await this.bookRepository.findById(bookId)

        if (!book) throw new NotFoundException()

        return book
    }

}