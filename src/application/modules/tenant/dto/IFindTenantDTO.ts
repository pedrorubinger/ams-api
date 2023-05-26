import { TenantItem } from "@domain/infra/dynamoose"
import { AppError, Either } from "@shared/errors"

type IFindTenantOutput = { tenant: TenantItem }

type IFindTenantResponseDTO = Either<AppError, IFindTenantOutput>

export { IFindTenantResponseDTO }
