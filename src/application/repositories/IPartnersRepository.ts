import {
  ICreatePartnerDTO,
  ICreatePartnerResponseDTO,
  IDeletePartnerInput,
  IDeletePartnerResponseDTO,
  IFindPartnerInput,
  IFindPartnerResponseDTO,
} from "@application/modules/partner/dto"
import {
  IGetAllPartnersInput,
  IGetAllPartnersResponseDTO,
} from "@application/modules/partner/dto/IGetAllPartnersDTO"
import {
  IUpdatePartnerDTO,
  IUpdatePartnerResponseDTO,
} from "@application/modules/partner/dto/IUpdatePartnerDTO"

interface IPartnersRepository {
  create(payload: ICreatePartnerDTO): Promise<ICreatePartnerResponseDTO>
  update(payload: IUpdatePartnerDTO): Promise<IUpdatePartnerResponseDTO>
  find(payload: IFindPartnerInput): Promise<IFindPartnerResponseDTO>
  getAll(payload: IGetAllPartnersInput): Promise<IGetAllPartnersResponseDTO>
  delete(payload: IDeletePartnerInput): Promise<IDeletePartnerResponseDTO>
}

export { IPartnersRepository }
