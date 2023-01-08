import crypto from "node:crypto"

type IEntity<T> = T & {
  id: string
  createdAt: number
  updatedAt: number
}

abstract class Entity<T> {
  protected readonly _id: string
  public readonly props: T

  constructor(props: T, id?: string) {
    this.props = props
    this._id = id ?? crypto.randomUUID()
  }

  get id() {
    return this._id
  }
}

export { IEntity, Entity }
