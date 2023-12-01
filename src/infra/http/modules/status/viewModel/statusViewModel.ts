import { Status } from "src/modules/status/entities/status";


export class StatusViewModel {
    static toHttp({ id, description, }: Status) {
        return {
            id,
            description
        }

    }
}