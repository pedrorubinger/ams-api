import { Request, Response } from "express"
import { container } from "tsyringe"

import { CreateTenantUseCase } from "@application/modules/tenant/useCases/CreateTenantUseCase"
import { CreateTenantValidator } from "@domain/infra/joi"

class CreateTenantController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, responsible } = request.body
    const validation = CreateTenantValidator.validate({ name, responsible })

    if (validation.error) {
      return response.status(400).json({ error: validation.error })
    }

    const createTenantUseCase = container.resolve(CreateTenantUseCase)
    const result = await createTenantUseCase.execute({ name, responsible })

    if (result.isLeft()) {
      return response
        .status(result.value.status)
        .json({ code: result.value.message })
    }

    return response.status(201).json({ tenant: result.value.tenant })
  }
}

export { CreateTenantController }
