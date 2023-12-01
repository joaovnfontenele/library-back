import { Module } from "@nestjs/common";
import { SiteController } from "./site.controller";
import { DatabaseModule } from "src/infra/database/database.module";
import { CreateSiteUseCase } from "src/modules/site/useCases/createSiteUseCase/createSiteUseCase";
import { EditSiteUseCase } from "src/modules/site/useCases/editSiteUseCase/editSiteUseCase";
import { DeleteSiteUseCase } from "src/modules/site/useCases/deleteSiteUseCase/deleteSiteUseCase";
import { GetSiteUseCase } from "src/modules/site/useCases/getSiteUseCase/getSiteUseCase";
import { GetManySiteUseCase } from "src/modules/site/useCases/getManyUseCase/getManyUseCase";

@Module({
    imports: [DatabaseModule],
    controllers: [SiteController],
    providers: [CreateSiteUseCase, EditSiteUseCase, DeleteSiteUseCase, GetSiteUseCase, GetManySiteUseCase]

})

export class SiteModule { }