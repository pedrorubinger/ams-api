import { inject, injectable } from "tsyringe"
import { compare } from "bcrypt"
import { sign } from "jsonwebtoken"

import { JWT_DURATION, JWT_SECRET } from "@config"
import { ITenantsRepository, IUsersRepository } from "@application/repositories"
import {
  IAuthenticateUserDTO,
  IAuthenticateUserResponseDTO,
} from "@application/modules/authentication"
import { left, right, ErrorCodes, AppError } from "@shared/errors"

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository") private usersRepository: IUsersRepository,
    @inject("TenantsRepository") private tenantsRepository: ITenantsRepository
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
    const isMaster = user?.role === "master"
    const passwordsMatch = await compare(password, user.password)

    if (!passwordsMatch) {
      return left(new AppError(ErrorCodes.INVALID_CREDENTIALS, 400))
    }

    if (!isMaster) {
      if (!user.isActive) {
        return left(new AppError(ErrorCodes.USER_IS_NOT_ACTIVE, 401))
      }

      const tenantResult = await this.tenantsRepository.find(user.tenantId)

      if (tenantResult.isLeft()) {
        return left(
          new AppError(tenantResult.value.message, tenantResult.value.status)
        )
      }

      if (!tenantResult.value.tenant.isActive) {
        return left(new AppError(ErrorCodes.TENANT_IS_NOT_ACTIVE))
      }
    }

    const userData = {
      id: user.id,
      role: user.role,
      tenantId: user.tenantId,
      name: user.name,
      email: user.email,
    }
    const token = sign(userData, JWT_SECRET as string, {
      expiresIn: JWT_DURATION,
    })

    return right({
      token,
      user: { ...userData, email: user.email },
    })
  }
}

export { AuthenticateUserUseCase }
