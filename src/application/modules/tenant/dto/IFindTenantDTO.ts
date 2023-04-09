import { AppError } from "@shared/errors/AppError"
import { Either } from "@shared/errors/Either"
import { TenantItem } from "@domain/infra/dynamoose/Tenant"

type IFindTenantOutput = { tenant: TenantItem }

type IFindTenantResponseDTO = Either<AppError, IFindTenantOutput>

export { IFindTenantResponseDTO }
