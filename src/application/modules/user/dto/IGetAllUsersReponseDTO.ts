import { UserItem } from "@domain/infra/dynamoose"
import { AppError, Either } from "@shared/errors"

interface IGetAllUsersParamsDTO {
  /** @default 5 */
  size?: number
  email?: string
  startAt?: string
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
