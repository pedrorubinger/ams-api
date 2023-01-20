import {
  ICreateTenantDTO,
  ICreateTenantResponseDTO
} from "@application/modules/tenant/dto/ICreateTenantDTO"
import {
  IGetAllTenantsParamsDTO,
  IGetAllTenantsResponseDTO
} from "@application/modules/tenant/dto/IGetAllTenantsResponseDTO"

interface ITenantsRepository {
  create(payload: ICreateTenantDTO): Promise<ICreateTenantResponseDTO>
  getAll(params?: IGetAllTenantsParamsDTO): Promise<IGetAllTenantsResponseDTO>
}

export { ITenantsRepository }
