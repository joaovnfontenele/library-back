import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { CreateBookBody } from "./dtos/createBookBody";
import { BookViewModel } from "./viewModel/bookViewModel";
import { EditBookBody } from "./dtos/editBookBody";
import { DeleteBookUseCase } from "src/modules/book/useCases/deleteBookUseCase/deleteBookUseCase";
import { GetBookUseCase } from "src/modules/book/useCases/getBookUseCase/getBookUseCase";
import { GetManyBookUseCase } from "src/modules/book/useCases/getManyUseCase/getManyUseCase";
import { EditBookUseCase } from "src/modules/book/useCases/editBookUseCase/editBookUseCase";
import { CreateBookUseCase } from "src/modules/book/useCases/createBookUseCase/createBookUseCase";
import { ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from "@nestjs/swagger";
import { CreateBookByUrlUseCase } from "src/modules/book/useCases/createBookByUrlUseCase/createBookByUrlUseCase";
import { CreateBookByUrlBody } from "./dtos/createBookByUrlBody";
import { Public } from "../auth/decorators/isPublic";


@ApiBearerAuth()
@ApiTags('books')
@Controller('books')
export class BookController {
    constructor(
        private createBookUseCase: CreateBookUseCase,
        private createBookByUrlUseCase: CreateBookByUrlUseCase,
        private editBookUseCase: EditBookUseCase,
        private deleteBookUseCase: DeleteBookUseCase,
        private getBookUseCase: GetBookUseCase,
        private getManyBookUseCase: GetManyBookUseCase,
    ) { }


    @ApiQuery({ name: 'page', required: false, type: String })
    @ApiQuery({ name: 'perPage', required: false, type: String })
    @Get()
    async getMany(@Query('page') page: string, @Query('perPage') perPage: string) {
        const sites = await this.getManyBookUseCase.execute({
            page,
            perPage
        })
        return sites.transformData(BookViewModel.toHttp)


    }

    @Get(":id")
    async get(@Param('id') bookId: string) {
        const site = await this.getBookUseCase.execute({ bookId })
        return BookViewModel.toHttp(site)

    }

    @Post()
    async create(@Body() body: CreateBookBody) {
        const { image, siteId, statusId, title, url, description } = body
        const site = await this.createBookUseCase.execute({
            image,
            siteId,
            statusId,
            title,
            url,
            description
        })

        return BookViewModel.toHttp(site)
    }

    @ApiBody({
        type: [CreateBookByUrlBody], examples: {
            a: {
                value: {
                    url: '',
                    siteId: '',
                    statusId: ''
                } as CreateBookByUrlBody
            }

        }
    })
    @Post('web-scraping')
    async createByUrl(@Body() body: CreateBookByUrlBody) {
        const { siteId, statusId, url } = body
        const site = await this.createBookByUrlUseCase.execute({
            siteId,
            url,
            statusId
        })

        return BookViewModel.toHttp(site)
    }

    @Put(":id")
    async put(@Param('id') bookId: string, @Body() { image, siteId, statusId, title, url, description }: EditBookBody) {
        const site = await this.editBookUseCase.execute({
            bookId,
            image,
            siteId,
            statusId,
            title,
            url,
            description
        })

        return BookViewModel.toHttp(site)
    }

    @Delete(":id")
    async delete(@Param('id') bookId: string) {
        await this.deleteBookUseCase.execute({ bookId })
    }

}