import { PartnerItem } from "@domain/infra/dynamoose"
import { AppError, Either } from "@shared/errors"

type IUpdatePartnerOutput = PartnerItem

interface IUpdatePartnerDTO {
  id: string
  name?: string
  registrationId?: string
}

type IUpdatePartnerResponseDTO = Either<
  AppError,
  { partner: IUpdatePartnerOutput }
>

export { IUpdatePartnerDTO, IUpdatePartnerResponseDTO, IUpdatePartnerOutput }
