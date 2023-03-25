import { inject, injectable } from "tsyringe"
import { compare } from "bcrypt"
import { sign } from "jsonwebtoken"

import { JWT_SECRET } from "@config"
import { IUsersRepository } from "@application/repositories/IUsersRepository"
import {
  IAuthenticateUserDTO,
  IAuthenticateUserResponseDTO,
} from "@application/modules/authentication/dto/IAuthenticateUserDTO"
import { left, right } from "@shared/errors/Either"
import { AppError } from "@shared/errors/AppError"
import { ErrorCodes } from "@shared/errors/ErrorCodes"

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository") private usersRepository: IUsersRepository
  ) {}

  async execute({
    email,
    password,
  }: IAuthenticateUserDTO): Promise<IAuthenticateUserResponseDTO> {
    const result = await this.usersRepository.findByEmail(email)

    if (result.isLeft()) {
      return left(new AppError(result.value.message, result.value.status))
    }

    if (!result.value.user) {
      return left(new AppError(ErrorCodes.INVALID_CREDENTIALS))
    }

    const { user } = result.value
    const passwordsMatch = await compare(password, user.password)

    if (!passwordsMatch) {
      return left(new AppError(ErrorCodes.INVALID_CREDENTIALS, 400))
    }

    const userData = {
      id: user.id,
      role: user.role,
      tenantId: user.tenantId,
      name: user.name,
    }
    const token = sign(userData, JWT_SECRET as string, {
      expiresIn: "1d",
    })

    return right({
      token,
      user: { ...userData, email: user.email },
    })
  }
}

export { AuthenticateUserUseCase }
