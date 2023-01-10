import { inject, injectable } from "tsyringe"

import { IUsersRepository } from "@application/repositories/IUsersRepository"
import { IFindUserResponseDTO } from "@application/modules/user/dto/IFindUserDTO"

@injectable()
class FindUserUseCase {
  constructor(
    @inject("UsersRepository") private usersRepository: IUsersRepository
  ) {}

  async execute(id: string): Promise<IFindUserResponseDTO> {
    return await this.usersRepository.find(id)
  }
}

export { FindUserUseCase }
