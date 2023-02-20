import {
  useGetBaseDepartmentOfAgricultureDataAllQuery,
  useGetDepartmentOfAgricultureDataByIdQuery,
} from "services/department-of-agriculture";

import { DatasetsAvailable } from "types/dataset-index-type";

const DatasetIndex: {
  [key in DatasetsAvailable]: {
    title: string;
    getAll: typeof useGetBaseDepartmentOfAgricultureDataAllQuery;
    getById: typeof useGetDepartmentOfAgricultureDataByIdQuery;
  };
} = {
  departmentOfAgriculture: {
    title: "Department of Agriculture",
    getAll: useGetBaseDepartmentOfAgricultureDataAllQuery,
    getById: useGetDepartmentOfAgricultureDataByIdQuery,
  },
};

export default DatasetIndex;
