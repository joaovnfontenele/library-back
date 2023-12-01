import { Injectable } from "@nestjs/common";
import { UseCase } from "src/shared/useCases/useCase";
import { StatusRepository } from "../../repositories/StatusRepository";
import { Status } from "../../entities/status";

interface CreateStatusRequest {
    description: string
}


@Injectable()
export class CreateStatusUseCas extends UseCase {
    constructor(private statusRepository: StatusRepository) {
        super()
    }
    async execute({ description }: CreateStatusRequest) {
        const status = new Status({
            description
        })

        await this.statusRepository.create(status)

        return status
    }

}