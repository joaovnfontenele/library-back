import { Controller, Get, Param, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiQuery, ApiTags } from "@nestjs/swagger";
import { GetManyStatusUseCase } from "src/modules/status/useCases/getManyUseCase/getManyUseCase";
import { StatusViewModel } from "./viewModel/statusViewModel";
import { GetStatusUseCase } from "src/modules/status/useCases/getStatusUseCase/getStatusUseCase";


@ApiTags('status')
@ApiBearerAuth()
@Controller('status')
export class StatusController {
    constructor(private getManyStatusUseCase: GetManyStatusUseCase,private getStatusUseCase:GetStatusUseCase) { }

    @ApiQuery({ name: 'page', required: false, type: String })
    @ApiQuery({ name: 'perPage', required: false, type: String })
    @Get()
    async getMany(@Query('page') page?: string, @Query('perPage') perPage?: string) {
        const sites = await this.getManyStatusUseCase.execute({
            page,
            perPage
        })
        return sites.transformData(StatusViewModel.toHttp)
    }
    @Get(":id")
    async get(@Param('id') statusId: string) {
        const status = await this.getStatusUseCase.execute({ statusId })
        return StatusViewModel.toHttp(status)

    }
}