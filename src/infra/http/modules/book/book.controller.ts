import { Body, Controller, Delete, Get, Param, Post, Put, Query, Res } from "@nestjs/common";
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
import { GetFullBookUseCase } from "src/modules/book/useCases/getFullBookUseCase/getFullBookUseCase";
import { FullBookViewModel } from "./viewModel/fullBookViewModel";
import { DownloadEpubUseCase } from "src/modules/book/useCases/downloadEpubUseCase/downloadEpubUseCase";
import { Response } from "express";


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
        private getFullBookUseCase: GetFullBookUseCase,
        private downloadEpubUseCase: DownloadEpubUseCase
    ) { }


    @ApiQuery({ name: 'page', required: false, type: String })
    @ApiQuery({ name: 'perPage', required: false, type: String })
    @ApiQuery({ name: 'title', required: false, type: String })
    @Get()
    async getMany(@Query('page') page: string, @Query('perPage') perPage: string, @Query('title') title?: string) {
        const sites = await this.getManyBookUseCase.execute({
            page,
            perPage,
            title
        })
        return sites.transformData(BookViewModel.toHttp)


    }

    @Get(":id")
    async get(@Param('id') bookId: string) {
        const site = await this.getBookUseCase.execute({ bookId })
        return BookViewModel.toHttp(site)

    }

    @Get("full-book/:id")
    async getFullBook(@Param('id') bookId: string) {
        const site = await this.getFullBookUseCase.execute({ bookId })
        return FullBookViewModel.toHttp(site)

    }
    @Public()
    @Get("download-epub/:id")
    async downloadEpub(@Res() res: Response,@Param('id') bookId: string) {
        const book = await this.getBookUseCase.execute({ bookId })
        const file = await this.downloadEpubUseCase.execute({ bookId })
        
        res.set({
            'Content-Type': 'application/epub',
            'Content-Disposition': `attachment; filename=${book?.title?.replaceAll(' ', '-')}.epub`
          })
          res.send(file)
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