import { Injectable, NotFoundException } from "@nestjs/common";
import { UseCase } from "src/shared/useCases/useCase";
import { StatusRepository } from "../../repositories/StatusRepository";

interface DeleteStatusRequest {
    idStatus: string
}

@Injectable()
export class DeleteStatusUseCase extends UseCase {
    constructor(private statusRepository: StatusRepository) {
        super()
    }
    async execute({ idStatus }: DeleteStatusRequest) {

        const status = await this.statusRepository.findById(idStatus)
        if (!status) throw new NotFoundException()

        await this.statusRepository.delete(idStatus)
    }
}