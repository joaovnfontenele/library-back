import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { UseCase } from "src/shared/useCases/useCase";
import { BookRepository } from "../../repositories/BookRepository";

interface EditBookRequest {
    bookId: string
    title: string
    description: string
    image: string
    url: string
    siteId: string
    statusId: string
}

@Injectable()
export class EditBookUseCase extends UseCase {
    constructor(private bookRepository: BookRepository) {
        super()
    }
    async execute({ bookId, title, description, image, url, statusId, siteId }: EditBookRequest) {
        const book = await this.bookRepository.findById(bookId)

        if (!book) throw new NotFoundException()

        book.title = title
        book.description = description
        book.image = image
        book.url = url
        book.statusId = statusId
        book.siteId = siteId

        await this.bookRepository.save(book)

        return book
    }

}