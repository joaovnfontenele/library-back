import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from "@nestjs/swagger";
import { ChapterViewModel } from "./viewModel/ChapterViewModel";
import { CreateChapterUseCase } from "src/modules/chapter/useCases/createChapterUseCase/createChapterUseCase";
import { CreateChapterBody } from "./dtos/createChapterBody";


@ApiBearerAuth()
@ApiTags('chapters')
@Controller('chapters')
export class ChapterController {
    constructor(
        private createChapterUseCase: CreateChapterUseCase
    ) { }


    // @ApiQuery({ name: 'page', required: false, type: String })
    // @ApiQuery({ name: 'perPage', required: false, type: String })
    // @Get()
    // async getMany(@Query('page') page: string, @Query('perPage') perPage: string) {
    //     const sites = await this.getManyBookUseCase.execute({
    //         page,
    //         perPage
    //     })
    //     return sites.transformData(ChapterViewModel.toHttp)


    // }

    // @Get(":id")
    // async get(@Param('id') bookId: string) {
    //     const site = await this.getBookUseCase.execute({ bookId })
    //     return ChapterViewModel.toHttp(site)

    // }

    @Post()

    @ApiBody({
        type: [CreateChapterBody], examples: {
            a: {
                value: {
                    bookId: '',
                    nextChapter: '',
                    number: 0,
                    title: '',
                    url: '',
                    paragraphs: [{
                        content: '',
                        order: 0
                    }]
                } as CreateChapterBody
            }

        }
    })


    async create(@Body() body: CreateChapterBody) {
        const { bookId, nextChapter, number, title, url, paragraphs } = body
        const site = await this.createChapterUseCase.execute({
            bookId, nextChapter, number, title, url, paragraphs
        })

        return ChapterViewModel.toHttp(site)
    }

    // @ApiBody({
    //     type: [CreateBookByUrlBody], examples: {
    //         a: {
    //             value: {
    //                 url: '',
    //                 siteId: '',
    //                 statusId: ''
    //             } as CreateBookByUrlBody
    //         }

    //     }
    // })
    // @Post('web-scraping')
    // async createByUrl(@Body() body: CreateBookByUrlBody) {
    //     const { siteId, statusId, url } = body
    //     const site = await this.createBookByUrlUseCase.execute({
    //         siteId,
    //         url,
    //         statusId
    //     })

    //     return ChapterViewModel.toHttp(site)
    // }

    // @Put(":id")
    // async put(@Param('id') bookId: string, @Body() { image, siteId, statusId, title, url, description }: EditBookBody) {
    //     const site = await this.editBookUseCase.execute({
    //         bookId,
    //         image,
    //         siteId,
    //         statusId,
    //         title,
    //         url,
    //         description
    //     })

    //     return ChapterViewModel.toHttp(site)
    // }

    // @Delete(":id")
    // async delete(@Param('id') bookId: string) {
    //     await this.deleteBookUseCase.execute({ bookId })
    // }

}