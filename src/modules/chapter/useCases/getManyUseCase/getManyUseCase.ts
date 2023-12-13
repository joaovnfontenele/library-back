import { Injectable } from "@nestjs/common";
import { UseCase } from "src/shared/useCases/useCase";
import { Paginated } from "src/utils/pagination/Pagination";
import { PaginationRequestDto } from "src/utils/pagination/PaginationRequestDto";
import { ChapterRepository } from "../../repositories/ChapterRepository";
import { Chapter } from "../../entities/chapter";


interface GetManyChapterRequest extends PaginationRequestDto {
    bookId?: string
}

@Injectable()
export class GetManyChapterUseCase extends UseCase {
    constructor(private chapterRepository: ChapterRepository) {
        super()
    }
    async execute({ page, perPage, bookId }: GetManyChapterRequest) {
        const DEFAULT_PAGE = 1
        const DEFAULT_PER_PAGE = 5

        const currentPage = Number(page) || DEFAULT_PAGE
        const currentPerPage = Number(perPage) || DEFAULT_PER_PAGE
        const query = {
            bookId: bookId ?? undefined
        }




        const chapters = await this.chapterRepository.findMany(
            currentPage,
            currentPerPage,
            query

        )
        const total = await this.chapterRepository.count(query)

        const responsePagination = Paginated.toPagination<Chapter>(chapters, {
            currentPage: currentPage,
            perPage: currentPerPage,
            total
        })
        return responsePagination
    }

}