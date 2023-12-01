import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { UseCase } from "src/shared/useCases/useCase";
import { SiteRepository } from "../../repositories/SiteRepository";



interface GetSiteRequest {
    siteId: string
}

@Injectable()
export class GetSiteUseCase extends UseCase {
    constructor(private siteRepository: SiteRepository) {
        super()
    }
    async execute({ siteId }: GetSiteRequest) {
        const site = await this.siteRepository.findById(siteId)

        if (!site) throw new NotFoundException()

        return site
    }

}