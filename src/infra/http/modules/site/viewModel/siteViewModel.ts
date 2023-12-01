import { Site } from "src/modules/site/entities/Site";


export class SiteViewModel {
    static toHttp({ id, name, url }: Site) {
        return {
            id,
            name,
            url
        }

    }
}