import { inject, injectable } from "tsyringe"

import { IUsersRepository } from "@application/repositories"
import {
  IUpdateUserDTO,
  IUpdateUserResponseDTO,
} from "@application/modules/user"
import { left, right, AppError } from "@shared/errors"

@injectable()
class UpdateUserUseCase {
  constructor(
    @inject("UsersRepository") private usersRepository: IUsersRepository
  ) {}

  async execute({
    id,
    name,
    phone,
    tenantId,
    isActive,
  }: IUpdateUserDTO): Promise<IUpdateUserResponseDTO> {
    const result = await this.usersRepository.update({
      id,
      name,
      phone,
      tenantId,
      isActive,
    })

    if (result.isLeft()) {
      return left(new AppError(result.value.message, result.value.status))
    }

    const user = { ...result.value.user, password: undefined }

    delete user.password

    return right({ user })
  }
}

export { UpdateUserUseCase }
