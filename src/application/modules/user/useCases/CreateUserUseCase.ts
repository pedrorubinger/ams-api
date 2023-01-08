import { hash } from "bcrypt"
import { inject, injectable } from "tsyringe"

import { IUsersRepository } from "@application/repositories/IUsersRepository"
import { ICreateUserDTO } from "@application/modules/user/dto/ICreateUserDTO"
import { User } from "@domain/entities/User"

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
    phone
  }: ICreateUserDTO): Promise<any> {
    /** TO DO: Find user by email before try to create a new user... */

    const hashedPassword = await hash(password, 8)
    const user = User.create({
      name,
      email,
      password: hashedPassword,
      role,
      tenantId,
      phone
    })
    const payload = { ...user.props, id: user.id }

    return await this.usersRepository.create(payload)
  }
}

export { CreateUserUseCase }
