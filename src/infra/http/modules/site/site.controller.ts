import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { CreateSiteUseCase } from "src/modules/site/useCases/createSiteUseCase/createSiteUseCase";
import { CreateSiteBody } from "./dtos/createSiteBody";
import { SiteViewModel } from "./viewModel/siteViewModel";
import { EditSiteUseCase } from "src/modules/site/useCases/editSiteUseCase/editSiteUseCase";
import { EditSiteBody } from "./dtos/editSiteBody";
import { DeleteSiteUseCase } from "src/modules/site/useCases/deleteSiteUseCase/deleteSiteUseCase";
import { GetSiteUseCase } from "src/modules/site/useCases/getSiteUseCase/getSiteUseCase";
import { GetManySiteUseCase } from "src/modules/site/useCases/getManyUseCase/getManyUseCase";
import { ApiBearerAuth, ApiQuery, ApiTags } from "@nestjs/swagger";


@ApiTags('sites')
@ApiBearerAuth()
@Controller('sites')
export class SiteController {
    constructor(
        private createSiteUseCase: CreateSiteUseCase,
        private editSiteUseCase: EditSiteUseCase,
        private deleteSiteUseCase: DeleteSiteUseCase,
        private getSiteUseCase: GetSiteUseCase,
        private getManySiteUseCase: GetManySiteUseCase,
    ) { }

    @ApiQuery({ name: 'page', required: false, type: String })
    @ApiQuery({ name: 'perPage', required: false, type: String })
    @Get()
    async getMany(@Query('page') page?: string, @Query('perPage') perPage?: string) {
        const sites = await this.getManySiteUseCase.execute({
            page,
            perPage
        })
        return sites.transformData(SiteViewModel.toHttp)


    }

    @Get(":id")
    async get(@Param('id') siteId: string) {
        const site = await this.getSiteUseCase.execute({ siteId })
        return SiteViewModel.toHttp(site)

    }

    @Post()
    async create(@Body() body: CreateSiteBody) {
        const { name, url } = body
        const site = await this.createSiteUseCase.execute({
            name,
            url
        })

        return SiteViewModel.toHttp(site)
    }

    @Put(":id")
    async put(@Param('id') siteId: string, @Body() { name, url }: EditSiteBody) {
        const site = await this.editSiteUseCase.execute({
            siteId,
            name,
            url
        })

        return SiteViewModel.toHttp(site)
    }

    @Delete(":id")
    async delete(@Param('id') siteId: string) {
        await this.deleteSiteUseCase.execute({ siteId })
    }

}