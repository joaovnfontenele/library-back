import { Status } from "../entities/status";


export abstract class StatusRepository {
    abstract create(status: Status): Promise<void>
    abstract findById(id: string): Promise<Status | null>
    abstract delete(id: string): Promise<void>
    abstract save(status: Status): Promise<void>
    abstract findMany(page: number, perPage: number): Promise<Status[]>
    abstract count(query?: any): Promise<number>
}