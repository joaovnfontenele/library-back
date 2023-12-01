import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { UseCase } from "src/shared/useCases/useCase";
import { BookRepository } from "../../repositories/BookRepository";



interface DeleteBookRequest {
    bookId: string
}

@Injectable()
export class DeleteBookUseCase extends UseCase {
    constructor(private bookRepository: BookRepository) {
        super()
    }
    async execute({ bookId }: DeleteBookRequest) {
        const Book = await this.bookRepository.findById(bookId)

        if (!Book) throw new NotFoundException()
        await this.bookRepository.delete(Book.id)
    }

}