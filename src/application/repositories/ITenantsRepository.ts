import {
  ICreateTenantDTO,
  ICreateTenantResponseDTO
} from "@application/modules/tenant/dto/ICreateTenantDTO"

interface ITenantsRepository {
  create(payload: ICreateTenantDTO): Promise<ICreateTenantResponseDTO>
}

export { ITenantsRepository }
