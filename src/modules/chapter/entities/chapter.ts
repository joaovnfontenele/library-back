import { Paragraph } from "src/modules/paragraph/entities/paragraph";
import { Entities } from "src/shared/entities/entities";


interface ChapterProps {
    bookId: string
    title: string
    number: number
    url: string
    nextChapter: string
    paragraphs?: Paragraph[]
}

export class Chapter extends Entities {
    private props: ChapterProps
    constructor(props: ChapterProps, id?: string) {
        super(id)
        this.props = props
    }
    get bookId() {
        return this.props.bookId
    }

    get title() {
        return this.props.title
    }

    get number(): number {
        return this.props.number
    }

    get url() {
        return this.props.url
    }

    get nextChapter() {
        return this.props.nextChapter
    }

    get paragraphs() {
        return this.props.paragraphs ?? []
    }

    set bookId(bookId: string) {
        this.props.bookId = bookId
    }

    set title(title: string) {
        this.props.title = title
    }

    set number(number: number) {
        this.props.number = number
    }

    set url(url: string) {
        this.props.url = url
    }

    set nextChapter(nextChapter: string) {
        this.props.nextChapter = nextChapter
    }

}