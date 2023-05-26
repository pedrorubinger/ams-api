import { IRole } from "@domain/entities"
import { AppError, Either } from "@shared/errors"

interface IAuthenticateUserDTO {
  email: string
  password: string
}

type IAuthenticateUserOutput = {
  user: {
    id: string
    email: string
    name: string
    role: IRole
  }
  token: string
}

type IAuthenticateUserResponseDTO = Either<AppError, IAuthenticateUserOutput>

export { IAuthenticateUserDTO, IAuthenticateUserResponseDTO }
