import { ScanResponse } from "dynamoose/dist/ItemRetriever"

import { AppError } from "@shared/errors/AppError"
import { Either } from "@shared/errors/Either"
import { UserItem } from "@domain/infra/dynamoose/User"

type IGetAllUsersResponseDTO = Either<
  AppError,
  { users: ScanResponse<UserItem> }
>

export { IGetAllUsersResponseDTO }
