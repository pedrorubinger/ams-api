import {
  ICreatePartnerDTO,
  ICreatePartnerResponseDTO,
} from "@application/modules/partner/dto"
import {
  IUpdatePartnerDTO,
  IUpdatePartnerResponseDTO,
} from "@application/modules/partner/dto/IUpdatePartnerDTO"

interface IPartnersRepository {
  create(payload: ICreatePartnerDTO): Promise<ICreatePartnerResponseDTO>
  update(payload: IUpdatePartnerDTO): Promise<IUpdatePartnerResponseDTO>
}

export { IPartnersRepository }
