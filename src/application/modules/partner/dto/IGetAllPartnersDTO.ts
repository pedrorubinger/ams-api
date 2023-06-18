import { AppError, Either } from "@shared/errors"
import { IPaginatedResult } from "@core"
import { Partner } from "@domain/entities"
import { PartnerItem } from "@domain/infra/dynamoose"

interface IGetAllPartnersOutput extends IPaginatedResult<Partner> {
  partners: PartnerItem[]
}

type IGetAllPartnersResponseDTO = Either<AppError, IGetAllPartnersOutput>

interface IGetAllPartnersInput {
  tenantId: string
}

export {
  IGetAllPartnersInput,
  IGetAllPartnersResponseDTO,
  IGetAllPartnersOutput,
}
