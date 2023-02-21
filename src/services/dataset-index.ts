import {
  useGetBaseDepartmentOfAgricultureDataAllQuery,
  useGetDepartmentOfAgricultureDataByIdQuery,
} from "services/department-of-agriculture";

import {
  useGetBaseDepartmentOfEnergyDataAllQuery,
  useGetDepartmentOfEnergyDataByIdQuery,
} from "services/department-of-energy";

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
  };
} = {
  departmentOfAgriculture: {
    title: "US Department of Agriculture",
    getAll: useGetBaseDepartmentOfAgricultureDataAllQuery,
    getById: useGetDepartmentOfAgricultureDataByIdQuery,
  },
  departmentOfEnergy: {
    title: "US Department of Energy",
    getAll: useGetBaseDepartmentOfEnergyDataAllQuery,
    getById: useGetDepartmentOfEnergyDataByIdQuery,
  },
};

export default DatasetIndex;
