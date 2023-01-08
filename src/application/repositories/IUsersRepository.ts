import {
  ICreateUserDTO,
  ICreateUserResponseDTO
} from "@application/modules/user/dto/ICreateUserDTO"

interface IUsersRepository {
  create(payload: ICreateUserDTO): Promise<ICreateUserResponseDTO>
}

export { IUsersRepository }
