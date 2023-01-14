import { IRole } from "@domain/entities/User"
import { AppError } from "@shared/errors/AppError"
import { Either } from "@shared/errors/Either"

interface IAuthenticateUserDTO {
  email: string
  password: string
}

type IAuthenticateUserOutput = {
  user: {
    id: string
    email: string
    role: IRole
  }
  token: string
}

type IAuthenticateUserResponseDTO = Either<AppError, IAuthenticateUserOutput>

export { IAuthenticateUserDTO, IAuthenticateUserResponseDTO }
