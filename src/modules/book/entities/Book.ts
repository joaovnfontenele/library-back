import { Chapter } from "src/modules/chapter/entities/chapter";
import { Entities } from "src/shared/entities/entities";

interface SiteProps {
    title: string
    siteId: string
    statusId: string
    description: string | null
    image: string
    url: string
    chapters?: Chapter[]
}

export class Book extends Entities {
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

    get siteId() {
        return this.props.siteId;
    }

    set siteId(siteId: string) {
        this.props.siteId = siteId;
    }

    get chapters(){
        return this.props.chapters
    }

    get statusId() {
        return this.props.statusId;
    }

    set statusId(statusId: string) {
        this.props.statusId = statusId;
    }

    get description(): string | null {
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

    get url() {
        return this.props.url;
    }

    set url(url: string) {
        this.props.url = url;
    }

}