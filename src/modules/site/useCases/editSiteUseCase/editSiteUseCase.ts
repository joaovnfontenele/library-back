import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { UseCase } from "src/shared/useCases/useCase";
import { SiteRepository } from "../../repositories/SiteRepository";



interface EditSiteRequest {
    name: string
    url: string
    siteId: string
}

@Injectable()
export class EditSiteUseCase extends UseCase {
    constructor(private siteRepository: SiteRepository) {
        super()
    }
    async execute({ siteId, name, url }: EditSiteRequest) {
        const site = await this.siteRepository.findById(siteId)

        if (!site) throw new NotFoundException()

        site.name = name
        site.url = url

        await this.siteRepository.save(site)

        return site
    }

}