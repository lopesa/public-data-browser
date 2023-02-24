import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { DepartmentOfAgricultureDataItem } from "types/department-of-agriculture";
import { DepartmentOfEnergyDataItem } from "types/department-of-energy";

interface DataItemsAccordionProps {
  dataItems: DepartmentOfAgricultureDataItem[] | DepartmentOfEnergyDataItem[];
}

const DataItemsAccordion = ({ dataItems }: DataItemsAccordionProps) => {
  return (
    <Accordion.Root type="multiple">
      {dataItems?.length &&
        dataItems.map((dataItem, index) => (
          <Accordion.Item key={index} value={dataItem.id}>
            <Accordion.Header>
              <Accordion.Trigger>
                {dataItem.title}
                <ChevronDownIcon />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>{dataItem.description}</Accordion.Content>
          </Accordion.Item>
        ))}
    </Accordion.Root>
  );
};

export default DataItemsAccordion;
