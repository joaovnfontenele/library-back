import { Book } from "src/modules/book/entities/Book";
import { Chapter } from "src/modules/chapter/entities/chapter";

export class ChapterViewModel {
    static toHttp({ id, title, bookId, nextChapter, number, url }: Chapter) {
        return {
            id, title, bookId, nextChapter, number, url
        }

    }
}