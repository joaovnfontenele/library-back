import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { UseCase } from "src/shared/useCases/useCase";
import { BookRepository } from "../../repositories/BookRepository";

import { Book } from "../../entities/Book";
import { Paginated } from "src/utils/pagination/Pagination";
import { PaginationRequestDto } from "src/utils/pagination/PaginationRequestDto";



interface GetManyBookRequest extends PaginationRequestDto {
    title?: string
}

@Injectable()
export class GetManyBookUseCase extends UseCase {
    constructor(private bookRepository: BookRepository) {
        super()
    }
    async execute({ page, perPage, title }: GetManyBookRequest) {
        const DEFAULT_PAGE = 1
        const DEFAULT_PER_PAGE = 5

        const currentPage = Number(page) || DEFAULT_PAGE
        const currentPerPage = Number(perPage) || DEFAULT_PER_PAGE

        const query = {
            title: {
                contains: title ?? undefined
            }
        }

        const books = await this.bookRepository.findMany(
            currentPage,
            currentPerPage,
            query
        )
        const total = await this.bookRepository.count(query)

        const responsePagination = Paginated.toPagination<Book>(books, {
            currentPage: currentPage,
            perPage: currentPerPage,
            total
        })
        return responsePagination
    }

}