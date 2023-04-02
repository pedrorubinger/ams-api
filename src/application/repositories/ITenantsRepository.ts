import {
  ICreateTenantDTO,
  ICreateTenantResponseDTO,
} from "@application/modules/tenant/dto/ICreateTenantDTO"
import {
  IUpdateTenantDTO,
  IUpdateTenantResponseDTO,
} from "@application/modules/tenant/dto/IUpdateTenantDTO"
import {
  IGetAllTenantsParamsDTO,
  IGetAllTenantsResponseDTO,
} from "@application/modules/tenant/dto/IGetAllTenantsResponseDTO"
import { IDeleteTenantResponseDTO } from "@application/modules/tenant/dto/IDeleteTenantDTO"

interface ITenantsRepository {
  create(payload: ICreateTenantDTO): Promise<ICreateTenantResponseDTO>
  update(payload: IUpdateTenantDTO): Promise<IUpdateTenantResponseDTO>
  getAll(params?: IGetAllTenantsParamsDTO): Promise<IGetAllTenantsResponseDTO>
  delete(id: string): Promise<IDeleteTenantResponseDTO>
}

export { ITenantsRepository }
