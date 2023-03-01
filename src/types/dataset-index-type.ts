import {
  useGetBaseDepartmentOfAgricultureDataAllQuery,
  useGetDepartmentOfAgricultureDataByIdQuery,
  useGetBaseDepartmentOfEnergyDataAllQuery,
  useGetDepartmentOfEnergyDataByIdQuery,
} from "services/apiSlice";

export const enum DatasetsAvailable {
  departmentOfAgriculture = "departmentOfAgriculture",
  departmentOfEnergy = "departmentOfEnergy",
}

export type DatasetEndpointNames =
  | "getBaseDepartmentOfAgricultureDataAll"
  | "getBaseDepartmentOfEnergyDataAll";

export type GetAllQueryMethodTypes =
  | typeof useGetBaseDepartmentOfAgricultureDataAllQuery
  | typeof useGetBaseDepartmentOfEnergyDataAllQuery;

export type GetByIdQueryMethodTypes =
  | typeof useGetDepartmentOfAgricultureDataByIdQuery
  | typeof useGetDepartmentOfEnergyDataByIdQuery;
