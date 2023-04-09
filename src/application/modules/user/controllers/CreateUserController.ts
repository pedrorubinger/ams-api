import { Request, Response } from "express"
import { container } from "tsyringe"

import { CreateUserUseCase } from "@application/modules/user/useCases/CreateUserUseCase"
import { CreateUserValidator } from "@domain/infra/joi"

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password, phone, role, tenantId, isActive } =
      request.body
    const validation = CreateUserValidator.validate({
      tenantId,
      name,
      email,
      password,
      phone,
      role,
      isActive,
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
      role,
      isActive,
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
