import { Entities } from "src/shared/entities/entities"

interface UserSchema {
  email: string
  password: string
  name: string
  login:string
}

export class User extends Entities {
  private props: UserSchema

  constructor(props: UserSchema, id?: string) {
    super(id)
    this.props = props

  }

  get email(): string {
    return this.props.email
  }
  get password(): string {
    return this.props.password
  }
  get name(): string {
    return this.props.name
  }

  get login(){
    return this.props.login
  }

  set email(email: string) {
    this.props.email = email
  }
  set password(password: string) {
    this.props.password = password
  }
  set name(name: string) {
    this.props.name = name
  }


}
