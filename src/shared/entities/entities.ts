import { randomUUID } from "node:crypto"

export class Entities {
    private _id: string

    constructor(id?: string) {
        this._id = id || randomUUID()
    }

    get id(): string {
        return this._id
      }
}