import {
  ICreatePartnerRegistrationIdDTO,
  ICreatePartnerRegistrationIdResponseDTO,
  IUpdatePartnerRegistrationIdDTO,
  IUpdatePartnerRegistrationIdResponseDTO,
  IUpsertPartnerRegistrationIdDTO,
  IUpsertPartnerRegistrationIdResponseDTO,
} from "@application/modules/partnerRegistrationId"
import {
  IPartnerRegistrationIdsRepository,
  IPrivatePartnerRegistrationIdsRepository,
} from "@application/repositories"
import { PartnerRegistrationId } from "@domain/entities"
import { PartnerRegistrationIdModel } from "@domain/infra/dynamoose"
import { AppError, ErrorCodes, left, right } from "@shared/errors"

export class PartnerRegistrationIdsRepository
  implements
    IPrivatePartnerRegistrationIdsRepository,
    IPartnerRegistrationIdsRepository
{
  async update({
    id,
    lastId,
  }: IUpdatePartnerRegistrationIdDTO): Promise<IUpdatePartnerRegistrationIdResponseDTO> {
    try {
      const request = await PartnerRegistrationIdModel.transaction.update(
        { id },
        { lastId }
      )

      return right({ request })
    } catch (err) {
      console.log("[ERROR] PartnerRegistrationIdsRepository > update", err)
      return left(new AppError(ErrorCodes.INTERNAL))
    }
  }

  async create({
    lastId,
  }: ICreatePartnerRegistrationIdDTO): Promise<ICreatePartnerRegistrationIdResponseDTO> {
    try {
      const registrationId = new PartnerRegistrationId({ lastId })
      const request = await PartnerRegistrationIdModel.transaction.create({
        ...registrationId.props,
        id: registrationId.id,
      })

      return right({ request })
    } catch (err) {
      console.log("[ERROR] PartnerRegistrationIdsRepository > create", err)
      return left(new AppError(ErrorCodes.INTERNAL))
    }
  }

  async upsert({
    lastId,
  }: IUpsertPartnerRegistrationIdDTO): Promise<IUpsertPartnerRegistrationIdResponseDTO> {
    try {
      const records = await PartnerRegistrationIdModel.scan().all().exec()
      const record = records?.[0]

      /* If a registrationId is already registered, increments it */
      if (record?.lastId) {
        const nextId = lastId || String(Number(record.lastId) + 1)
        const response = await this.update({
          id: record.id,
          lastId: nextId,
        })

        if (response.isLeft()) return left(response.value)

        return right({ lastId: nextId, request: response.value.request })
      }

      /* Once no record is found, creates the first one */
      const nextId = lastId || "1"
      const response = await this.create({ lastId: nextId })

      if (response.isLeft()) return left(response.value)

      return right({ lastId: nextId, request: response.value.request })
    } catch (err) {
      console.log("[ERROR] PartnerRegistrationIdsRepository > upsert", err)
      return left(new AppError(ErrorCodes.INTERNAL))
    }
  }
}
