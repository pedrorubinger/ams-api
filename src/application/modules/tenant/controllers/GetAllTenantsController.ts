import { Request, Response } from "express"
import { container } from "tsyringe"

import { GetAllTenantsUseCase } from "@application/modules/tenant/useCases/GetAllTenantsUseCase"

class GetAllTenantsController {
  async handle(_: Request, response: Response): Promise<Response> {
    const getAllTenantsUseCase = container.resolve(GetAllTenantsUseCase)
    const result = await getAllTenantsUseCase.execute()

    if (result.isLeft()) {
      return response
        .status(result.value.status)
        .json({ code: result.value.message })
    }

    return response.status(201).json(result.value)
  }
}

export { GetAllTenantsController }
