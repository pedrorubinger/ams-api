import { inject, injectable } from "tsyringe"

import { IUsersRepository } from "@application/repositories/IUsersRepository"
import {
  IUpdateUserDTO,
  IUpdateUserResponseDTO,
} from "@application/modules/user/dto/IUpdateUserDTO"
import { left, right } from "@shared/errors/Either"
import { AppError } from "@shared/errors/AppError"

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
  }: IUpdateUserDTO): Promise<IUpdateUserResponseDTO> {
    const result = await this.usersRepository.update({
      id,
      name,
      phone,
      tenantId,
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
