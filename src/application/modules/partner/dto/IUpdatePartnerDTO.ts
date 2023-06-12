import { AppError, Either } from "@shared/errors"
import { IPartner } from "@domain/entities"

type IUpdatePartnerOutput = Partial<IPartner>

interface IUpdatePartnerDTO {
  id: string
  name?: string
  registrationId?: string
  autoRegistration?: boolean
}

type IUpdatePartnerResponseDTO = Either<
  AppError,
  { partner: IUpdatePartnerOutput }
>

export { IUpdatePartnerDTO, IUpdatePartnerResponseDTO, IUpdatePartnerOutput }
