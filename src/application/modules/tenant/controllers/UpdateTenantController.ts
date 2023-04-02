import { Request, Response } from "express"
import { container } from "tsyringe"

import { UpdateTenantUseCase } from "@application/modules/tenant/useCases/UpdateTenantUseCase"
import { UpdateTenantValidator } from "@domain/infra/joi"

class UpdateTenantController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const { name, responsible, isActive } = request.body
    const validation = UpdateTenantValidator.validate({
      name,
      responsible,
      isActive,
    })

    console.log("payload", { name, responsible, isActive })

    if (validation.error) {
      return response.status(400).json({ error: validation.error })
    }

    const updateTenantUseCase = container.resolve(UpdateTenantUseCase)
    const result = await updateTenantUseCase.execute({
      id,
      name,
      responsible,
      isActive,
    })

    if (result.isLeft()) {
      return response
        .status(result.value.status)
        .json({ code: result.value.message })
    }

    return response.status(200).json({ tenant: result.value.tenant })
  }
}

export { UpdateTenantController }
