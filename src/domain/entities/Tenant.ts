import { Entity } from "@core"
import { IEntity } from "@core/domain/Entity"

interface ITenantProps {
  name: string
  responsible: string
  isActive?: boolean
}

type ITenant = IEntity<ITenantProps>

class Tenant extends Entity<ITenantProps> {
  constructor(props: ITenantProps, id?: string) {
    super(props, id)
  }

  public static create(props: ITenantProps, id?: string) {
    const tenant = new Tenant(props, id)

    return tenant
  }
}

export { Tenant, ITenant }
