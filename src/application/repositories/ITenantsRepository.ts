import {
  ICreateTenantDTO,
  ICreateTenantResponseDTO
} from "@application/modules/tenant/dto/ICreateTenantDTO"
import { IGetAllTenantsResponseDTO } from "@application/modules/tenant/dto/IGetAllTenantsResponseDTO"

interface ITenantsRepository {
  create(payload: ICreateTenantDTO): Promise<ICreateTenantResponseDTO>
  getAll(): Promise<IGetAllTenantsResponseDTO>
}

export { ITenantsRepository }
