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
      const record = await PartnerRegistrationIdModel.update({ id }, { lastId })

      await record.save()

      return right({ lastId: record.lastId })
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
      const record = await PartnerRegistrationIdModel.create({
        ...registrationId.props,
        id: registrationId.id,
      })

      await record.save()

      return right({ lastId: record.lastId })
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
        return await this.update({
          id: record.id,
          lastId: lastId || String(Number(record.lastId) + 1),
        })
      }

      /* Once no record is found, creates the first one */
      return await this.create({ lastId: lastId || "1" })
    } catch (err) {
      console.log("[ERROR] PartnerRegistrationIdsRepository > upsert", err)
      return left(new AppError(ErrorCodes.INTERNAL))
    }
  }
}
