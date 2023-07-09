import { inject, injectable } from "tsyringe"
import {
  TransactionReturnOptions,
  TransactionSettings,
} from "dynamoose/dist/Transaction"
import * as dynamoose from "dynamoose"

import { AppError, ErrorCodes, left, right } from "@shared/errors"
import { TransactionType } from "@config/infra/dynamoose"
import { PartnerItem, PartnerModel } from "@domain/infra/dynamoose"
import { IPartner } from "@domain/entities"
import {
  FindPartnerField,
  ICreatePartnerDTO,
  ICreatePartnerResponseDTO,
  IDeletePartnerInput,
  IDeletePartnerResponseDTO,
  IFindPartnerInput,
  IFindPartnerResponseDTO,
  IGetAllPartnersInput,
  IGetAllPartnersResponseDTO,
} from "@application/modules/partner/dto"
import {
  IUpdatePartnerDTO,
  IUpdatePartnerResponseDTO,
} from "@application/modules/partner/dto/IUpdatePartnerDTO"
import {
  IPartnerRegistrationIdsRepository,
  IPartnersRepository,
} from "@application/repositories"

@injectable()
export class PartnersRepository implements IPartnersRepository {
  constructor(
    @inject("RegistrationIdsRepository")
    private registrationIdsRepository: IPartnerRegistrationIdsRepository
  ) {}

  private settings: TransactionSettings = {
    return: TransactionReturnOptions.items,
    type: "write" as unknown as TransactionType,
  }

  async create({
    id,
    name,
    registrationId,
    tenantId,
  }: ICreatePartnerDTO): Promise<ICreatePartnerResponseDTO> {
    try {
      const registrationResponse = await this.registrationIdsRepository.upsert({
        lastId: registrationId,
      })

      if (registrationResponse.isLeft()) return left(registrationResponse.value)

      const lastId = registrationResponse.value.lastId

      const findResponse = await this.find({
        field: FindPartnerField.ID,
        content: lastId,
        tenantId,
      })

      if (findResponse.isLeft()) {
        return left(findResponse.value)
      }

      if (findResponse.value.partners.length) {
        return left(
          new AppError(ErrorCodes.REGISTRATION_ID_IS_ALREADY_REGISTERED)
        )
      }

      const item: Omit<IPartner, "createdAt" | "updatedAt"> = {
        id: id as string,
        name: name.toUpperCase(),
        registrationId: String(lastId),
        tenantId,
      }
      const partnerRequest = await PartnerModel.transaction.create(item)

      await dynamoose.transaction(
        [registrationResponse.value.request, partnerRequest],
        this.settings
      )

      return right({
        partner: {
          ...item,
          createdAt: Number(partnerRequest.Put.Item?.createdAt?.N as string),
          updatedAt: Number(partnerRequest.Put.Item?.updatedAt?.N as string),
        },
      })
    } catch (err) {
      console.log("[ERROR] PartnersRepository > create", err)
      return left(new AppError(ErrorCodes.INTERNAL))
    }
  }

  /* TO DO: Add tenantId validation */
  async update({
    id,
    name,
    registrationId,
    tenantId,
    autoRegistration = false,
  }: IUpdatePartnerDTO): Promise<IUpdatePartnerResponseDTO> {
    try {
      const updatedData: Partial<PartnerItem> = {}

      if (name) updatedData.name = name.toUpperCase()

      if (autoRegistration || registrationId) {
        const registrationResponse =
          await this.registrationIdsRepository.upsert({
            lastId: autoRegistration ? undefined : registrationId,
          })

        if (registrationResponse.isLeft()) {
          return left(registrationResponse.value)
        }

        const findResponse = await this.find({
          field: FindPartnerField.ID,
          content: registrationResponse.value.lastId,
          tenantId,
        })

        if (findResponse.isLeft()) {
          return left(findResponse.value)
        }

        if (findResponse.value.partners.length) {
          return left(
            new AppError(ErrorCodes.REGISTRATION_ID_IS_ALREADY_REGISTERED)
          )
        }

        updatedData.registrationId = registrationResponse.value.lastId

        const partnerRequest = await PartnerModel.transaction.update(
          { id },
          { ...updatedData }
        )

        await dynamoose.transaction(
          [registrationResponse.value.request, partnerRequest],
          this.settings
        )

        return right({ partner: updatedData })
      }

      const partner = await PartnerModel.update({ id }, { ...updatedData })

      return right({ partner })
    } catch (err) {
      console.log("[ERROR] PartnersRepository > update", err)
      return left(new AppError(ErrorCodes.INTERNAL))
    }
  }

  async find({
    field,
    content,
    tenantId,
  }: IFindPartnerInput): Promise<IFindPartnerResponseDTO> {
    try {
      const isFilteringById = field === FindPartnerField.ID
      const response = isFilteringById
        ? await PartnerModel.scan({ [FindPartnerField.ID]: content })
            .all()
            .exec()
        : await PartnerModel.scan({
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

  async getAll({
    tenantId,
    size,
    startAt,
  }: IGetAllPartnersInput): Promise<IGetAllPartnersResponseDTO> {
    try {
      const scan = PartnerModel.scan().where("tenantId").eq(tenantId)

      if (size) scan.limit(size)
      if (startAt) scan.startAt({ id: startAt })

      const total = await PartnerModel.scan().count().exec()
      const partners = await scan.exec()

      return right({
        partners,
        count: partners.length,
        total: total.count,
        lastKey: !partners?.count
          ? null
          : ((partners?.lastKey?.id ?? null) as string | null),
      })
    } catch (err) {
      console.log("[ERROR] PartnersRepository > getAll", err)
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
        return left(new AppError(ErrorCodes.PARTNER_NOT_FOUND))
      }

      await PartnerModel.delete({ id })
      return right({ success: true })
    } catch (err) {
      console.log("[ERROR] PartnersRepository > delete", err)
      return left(new AppError(ErrorCodes.INTERNAL))
    }
  }
}
