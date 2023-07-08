import { IPaginatedParams } from "@core/dto"
import { UserItem } from "@domain/infra/dynamoose"
import { AppError, Either } from "@shared/errors"

interface IGetAllUsersParamsDTO extends IPaginatedParams {
  email?: string
}

type IUserWithTenantName = UserItem & {
  tenantName: string
}

interface IGetAllUsersOutput {
  users: IUserWithTenantName[]
  lastKey: string | null
  total: number
}

type IGetAllUsersResponseDTO = Either<AppError, IGetAllUsersOutput>

export { IGetAllUsersResponseDTO, IGetAllUsersParamsDTO, IUserWithTenantName }
