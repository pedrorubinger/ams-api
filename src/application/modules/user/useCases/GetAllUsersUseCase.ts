import { inject, injectable } from "tsyringe"

import { IUsersRepository } from "@application/repositories//IUsersRepository"
import {
  IGetAllUsersParamsDTO,
  IGetAllUsersResponseDTO,
} from "@application/modules/user/dto/IGetAllUsersReponseDTO"

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
