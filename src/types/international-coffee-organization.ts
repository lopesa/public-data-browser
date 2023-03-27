export type InternationalCoffeeOrganizationDistributionItem = {
  downloadURL?: string;
  title: string;
};

export type InternationalCoffeeOrganizationDataItem = {
  id: string;
  title: string;
  description?: string;
  distribution?: InternationalCoffeeOrganizationDistributionItem[];
};
