import {
  ICreateUserDTO,
  ICreateUserResponseDTO
} from "@application/modules/user/dto/ICreateUserDTO"
import { IFindUserByEmailResponseDTO } from "@application/modules/user/dto/IFindUserByEmailDTO"
import { IFindUserResponseDTO } from "@application/modules/user/dto/IFindUserDTO"

interface IUsersRepository {
  create(payload: ICreateUserDTO): Promise<ICreateUserResponseDTO>
  find(id: string): Promise<IFindUserResponseDTO>
  findByEmail(email: string): Promise<IFindUserByEmailResponseDTO>
}

export { IUsersRepository }
