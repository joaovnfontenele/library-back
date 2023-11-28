import { randomUUID } from "node:crypto"

interface UserSchema {
  email: string
  password: string
  name: string
}

export class User {
  private props: UserSchema
  private _id: string
  constructor(props: UserSchema, id?: string) {
    this.props = props
    this._id = id || randomUUID()
  }

  get id(): string {
    return this._id
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
