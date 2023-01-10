import {
  ICreateUserDTO,
  ICreateUserResponseDTO
} from "@application/modules/user/dto/ICreateUserDTO"
import { IFindUserResponseDTO } from "../modules/user/dto/IFindUserDTO"

interface IUsersRepository {
  create(payload: ICreateUserDTO): Promise<ICreateUserResponseDTO>
  find(id: string): Promise<IFindUserResponseDTO>
}

export { IUsersRepository }
