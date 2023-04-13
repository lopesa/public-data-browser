export type DepartmentOfTreasuryDistributionItem = {
  "@type": string;
  downloadURL?: string;
  accessURL?: string;
  format: string;
  mediaType: string;
  title: string;
};

export type DepartmentOfTreasuryDataItem = {
  [key: string]: string | DepartmentOfTreasuryDistributionItem[] | undefined;
  description: string;
  title: string;
  id: string;
  distribution?: DepartmentOfTreasuryDistributionItem[];
};

export type DepartmentOfTreasury = {
  dataset: DepartmentOfTreasuryDataItem[];
};
