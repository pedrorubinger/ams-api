import { Request, Response } from "express"
import { container } from "tsyringe"

import { CreateTenantUseCase } from "@application/modules/tenant/useCases/CreateTenantUseCase"

class CreateTenantController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, responsible } = request.body
    const createTenantUseCase = container.resolve(CreateTenantUseCase)

    const tenant = await createTenantUseCase.execute({ name, responsible })

    return response
      .status(201)
      .json({ message: "The tenant has been sucessfully created!", tenant })
  }
}

export { CreateTenantController }
