import { inject, injectable } from "tsyringe"

import { IUsersRepository } from "@application/repositories//IUsersRepository"
import { IGetAllUsersResponseDTO } from "@application/modules/user/dto/IGetAllUsersReponseDTO"

@injectable()
class GetAllUsersUseCase {
  constructor(
    @inject("UsersRepository") private usersRepository: IUsersRepository
  ) {}

  async execute(): Promise<IGetAllUsersResponseDTO> {
    return await this.usersRepository.getAll()
  }
}

export { GetAllUsersUseCase }
