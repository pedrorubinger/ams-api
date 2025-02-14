import { inject, injectable } from "tsyringe"

import { IUsersRepository } from "@application/repositories"
import { IFindUserResponseWithoutPasswordDTO } from "@application/modules/user"
import { left, right, AppError } from "@shared/errors"

@injectable()
class FindUserUseCase {
  constructor(
    @inject("UsersRepository") private usersRepository: IUsersRepository
  ) {}

  async execute(id: string): Promise<IFindUserResponseWithoutPasswordDTO> {
    const result = await this.usersRepository.find(id)

    if (result.isRight()) {
      const data = { user: { ...result.value.user, password: undefined } }

      delete data.user.password
      return right({ user: data.user })
    }

    return left(new AppError(result.value.message, result.value.status))
  }
}

export { FindUserUseCase }
