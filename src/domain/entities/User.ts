import { Entity, IEntity } from "@core"

type IRole = "master" | "admin"

interface IUserProps {
  tenantId: string
  name: string
  email: string
  password: string
  role: IRole
  isActive: boolean
  phone?: string
}

type IUser = IEntity<IUserProps>

class User extends Entity<IUserProps> {
  constructor(props: IUserProps, id?: string) {
    super(props, id)
  }

  public static create(props: IUserProps, id?: string) {
    const user = new User(props, id)

    return user
  }
}

export { User, IUser, IRole }
