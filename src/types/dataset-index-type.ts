import {
  useGetBaseDepartmentOfAgricultureDataAllQuery,
  useGetDepartmentOfAgricultureDataByIdQuery,
  useGetBaseDepartmentOfEnergyDataAllQuery,
  useGetDepartmentOfEnergyDataByIdQuery,
  useGetInternationalCoffeeOrganizationDataAllQuery,
  useGetInternationalCoffeeOrganizationDataByIdQuery,
  useGetBaseDepartmentOfTreasuryDataAllQuery,
  useGetDepartmentOfTreasuryDataByIdQuery,
} from "services/apiSlice";

export const enum DatasetsAvailable {
  departmentOfAgriculture = "departmentOfAgriculture",
  departmentOfEnergy = "departmentOfEnergy",
  departmentOfTreasury = "departmentOfTreasury",
  internationalCoffeeOrganization = "internationalCoffeeOrganization",
}

export type DatasetEndpointNames =
  | "getBaseDepartmentOfAgricultureDataAll"
  | "getBaseDepartmentOfEnergyDataAll"
  | "getBaseDepartmentOfTreasuryDataAll"
  | "getInternationalCoffeeOrganizationDataAll";

export type GetAllQueryMethodTypes =
  | typeof useGetBaseDepartmentOfAgricultureDataAllQuery
  | typeof useGetBaseDepartmentOfEnergyDataAllQuery
  | typeof useGetBaseDepartmentOfTreasuryDataAllQuery
  | typeof useGetInternationalCoffeeOrganizationDataAllQuery;

export type GetByIdQueryMethodTypes =
  | typeof useGetDepartmentOfAgricultureDataByIdQuery
  | typeof useGetDepartmentOfEnergyDataByIdQuery
  | typeof useGetDepartmentOfTreasuryDataByIdQuery
  | typeof useGetInternationalCoffeeOrganizationDataByIdQuery;
