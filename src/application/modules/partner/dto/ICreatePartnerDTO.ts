import { PartnerItem } from "@domain/infra/dynamoose"
import { AppError, Either } from "@shared/errors"

type ICreatePartnerOutput = PartnerItem

interface ICreatePartnerDTO {
  id?: string
  name: string
  registrationId: string
  tenantId: string
}

type ICreatePartnerResponseDTO = Either<
  AppError,
  { partner: ICreatePartnerOutput }
>

export { ICreatePartnerDTO, ICreatePartnerResponseDTO, ICreatePartnerOutput }
