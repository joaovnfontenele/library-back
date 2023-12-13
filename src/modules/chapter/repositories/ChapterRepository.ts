import { Chapter } from "../entities/chapter";

export abstract class ChapterRepository {
    abstract create(chapter: Chapter): Promise<void>
    abstract findById(id:string):Promise<Chapter | null>
    abstract delete(id:string) : Promise<void>
    abstract save(chapter: Chapter) : Promise<void>
    abstract findMany(page:number, perPage:number, query?:any) : Promise<Chapter[]>
    abstract count(query?:any) : Promise<number>
}