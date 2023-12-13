import { Book } from "src/modules/book/entities/Book";

export class FullBookViewModel {
    static toHttp({ id, title, description, image, siteId, statusId, url, chapters }: Book) {
        let chapter = [] as any

        if (chapters && chapters.length) {
            chapter = chapters.map((item) => {


                return {
                    title: item.title,
                    number: item.number,
                    paragraphs: item.paragraphs.map((paragraph) => { return paragraph.content })
                }
            })
        }
        return {
            id,
            title,
            description,
            image,
            siteId,
            statusId,
            url,
            chapter
        }

    }
}