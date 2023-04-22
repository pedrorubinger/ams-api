import { inject, injectable } from "tsyringe"

import { IUsersRepository } from "@application/repositories"
import {
  IGetAllUsersParamsDTO,
  IGetAllUsersResponseDTO,
} from "@application/modules/user"

@injectable()
class GetAllUsersUseCase {
  constructor(
    @inject("UsersRepository") private usersRepository: IUsersRepository
  ) {}

  async execute(
    params?: IGetAllUsersParamsDTO
  ): Promise<IGetAllUsersResponseDTO> {
    return await this.usersRepository.getAll({
      email: params?.email,
      size: params?.size,
      startAt: params?.startAt,
    })
  }
}

export { GetAllUsersUseCase }
