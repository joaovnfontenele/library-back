import { Entities } from "src/shared/entities/entities";

interface SiteProps {
    name: string
    url: string
}

export class Site extends Entities {
    private props: SiteProps
    constructor(props: SiteProps, id?: string) {
        super(id)
        this.props = props
    }

    get name() {
        return this.props.name
    }
    get url() {
        return this.props.url
    }
    set name(name: string) {
        this.props.name = name
    }
    set url(url: string) {
        this.props.url = url
    }
}