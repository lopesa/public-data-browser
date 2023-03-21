import { DepartmentOfAgricultureDataItem } from "./department-of-agriculture";
import { DepartmentOfEnergyDataItem } from "./department-of-energy";

import { DatasetsAvailable } from "types/dataset-index-type";

export type InitialIndexDataItem = {
  datasetId: DatasetsAvailable;
  id: string;
  title: string;
  dataTypesByFileExtension?: string[];
  description?: string;
  spatialData?: boolean;
  apiData?: boolean;
};

export interface InitialBookmarkIndexDataItem extends InitialIndexDataItem {
  originalId: string;
}

export type InitialIndexData = {
  data: InitialIndexDataItem[];
  originalJsonDataUrl: string;
  originalIntialUrl: string;
};

export type SpreadsheetData = {
  totalRows: number;
  data: string[][];
};

export type User = {
  id?: string;
  name?: string;
  token: string;
  email?: string;
};

export type FullDataItem =
  | DepartmentOfAgricultureDataItem
  | DepartmentOfEnergyDataItem;
