import { Entity, IEntity } from "@core"

interface IPartnerProps {
  name: string
  registrationId: string
  tenantId: string
}

type IPartner = IEntity<IPartnerProps>

class Partner extends Entity<IPartnerProps> {
  constructor(props: IPartnerProps, id?: string) {
    super(props, id)
  }

  public static create(props: IPartnerProps, id?: string) {
    const partner = new Partner(props, id)

    return partner
  }
}

export { Partner, IPartner }
