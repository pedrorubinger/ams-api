import { inject, injectable } from "tsyringe"

import { IUsersRepository } from "@application/repositories/IUsersRepository"
import { IDeleteTenantResponseDTO } from "@application/modules/tenant/dto/IDeleteTenantDTO"

@injectable()
class DeleteUserUseCase {
  constructor(
    @inject("UsersRepository") private usersRepository: IUsersRepository
  ) {}

  async execute(id: string): Promise<IDeleteTenantResponseDTO> {
    return await this.usersRepository.delete(id)
  }
}

export { DeleteUserUseCase }
