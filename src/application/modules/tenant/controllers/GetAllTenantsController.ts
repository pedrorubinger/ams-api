import { Request, Response } from "express"
import { container } from "tsyringe"

import { GetAllTenantsUseCase } from "@application/modules/tenant/useCases/GetAllTenantsUseCase"

class GetAllTenantsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { size, startAt } = request.params
    const getAllTenantsUseCase = container.resolve(GetAllTenantsUseCase)
    const result = await getAllTenantsUseCase.execute({
      startAt: startAt as string | undefined,
      size: (size as string | undefined) ? Number(size) : undefined
    })

    if (result.isLeft()) {
      return response
        .status(result.value.status)
        .json({ code: result.value.message })
    }

    return response.status(201).json(result.value)
  }
}

export { GetAllTenantsController }
