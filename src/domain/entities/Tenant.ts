import { Entity } from "@core"

interface ITenantProps {
  name: string
  responsible: string
}

class Tenant extends Entity<ITenantProps> {
  constructor(props: ITenantProps, id?: string) {
    super(props, id)
  }

  public static create(props: ITenantProps, id?: string) {
    const tenant = new Tenant(props, id)

    return tenant
  }
}

export { Tenant }
