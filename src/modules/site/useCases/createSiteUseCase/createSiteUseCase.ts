import { Injectable } from "@nestjs/common";
import { UseCase } from "src/shared/useCases/useCase";
import { SiteRepository } from "../../repositories/SiteRepository";
import { Site } from "../../entities/Site";


interface createSiteRequest {
    name: string
    url: string
}

@Injectable()
export class CreateSiteUseCase extends UseCase {
    constructor(private siteRepository: SiteRepository) {
        super()
    }
    async execute({ name, url }: createSiteRequest) {
        const site = new Site({
            name,
            url
        })

        await this.siteRepository.create(site)
        return site
    }



}