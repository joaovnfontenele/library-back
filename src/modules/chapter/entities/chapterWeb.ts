import { Entities } from "src/shared/entities/entities";


interface ChapterWebProps {
    title: string
    number: number
    nextChapter: string
    paragraphs: Paragraphs[]
}

interface Paragraphs {
    content: string
    order: number
}

export class ChapterWeb extends Entities {
    private props: ChapterWebProps
    constructor(props: ChapterWebProps, id?: string) {
        super(id)
        this.props = props
    }

    get title() {
        return this.props.title
    }

    get number(): number {
        return this.props.number
    }

    get nextChapter() {
        return this.props.nextChapter
    }

    set title(title: string) {
        this.props.title = title
    }

    get paragraphs(){
        return this.props.paragraphs
    }

    set number(number: number) {
        this.props.number = number
    }

    set nextChapter(nextChapter: string) {
        this.props.nextChapter = nextChapter
    }

    set paragraphs(paragraphs: Paragraphs[]){
         this.props.paragraphs = paragraphs
    }

}