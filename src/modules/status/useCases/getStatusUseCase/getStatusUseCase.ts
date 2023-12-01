import { Injectable, NotFoundException } from "@nestjs/common";
import { UseCase } from "src/shared/useCases/useCase";
import { StatusRepository } from "../../repositories/StatusRepository";

interface GetStatusRequest {
    statusId: string
}

@Injectable()
export class GetStatusUseCase extends UseCase {
    constructor(private statusRepository: StatusRepository) {
        super()
    }
    async execute({ statusId }: GetStatusRequest) {

        const status = await this.statusRepository.findById(statusId)
        
        if (!status) throw new NotFoundException()

        return status
    }
}