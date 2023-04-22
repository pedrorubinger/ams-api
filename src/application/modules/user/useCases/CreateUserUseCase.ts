import { hash } from "bcrypt"
import { inject, injectable } from "tsyringe"

import { User } from "@domain/entities"
import { IUsersRepository } from "@application/repositories"
import {
  ICreateUserDTO,
  ICreateUserResponseDTO,
} from "@application/modules/user"
import { left, AppError, ErrorCodes } from "@shared/errors"

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository") private usersRepository: IUsersRepository
  ) {}

  async execute({
    name,
    email,
    tenantId,
    password,
    role,
    phone,
    isActive,
  }: ICreateUserDTO): Promise<ICreateUserResponseDTO> {
    const result = await this.usersRepository.findByEmail(email)

    if (result.isLeft()) {
      return left(new AppError(result.value.message, result.value.status))
    }

    if (result?.value?.user?.email === email) {
      return left(new AppError(ErrorCodes.EMAIL_ALREADY_REGISTERED, 400))
    }

    const hashedPassword = await hash(password, 8)
    const user = User.create({
      name,
      email,
      isActive: isActive === undefined ? true : !!isActive,
      password: hashedPassword,
      role,
      tenantId,
      phone,
    })
    const payload = { ...user.props, id: user.id }

    return await this.usersRepository.create(payload)
  }
}

export { CreateUserUseCase }
