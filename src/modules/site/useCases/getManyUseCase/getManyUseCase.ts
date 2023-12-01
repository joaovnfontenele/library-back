import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { UseCase } from "src/shared/useCases/useCase";
import { SiteRepository } from "../../repositories/SiteRepository";

import { Site } from "../../entities/Site";
import { Paginated } from "src/utils/pagination/Pagination";
import { PaginationRequestDto } from "src/utils/pagination/PaginationRequestDto";



interface GetManySiteRequest extends PaginationRequestDto { }

@Injectable()
export class GetManySiteUseCase extends UseCase {
    constructor(private siteRepository: SiteRepository) {
        super()
    }
    async execute({ page, perPage }: GetManySiteRequest) {
        const DEFAULT_PAGE = 1
        const DEFAULT_PER_PAGE = 5

        const currentPage = Number(page) || DEFAULT_PAGE
        const currentPerPage = Number(perPage) || DEFAULT_PER_PAGE

        const sites = await this.siteRepository.findMany(
            currentPage,
            currentPerPage
        )
        const total = await this.siteRepository.count()

        const responsePagination = Paginated.toPagination<Site>(sites, {
            currentPage: currentPage,
            perPage: currentPerPage,
            total
        })
        return responsePagination
    }

}