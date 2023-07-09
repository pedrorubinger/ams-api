import { AppError, Either } from "@shared/errors"
import { IPaginatedResult, IPaginatedParams } from "@core"
import { Partner } from "@domain/entities"
import { PartnerItem } from "@domain/infra/dynamoose"

interface IGetAllPartnersOutput extends IPaginatedResult<Partner> {
  partners: PartnerItem[]
}

type IGetAllPartnersResponseDTO = Either<AppError, IGetAllPartnersOutput>

interface IGetAllPartnersInput extends IPaginatedParams {
  tenantId: string
}

export {
  IGetAllPartnersInput,
  IGetAllPartnersResponseDTO,
  IGetAllPartnersOutput,
}
