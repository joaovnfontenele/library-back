import { Entities } from "src/shared/entities/entities";

interface ParagraphProps {
    chapterId: string
    content: string
    order: number
}

export class Paragraph extends Entities {
    private props: ParagraphProps
    constructor(props: ParagraphProps, id?:string) {
        super(id)
        this.props = props
    }

    get chapterId() {
        return this.props.chapterId
    }

    get content() {
        return this.props.content
    }

    get order() {
        return this.props.order
    }

    set chapterId(chapterId: string) {
        this.props.chapterId = chapterId
    }

    set content(content: string) {
        this.props.content = content
    }

    set order(order: number) {
        this.props.order = order
    }

}