import { Paragraph } from "../entities/paragraph";

export abstract class ParagraphRepository {
    abstract create(paragraph: Paragraph): Promise<void>
    abstract findById(id:string):Promise<Paragraph | null>
    abstract delete(id:string) : Promise<void>
    abstract save(paragraph: Paragraph) : Promise<void>
    abstract findMany(page:number, perPage:number) : Promise<Paragraph[]>
    abstract count(query?:any) : Promise<number>
}