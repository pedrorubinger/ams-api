import {
  ICreateTenantDTO,
  ICreateTenantResponseDTO,
  IUpdateTenantDTO,
  IUpdateTenantResponseDTO,
  IGetAllTenantsParamsDTO,
  IGetAllTenantsResponseDTO,
  IDeleteTenantResponseDTO,
  IFindTenantResponseDTO,
} from "@application/modules/tenant"

interface ITenantsRepository {
  create(payload: ICreateTenantDTO): Promise<ICreateTenantResponseDTO>
  update(payload: IUpdateTenantDTO): Promise<IUpdateTenantResponseDTO>
  getAll(params?: IGetAllTenantsParamsDTO): Promise<IGetAllTenantsResponseDTO>
  find(id: string): Promise<IFindTenantResponseDTO>
  delete(id: string): Promise<IDeleteTenantResponseDTO>
}

export { ITenantsRepository }
