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
  IUpdateUserDTO,
  IUpdateUserResponseDTO,
} from "@application/modules/user/dto/IUpdateUserDTO"

interface IUsersRepository {
  create(payload: ICreateUserDTO): Promise<ICreateUserResponseDTO>
  update(
    payload: Omit<IUpdateUserDTO, "role" | "password">
  ): Promise<IUpdateUserResponseDTO>
  find(id: string): Promise<IFindUserResponseDTO>
  findByEmail(email: string): Promise<IFindUserByEmailResponseDTO>
  getAll(params?: IGetAllUsersParamsDTO): Promise<IGetAllUsersResponseDTO>
}

export { IUsersRepository }
