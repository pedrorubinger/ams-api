import {
  ICreateUserDTO,
  ICreateUserResponseDTO,
} from "@application/modules/user/dto/ICreateUserDTO"
import { IFindUserByEmailResponseDTO } from "@application/modules/user/dto/IFindUserByEmailDTO"
import { IFindUserResponseDTO } from "@application/modules/user/dto/IFindUserDTO"
import {
  IGetAllUsersParamsDTO,
  IGetAllUsersResponseDTO,
} from "@application/modules/user/dto/IGetAllUsersReponseDTO"
import {
  IUpdateAccountDTO,
  IUpdateAccountResponseDTO,
} from "@application/modules/user/dto/IUpdateAccountDTO"

interface IUsersRepository {
  create(payload: ICreateUserDTO): Promise<ICreateUserResponseDTO>
  update(
    payload: Omit<IUpdateAccountDTO, "role" | "password">
  ): Promise<IUpdateAccountResponseDTO>
  find(id: string): Promise<IFindUserResponseDTO>
  findByEmail(email: string): Promise<IFindUserByEmailResponseDTO>
  getAll(params?: IGetAllUsersParamsDTO): Promise<IGetAllUsersResponseDTO>
}

export { IUsersRepository }
