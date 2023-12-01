import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { UseCase } from "src/shared/useCases/useCase";
import { SiteRepository } from "../../repositories/SiteRepository";



interface DeleteSiteRequest {
    siteId: string
}

@Injectable()
export class DeleteSiteUseCase extends UseCase {
    constructor(private siteRepository: SiteRepository) {
        super()
    }
    async execute({ siteId }: DeleteSiteRequest) {
        const site = await this.siteRepository.findById(siteId)

        if (!site) throw new NotFoundException()
        await this.siteRepository.delete(site.id)
    }

}