import { inject, injectable } from "tsyringe"

import { IUsersRepository } from "@application/repositories"
import {
  IUpdateAccountDTO,
  IUpdateAccountResponseDTO,
} from "@application/modules/user"
import { left, right, AppError } from "@shared/errors"

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
    const result = await this.usersRepository.updateAccount({
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
