import { Request, Response } from "express"
import { container } from "tsyringe"

import { CreateUserUseCase } from "@application/modules/user/useCases/CreateUserUseCase"
import { CreateUserValidator } from "@domain/infra/joi"

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    /** TO DO: Get tenantId safely */
    const tenantId = "1234"
    const { name, email, password, phone, role } = request.body
    const validation = CreateUserValidator.validate({
      name,
      email,
      password,
      phone,
      role
    })

    if (validation.error) {
      return response.status(400).json({ error: validation.error })
    }

    const createUserUseCase = container.resolve(CreateUserUseCase)
    const result = await createUserUseCase.execute({
      name,
      email,
      password,
      phone,
      tenantId,
      role
    })

    if (result.isLeft()) {
      return response
        .status(result.value.status)
        .json({ code: result.value.message })
    }

    return response.status(201).json({ user: result.value.user })
  }
}

export { CreateUserController }
