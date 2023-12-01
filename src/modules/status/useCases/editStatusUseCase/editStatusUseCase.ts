import { Injectable, NotFoundException } from "@nestjs/common";
import { UseCase } from "src/shared/useCases/useCase";
import { StatusRepository } from "../../repositories/StatusRepository";

interface EditStatusRequest {
    idStatus: string
    description: string
}

@Injectable()
export class EditStatusUseCase extends UseCase {
    constructor(private statusRepository: StatusRepository) {
        super()
    }
    async execute({ idStatus, description }: EditStatusRequest) {

        const status = await this.statusRepository.findById(idStatus)
        if (!status) throw new NotFoundException()

        status.description = description

        await this.statusRepository.save(status)

        return status

    }
}