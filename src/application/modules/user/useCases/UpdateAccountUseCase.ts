import { inject, injectable } from "tsyringe"

import { IUsersRepository } from "@application/repositories/IUsersRepository"
import {
  IUpdateAccountDTO,
  IUpdateAccountResponseDTO,
} from "@application/modules/user/dto/IUpdateAccountDTO"
import { left, right } from "@shared/errors/Either"
import { AppError } from "@shared/errors/AppError"

@injectable()
class UpdateAccountUseCase {
  constructor(
    @inject("UsersRepository") private usersRepository: IUsersRepository
  ) {}

  async execute({
    id,
    name,
    tenantId,
    newPassword,
    phone,
  }: IUpdateAccountDTO): Promise<IUpdateAccountResponseDTO> {
    const result = await this.usersRepository.update({
      id,
      newPassword,
      tenantId,
      name,
      phone,
    })

    if (result.isLeft()) {
      return left(new AppError(result.value.message, result.value.status))
    }

    const user = { ...result.value.user, password: undefined }

    delete user.password

    return right({ user })
  }
}

export { UpdateAccountUseCase }
