import { useGetBaseDepartmentOfAgricultureDataQuery } from "services/department-of-agriculture";

import { DatasetsAvailable } from "types/dataset-index-type";

const DatasetIndex: {
  [key in DatasetsAvailable]: {
    title: string;
    dataService: any;
  };
} = {
  departmentOfAgriculture: {
    title: "Department of Agriculture",
    dataService: useGetBaseDepartmentOfAgricultureDataQuery,
  },
};

export default DatasetIndex;
