import { PartnerItem } from "@domain/infra/dynamoose"
import { AppError, Either } from "@shared/errors"

export enum FindPartnerField {
  ID = "registrationId",
  NAME = "name",
}

interface IFindPartnerOutput {
  partners: PartnerItem[]
}

type IFindPartnerResponseDTO = Either<AppError, IFindPartnerOutput>

interface IFindPartnerInput {
  field: FindPartnerField
  content: string
  tenantId: string
}

export { IFindPartnerInput, IFindPartnerResponseDTO, IFindPartnerOutput }
