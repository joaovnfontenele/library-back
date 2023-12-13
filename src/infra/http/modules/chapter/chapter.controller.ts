import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from "@nestjs/swagger";
import { ChapterViewModel } from "./viewModel/ChapterViewModel";
import { CreateChapterUseCase } from "src/modules/chapter/useCases/createChapterUseCase/createChapterUseCase";
import { CreateChapterBody } from "./dtos/createChapterBody";
import { createChapterByUrlUseCase } from "src/modules/chapter/useCases/createChapterByUrlUseCase/createChapterByUrlUseCase";
import { createChapterByUrlBody } from "./dtos/createChapterByUrlBody";
import { GetChapterUseCase } from "src/modules/chapter/useCases/getChapterUseCase/getChapterUseCase";
import { CreateChapterByUrlLoopingUseCase } from "src/modules/chapter/useCases/createChapterByUrlLoopingUseCase/createChapterByUrlLoopingUseCase";
import { createChapterByUrlLoopingBody } from "./dtos/createChapterByUrlBodyLooping";
import { GetManyChapterUseCase } from "src/modules/chapter/useCases/getManyUseCase/getManyUseCase";
import { DeleteChapterUseCase } from "src/modules/chapter/useCases/deleteChapterUseCase/deleteChapterUseCase";
import { EditChapterUseCase } from "src/modules/chapter/useCases/editChapterUseCase/editChapterUseCase";
import { EditChapterBody } from "./dtos/editChapterBody";


@ApiBearerAuth()
@ApiTags('chapters')
@Controller('chapters')
export class ChapterController {
    constructor(
        private createChapterUseCase: CreateChapterUseCase,
        private createChapterByUrlUseCase: createChapterByUrlUseCase,
        private createChapterByUrlLoopingUseCase: CreateChapterByUrlLoopingUseCase,
        private getChapterUseCase: GetChapterUseCase,
        private getManyChapterUseCase: GetManyChapterUseCase,
        private deleteChapterUseCase: DeleteChapterUseCase,
        private editChapterUseCase: EditChapterUseCase
    ) { }

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
        const chapter = await this.createChapterUseCase.execute({
            bookId, nextChapter, number, title, url, paragraphs
        })

        return ChapterViewModel.toHttp(chapter)
    }

    @Post('web-scraping')
    @ApiBody({
        type: [createChapterByUrlBody], examples: {
            a: {
                value: {
                    bookId: '',
                    url: ''
                } as createChapterByUrlBody
            }

        }
    })
    async createByUrl(@Body() body: createChapterByUrlBody) {
        const { bookId, url } = body
        const chapter = await this.createChapterByUrlUseCase.execute({
            bookId, url
        })

        return ChapterViewModel.toHttp(chapter)
    }

    @Post('web-scraping-looping')
    @ApiBody({
        type: [createChapterByUrlLoopingBody], examples: {
            a: {
                value: {
                    bookId: '',
                    url: '',
                    looping: 0
                } as createChapterByUrlLoopingBody
            }

        }
    })
    async createByUrlLooping(@Body() body: createChapterByUrlLoopingBody) {
        const { bookId, url, looping } = body
        const chapter = await this.createChapterByUrlLoopingUseCase.execute({
            bookId, url, looping
        })

        return 'ok'
    }

    @ApiQuery({ name: 'page', required: false, type: String })
    @ApiQuery({ name: 'perPage', required: false, type: String })
    @ApiQuery({ name: 'bookId', required: false, type: String })
    @Get()
    async getMany(
        @Query('page') page: string,
        @Query('perPage') perPage: string,
        @Query('bookId') bookId: string
    ) {
        const chapters = await this.getManyChapterUseCase.execute({
            page,
            perPage,
            bookId
        })
        return chapters.transformData(ChapterViewModel.toHttp)


    }

    @Get(":id")
    async get(@Param('id') chapterId: string) {
        const site = await this.getChapterUseCase.execute({ chapterId })
        return ChapterViewModel.toHttpInIncludeParagraphs(site)

    }

    @Put(":id")
    async put(@Param('id') id: string, @Body() { bookId, nextChapter, number, title, url }: EditChapterBody) {
        const chapter = await this.editChapterUseCase.execute({
            id, bookId, nextChapter, number, title, url
        })

        return ChapterViewModel.toHttp(chapter)
    }

    @Delete(":id")
    async delete(@Param('id') chapterId: string) {
        await this.deleteChapterUseCase.execute({ chapterId })
    }

}