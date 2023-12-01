import { Entities } from "src/shared/entities/entities";

interface StatusProps {
    description: string

}

export class Status extends Entities {
    private props: StatusProps
    constructor(props: StatusProps, id?: string) {
        super(id)
        this.props = props
    }

    get description() {
        return this.props.description
    }

    set description(description: string) {
        this.props.description = description
    }

}