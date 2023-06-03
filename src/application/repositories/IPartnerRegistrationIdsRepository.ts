import {
  ICreatePartnerRegistrationIdDTO,
  ICreatePartnerRegistrationIdResponseDTO,
  IUpdatePartnerRegistrationIdDTO,
  IUpdatePartnerRegistrationIdResponseDTO,
  IUpsertPartnerRegistrationIdDTO,
  IUpsertPartnerRegistrationIdResponseDTO,
} from "@application/modules/partnerRegistrationId"

interface IPrivatePartnerRegistrationIdsRepository {
  create(
    payload: ICreatePartnerRegistrationIdDTO
  ): Promise<ICreatePartnerRegistrationIdResponseDTO>
  update(
    payload: IUpdatePartnerRegistrationIdDTO
  ): Promise<IUpdatePartnerRegistrationIdResponseDTO>
}

interface IPartnerRegistrationIdsRepository {
  upsert(
    payload: IUpsertPartnerRegistrationIdDTO
  ): Promise<IUpsertPartnerRegistrationIdResponseDTO>
}

export {
  IPrivatePartnerRegistrationIdsRepository,
  IPartnerRegistrationIdsRepository,
}
