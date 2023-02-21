type DepartmentOfEnergyDistibutionItem = {
  "@type": string;
  downloadURL: string;
  accessURL: string;
  format: string;
  mediaType: string;
  title: string;
};

export type DepartmentOfEnergyDataItem = {
  description: string;
  title: string;
  id: string;
  identifier?: string;
  accessLevel?: string;
  contactPoint?: string;
  programCode?: string;
  distribution?: DepartmentOfEnergyDistibutionItem[];
  license?: string;
  bureauCode?: string;
  modified?: string;
  publisher?: string;
  accrualPeriodicity?: string;
  keyword?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
  org?: string;
  vcard?: string;
  foaf?: string;
  dc?: string;
  pod?: string;
  skos?: string;
  describedBy?: string;
  downloadURL?: string;
  accessURL?: string;
  issued?: string;
  language?: string;
  rights?: string;
  spatial?: string;
  conformsTo?: string;
  temporal?: string;
  format?: string;
  homepage?: string;
  dataQuality?: string;
  describedByType?: string;
  primaryITInvestmentUII?: string;
  fn?: string;
  hasEmail?: string;
  name?: string;
  subOrganizationOf?: string;
  landingPage?: string;
  references?: string;
  theme?: string;
  systemOfRecords?: string;
  isPartOf?: string;
};

export type DepartmentOfEnergyDataItemDetail = {
  description: string;
  title: string;
  id: string;
};

export type DepartmentOfEnergy = {
  dataset: DepartmentOfEnergyDataItem[];
};
