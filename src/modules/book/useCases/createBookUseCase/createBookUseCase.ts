import { Injectable, NotFoundException } from "@nestjs/common";
import { UseCase } from "src/shared/useCases/useCase";
import { BookRepository } from "../../repositories/BookRepository";
import { Book } from "../../entities/Book";
import { SiteRepository } from "src/modules/site/repositories/SiteRepository";


interface createBookRequest {
    title: string
    description: string | null
    image: string
    url: string
    siteId: string
    statusId: string
}

@Injectable()
export class CreateBookUseCase extends UseCase {
    constructor(private bookRepository: BookRepository, private siteRepository: SiteRepository) {
        super()
    }
    async execute({ description, image, siteId, statusId, title, url }: createBookRequest) {

        const site = await this.siteRepository.findById(siteId)

        if (!site) throw new NotFoundException()

        const book = new Book({
            title,
            description,
            image,
            url,
            siteId,
            statusId
        })

        await this.bookRepository.create(book)
        return book
    }



}