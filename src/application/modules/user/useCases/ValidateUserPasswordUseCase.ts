import { inject, injectable } from "tsyringe"
import { compare } from "bcrypt"

import {
  IValidateUserPasswordDTO,
  IValidateUserPasswordResponseDTO,
} from "@application/modules/user"
import { IUsersRepository } from "@application/repositories"
import { left, right, AppError, ErrorCodes } from "@shared/errors"

@injectable()
class ValidateUserPasswordUseCase {
  constructor(
    @inject("UsersRepository") private usersRepository: IUsersRepository
  ) {}

  async execute({
    id,
    password,
  }: IValidateUserPasswordDTO): Promise<IValidateUserPasswordResponseDTO> {
    const result = await this.usersRepository.find(id)

    if (result.isLeft()) {
      return left(new AppError(result.value.message, result.value.status))
    }

    if (!result.value.user?.password) {
      return left(new AppError(ErrorCodes.PASSWORD_IS_INVALID))
    }

    const { user } = result.value
    const passwordsMatch = await compare(password, user.password)

    if (!passwordsMatch) {
      return left(new AppError(ErrorCodes.PASSWORD_IS_INVALID, 400))
    }

    if (result.isLeft()) {
      return left(new AppError(result.value.message, result.value.status))
    }

    return right({ isValid: true })
  }
}

export { ValidateUserPasswordUseCase }
