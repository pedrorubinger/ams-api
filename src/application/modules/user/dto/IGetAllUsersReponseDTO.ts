import { ScanResponse } from "dynamoose/dist/ItemRetriever"

import { AppError } from "@shared/errors/AppError"
import { Either } from "@shared/errors/Either"
import { UserItem } from "@domain/infra/dynamoose/User"

interface IGetAllUsersParamsDTO {
  /** @default 5 */
  size?: number
}

type IGetAllUsersResponseDTO = Either<
  AppError,
  { users: ScanResponse<UserItem>; lastKey: string | null }
>

export { IGetAllUsersResponseDTO, IGetAllUsersParamsDTO }
