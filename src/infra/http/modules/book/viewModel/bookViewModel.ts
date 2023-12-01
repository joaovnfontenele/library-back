import { Book } from "src/modules/book/entities/Book";

export class BookViewModel {
    static toHttp({ id, title, description, image, siteId, statusId, url }: Book) {
        return {
            id,
            title,
            description,
            image,
            siteId,
            statusId,
            url
        }

    }
}