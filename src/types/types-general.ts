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
