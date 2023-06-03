import { PartnerItem } from "@domain/infra/dynamoose"
import { AppError, Either } from "@shared/errors"

type ICreatePartnerOutput = PartnerItem

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
