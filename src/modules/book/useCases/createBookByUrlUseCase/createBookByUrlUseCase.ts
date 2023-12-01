import { Injectable, NotFoundException } from "@nestjs/common";
import { UseCase } from "src/shared/useCases/useCase";
import { BookRepository } from "../../repositories/BookRepository";
import { Book } from "../../entities/Book";
import { SiteRepository } from "src/modules/site/repositories/SiteRepository";
import { BookWebScrapingRepository } from "../../repositories/BookWebScrapingRepository";


interface createBookByUrlRequest {
    url: string
    siteId: string
    statusId: string
}

@Injectable()
export class CreateBookByUrlUseCase extends UseCase {
    constructor(
        private bookRepository: BookRepository,
        private siteRepository: SiteRepository,
        private bookWebScrapingRepository: BookWebScrapingRepository
    ) {
        super()
    }
    async execute({ url, siteId, statusId }: createBookByUrlRequest) {

        const site = await this.siteRepository.findById(siteId)

        if (!site) throw new NotFoundException()

        const { description, image, title } = await this.bookWebScrapingRepository.findByUrl(url, siteId)

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