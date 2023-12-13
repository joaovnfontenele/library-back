import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { UseCase } from "src/shared/useCases/useCase";
import { ChapterRepository } from "../../repositories/ChapterRepository";




interface GetChapterRequest {
    chapterId: string
}

@Injectable()
export class GetChapterUseCase extends UseCase {
    constructor(private chapterRepository: ChapterRepository) {
        super()
    }
    async execute({ chapterId }: GetChapterRequest) {
        const chapter = await this.chapterRepository.findById(chapterId)

        if (!chapter) throw new NotFoundException()

        return chapter
    }

}