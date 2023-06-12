import { Entity, IEntity } from "@core"

interface IPartnerRegistrationIdProps {
  lastId: string
}

type IPartnerRegistrationId = IEntity<IPartnerRegistrationIdProps>

class PartnerRegistrationId extends Entity<IPartnerRegistrationIdProps> {
  constructor(props: IPartnerRegistrationIdProps, id?: string) {
    super(props, id)
  }

  public static create(
    props: IPartnerRegistrationIdProps,
    id?: string
  ): PartnerRegistrationId {
    const partnerRegistrationId = new PartnerRegistrationId(props, id)

    return partnerRegistrationId
  }
}

export { PartnerRegistrationId, IPartnerRegistrationId }
