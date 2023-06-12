import { IPartner } from "@domain/entities"
import { AppError, Either } from "@shared/errors"

type ICreatePartnerOutput = IPartner

interface ICreatePartnerDTO {
  id?: string
  registrationId?: string
  name: string
  tenantId: string
}

type ICreatePartnerResponseDTO = Either<
  AppError,
  { partner: ICreatePartnerOutput }
>

export { ICreatePartnerDTO, ICreatePartnerResponseDTO, ICreatePartnerOutput }
