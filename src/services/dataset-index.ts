import {
  useGetBaseDepartmentOfAgricultureDataAllQuery,
  useGetDepartmentOfAgricultureDataByIdQuery,
  useGetBaseDepartmentOfEnergyDataAllQuery,
  useGetDepartmentOfEnergyDataByIdQuery,
} from "services/apiSlice";

import { DatasetsAvailable } from "types/dataset-index-type";

export const DatasetIndex: {
  [key in DatasetsAvailable]: {
    title: string;
    getAll:
      | typeof useGetBaseDepartmentOfAgricultureDataAllQuery
      | typeof useGetBaseDepartmentOfEnergyDataAllQuery;
    getById:
      | typeof useGetDepartmentOfAgricultureDataByIdQuery
      | typeof useGetDepartmentOfEnergyDataByIdQuery;
    endpointName?:
      | "getBaseDepartmentOfAgricultureDataAll"
      | "getBaseDepartmentOfEnergyDataAll";
  };
} = {
  departmentOfAgriculture: {
    title: "US Department of Agriculture",
    getAll: useGetBaseDepartmentOfAgricultureDataAllQuery,
    getById: useGetDepartmentOfAgricultureDataByIdQuery,
    endpointName: "getBaseDepartmentOfAgricultureDataAll",
  },
  departmentOfEnergy: {
    title: "US Department of Energy",
    getAll: useGetBaseDepartmentOfEnergyDataAllQuery,
    getById: useGetDepartmentOfEnergyDataByIdQuery,
    endpointName: "getBaseDepartmentOfEnergyDataAll",
  },
};

export const getDatasetGetAllMethod = (
  dataset: DatasetsAvailable
):
  | typeof useGetBaseDepartmentOfAgricultureDataAllQuery
  | typeof useGetBaseDepartmentOfEnergyDataAllQuery => {
  return DatasetIndex[dataset].getAll;
};

export const getDatasetEndpointName = (dataset: DatasetsAvailable) => {
  return DatasetIndex[dataset].endpointName;
};

export default DatasetIndex;
