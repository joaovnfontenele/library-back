import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/infra/database/database.module";
import { StatusController } from "./status.controller";
import { GetManyStatusUseCase } from "src/modules/status/useCases/getManyUseCase/getManyUseCase";
import { GetStatusUseCase } from "src/modules/status/useCases/getStatusUseCase/getStatusUseCase";


@Module({
    imports: [DatabaseModule],
    controllers: [StatusController],
    providers: [GetManyStatusUseCase, GetStatusUseCase]

})

export class StatusModule { }