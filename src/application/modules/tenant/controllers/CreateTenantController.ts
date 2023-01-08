import { Request, Response } from "express"
import { container } from "tsyringe"

import { CreateTenantUseCase } from "@application/modules/tenant/useCases/CreateTenantUseCase"

class CreateTenantController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, responsible } = request.body
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
