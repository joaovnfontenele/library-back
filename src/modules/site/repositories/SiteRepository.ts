import { Site } from "../entities/Site";

export abstract class SiteRepository {
    abstract create(site: Site): Promise<void>
    abstract findById(id:string):Promise<Site | null>
    abstract delete(id:string) : Promise<void>
    abstract save(site: Site) : Promise<void>
    abstract findMany(page:number, perPage:number) : Promise<Site[]>
    abstract count(query?:any) : Promise<number>
}