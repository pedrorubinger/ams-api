import {
  ICreateUserDTO,
  ICreateUserResponseDTO,
  IFindUserByEmailResponseDTO,
  IFindUserResponseDTO,
  IGetAllUsersParamsDTO,
  IGetAllUsersResponseDTO,
  IUpdateAccountDTO,
  IUpdateAccountResponseDTO,
  IUpdateUserDTO,
  IUpdateUserResponseDTO,
  IDeleteUserResponseDTO,
} from "@application/modules/user"

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
  delete(id: string): Promise<IDeleteUserResponseDTO>
}

export { IUsersRepository }
