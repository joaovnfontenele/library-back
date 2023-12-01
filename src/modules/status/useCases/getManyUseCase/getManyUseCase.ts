import { Injectable, NotFoundException } from "@nestjs/common";
import { UseCase } from "src/shared/useCases/useCase";
import { StatusRepository } from "../../repositories/StatusRepository";
import { PaginationRequestDto } from "src/utils/pagination/PaginationRequestDto";
import { Paginated } from "src/utils/pagination/Pagination";
import { Status } from "../../entities/status";

interface GetManyStatusRequest extends PaginationRequestDto {

}

@Injectable()
export class GetManyStatusUseCase extends UseCase {
    constructor(private statusRepository: StatusRepository) {
        super()
    }
    async execute({ page, perPage }: GetManyStatusRequest) {
        const DEFAULT_PAGE = 1
        const DEFAULT_PER_PAGE = 5

        const currentPage = Number(page) || DEFAULT_PAGE
        const currentPerPage = Number(perPage) || DEFAULT_PER_PAGE

        const status = await this.statusRepository.findMany(currentPage, currentPerPage)

        const total = await this.statusRepository.count()

        const responsePagination = Paginated.toPagination<Status>(status,
            {
                currentPage,
                perPage: currentPerPage,
                total
            }
        )

        return responsePagination
    }
}