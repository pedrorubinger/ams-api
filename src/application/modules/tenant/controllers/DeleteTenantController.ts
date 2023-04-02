import { Request, Response } from "express"
import { container } from "tsyringe"

import { DeleteTenantUseCase } from "@application/modules/tenant/useCases/DeleteTenantUseCase"

class DeleteTenantController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const deleteTenantUseCase = container.resolve(DeleteTenantUseCase)
    const result = await deleteTenantUseCase.execute(id)

    if (result.isLeft()) {
      return response
        .status(result.value.status)
        .json({ code: result.value.message })
    }

    return response.status(200).json({ success: result.value.success })
  }
}

export { DeleteTenantController }
