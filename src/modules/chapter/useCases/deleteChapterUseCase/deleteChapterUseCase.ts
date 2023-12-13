import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { UseCase } from "src/shared/useCases/useCase";
import { ChapterRepository } from "../../repositories/ChapterRepository";




interface DeleteChapterRequest {
    chapterId: string
}

@Injectable()
export class DeleteChapterUseCase extends UseCase {
    constructor(private chapterRepository: ChapterRepository) {
        super()
    }
    async execute({ chapterId }: DeleteChapterRequest) {
        const chapter = await this.chapterRepository.findById(chapterId)

        if (!chapter) throw new NotFoundException()
        await this.chapterRepository.delete(chapter.id)
    }

}