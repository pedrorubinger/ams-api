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
import {
  IUpdateUserDTO,
  IUpdateUserResponseDTO,
} from "@application/modules/user/dto/IUpdateUserDTO"

interface IUsersRepository {
  create(payload: ICreateUserDTO): Promise<ICreateUserResponseDTO>
  updateAccount(
    payload: Omit<IUpdateAccountDTO, "role" | "password">
  ): Promise<IUpdateAccountResponseDTO>
  update(
    payload: Omit<IUpdateUserDTO, "role" | "password">
  ): Promise<IUpdateUserResponseDTO>
  find(id: string): Promise<IFindUserResponseDTO>
  findByEmail(email: string): Promise<IFindUserByEmailResponseDTO>
  getAll(params?: IGetAllUsersParamsDTO): Promise<IGetAllUsersResponseDTO>
}

export { IUsersRepository }
