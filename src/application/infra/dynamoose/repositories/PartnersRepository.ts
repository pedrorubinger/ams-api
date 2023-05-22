import {
  ICreatePartnerDTO,
  ICreatePartnerResponseDTO,
} from "@application/modules/partner/dto"
import {
  IUpdatePartnerDTO,
  IUpdatePartnerResponseDTO,
} from "@application/modules/partner/dto/IUpdatePartnerDTO"
import { IPartnersRepository } from "@application/repositories"
import { PartnerItem, PartnerModel } from "@domain/infra/dynamoose"
import { AppError, ErrorCodes, left, right } from "@shared/errors"

export class PartnersRepository implements IPartnersRepository {
  async create({
    name,
    registrationId,
    tenantId,
  }: ICreatePartnerDTO): Promise<ICreatePartnerResponseDTO> {
    try {
      const partner = await PartnerModel.create({
        name,
        registrationId,
        tenantId,
      })

      await partner.save()

      return right({ partner })
    } catch (err) {
      console.log("[ERROR] PartnersRepository > create", err)
      return left(new AppError(ErrorCodes.INTERNAL))
    }
  }

  async update({
    id,
    name,
    registrationId,
  }: IUpdatePartnerDTO): Promise<IUpdatePartnerResponseDTO> {
    try {
      const updatedData: Partial<PartnerItem> = {}

      if (name) updatedData.name = name
      if (registrationId) updatedData.registrationId = registrationId

      const partner = await PartnerModel.update({ id }, { ...updatedData })

      return right({ partner })
    } catch (err) {
      console.log("[ERROR] PartnersRepository > create", err)
      return left(new AppError(ErrorCodes.INTERNAL))
    }
  }
}
