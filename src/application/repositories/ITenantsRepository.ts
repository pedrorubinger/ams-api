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
import { IFindTenantResponseDTO } from "../modules/tenant/dto/IFindTenantDTO"

interface ITenantsRepository {
  create(payload: ICreateTenantDTO): Promise<ICreateTenantResponseDTO>
  update(payload: IUpdateTenantDTO): Promise<IUpdateTenantResponseDTO>
  getAll(params?: IGetAllTenantsParamsDTO): Promise<IGetAllTenantsResponseDTO>
  find(id: string): Promise<IFindTenantResponseDTO>
  delete(id: string): Promise<IDeleteTenantResponseDTO>
}

export { ITenantsRepository }
