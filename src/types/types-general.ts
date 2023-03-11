import { DepartmentOfAgricultureDataItem } from "./department-of-agriculture";
import { DepartmentOfEnergyDataItem } from "./department-of-energy";

export type InitialIndexDataItem = {
  id: string;
  title: string;
  dataTypesByFileExtension?: string[];
  description?: string;
  spatialData?: boolean;
  apiData?: boolean;
};

export type InitialIndexData = {
  data: InitialIndexDataItem[];
  originalJsonDataUrl: string;
  originalIntialUrl: string;
};

export type SpreadsheetData = {
  totalRows: number;
  data: string[][];
};

export type FullDataItem =
  | DepartmentOfAgricultureDataItem
  | DepartmentOfEnergyDataItem;
