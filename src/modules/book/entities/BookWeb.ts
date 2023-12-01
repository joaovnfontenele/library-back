import { Entities } from "src/shared/entities/entities";

interface SiteProps {
    title: string
    description: string | null
    image: string
}

export class BookWeb extends Entities {
    private props: SiteProps
    constructor(props: SiteProps, id?: string) {
        super(id)
        this.props = props
    }

    get title() {
        return this.props.title;
    }

    set title(title: string) {
        this.props.title = title;
    }

    get description(): string| null {
        return this.props.description;
    }

    set description(description: string) {
        this.props.description = description;
    }

    get image() {
        return this.props.image;
    }

    set image(image: string) {
        this.props.image = image;
    }

}