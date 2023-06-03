import {
  ICreatePartnerDTO,
  ICreatePartnerResponseDTO,
  IDeletePartnerInput,
  IDeletePartnerResponseDTO,
  IFindPartnerInput,
  IFindPartnerResponseDTO,
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
    id,
    name,
    registrationId,
    tenantId,
  }: ICreatePartnerDTO): Promise<ICreatePartnerResponseDTO> {
    try {
      const partner = await PartnerModel.create({
        id,
        name: name.toUpperCase(),
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

      if (name) updatedData.name = name.toUpperCase()
      if (registrationId) updatedData.registrationId = registrationId

      const partner = await PartnerModel.update({ id }, { ...updatedData })

      return right({ partner })
    } catch (err) {
      console.log("[ERROR] PartnersRepository > create", err)
      return left(new AppError(ErrorCodes.INTERNAL))
    }
  }

  async find({
    field,
    content,
    tenantId,
  }: IFindPartnerInput): Promise<IFindPartnerResponseDTO> {
    try {
      const response = await PartnerModel.scan({
        [field]: { contains: content.toUpperCase() },
        tenantId: { eq: tenantId },
      })
        .all()
        .exec()

      return right({ partners: response })
    } catch (err) {
      console.log("[ERROR] PartnersRepository > find", err)
      return left(new AppError(ErrorCodes.INTERNAL))
    }
  }

  async delete({
    id,
    tenantId,
  }: IDeletePartnerInput): Promise<IDeletePartnerResponseDTO> {
    try {
      const partner = await PartnerModel.get(id)

      if (!partner || partner.tenantId !== tenantId) {
        return left(new AppError(ErrorCodes.TENANT_NOT_FOUND))
      }

      await PartnerModel.delete({ id })
      return right({ success: true })
    } catch (err) {
      console.log("[ERROR] PartnersRepository > delete", err)
      return left(new AppError(ErrorCodes.INTERNAL))
    }
  }
}
