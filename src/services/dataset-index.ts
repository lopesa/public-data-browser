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

import {
  DatasetsAvailable,
  DatasetEndpointNames,
  GetAllQueryMethodTypes,
  GetByIdQueryMethodTypes,
} from "types/dataset-index-type";

interface DatasetInfo {
  title: string;
  getAll: GetAllQueryMethodTypes;
  getById: GetByIdQueryMethodTypes;
  endpointName?: DatasetEndpointNames;
}

export const DatasetIndex: Record<DatasetsAvailable, DatasetInfo> = {
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
  departmentOfTreasury: {
    title: "US Department of Treasury",
    getAll: useGetBaseDepartmentOfTreasuryDataAllQuery,
    getById: useGetDepartmentOfTreasuryDataByIdQuery,
    endpointName: "getBaseDepartmentOfEnergyDataAll",
  },
  internationalCoffeeOrganization: {
    title: "International Coffee Organization",
    getAll: useGetInternationalCoffeeOrganizationDataAllQuery,
    getById: useGetInternationalCoffeeOrganizationDataByIdQuery,
    endpointName: "getInternationalCoffeeOrganizationDataAll",
  },
};

export const getDatasetGetAllMethod = (
  dataset: DatasetsAvailable
): GetAllQueryMethodTypes => {
  return DatasetIndex[dataset].getAll;
};

export const getDatasetEndpointName = (dataset: DatasetsAvailable) => {
  return DatasetIndex[dataset].endpointName;
};

export default DatasetIndex;
