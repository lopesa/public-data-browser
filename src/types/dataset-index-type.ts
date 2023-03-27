import {
  useGetBaseDepartmentOfAgricultureDataAllQuery,
  useGetDepartmentOfAgricultureDataByIdQuery,
  useGetBaseDepartmentOfEnergyDataAllQuery,
  useGetDepartmentOfEnergyDataByIdQuery,
  useGetInternationalCoffeeOrganizationDataAllQuery,
  useGetInternationalCoffeeOrganizationDataByIdQuery,
} from "services/apiSlice";

export const enum DatasetsAvailable {
  departmentOfAgriculture = "departmentOfAgriculture",
  departmentOfEnergy = "departmentOfEnergy",
  internationalCoffeeOrganization = "internationalCoffeeOrganization",
}

export type DatasetEndpointNames =
  | "getBaseDepartmentOfAgricultureDataAll"
  | "getBaseDepartmentOfEnergyDataAll"
  | "getInternationalCoffeeOrganizationDataAll";

export type GetAllQueryMethodTypes =
  | typeof useGetBaseDepartmentOfAgricultureDataAllQuery
  | typeof useGetBaseDepartmentOfEnergyDataAllQuery
  | typeof useGetInternationalCoffeeOrganizationDataAllQuery;

export type GetByIdQueryMethodTypes =
  | typeof useGetDepartmentOfAgricultureDataByIdQuery
  | typeof useGetDepartmentOfEnergyDataByIdQuery
  | typeof useGetInternationalCoffeeOrganizationDataByIdQuery;
