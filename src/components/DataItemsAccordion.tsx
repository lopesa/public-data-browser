import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { DepartmentOfAgricultureDataItem } from "types/department-of-agriculture";
import { DepartmentOfEnergyDataItem } from "types/department-of-energy";
import styles from "styles/DataItemsAccordion.module.scss";
import { useEffect, useState } from "react";
import DOMPurify from "dompurify";

interface DataItemsAccordionProps {
  dataItems: DepartmentOfAgricultureDataItem[] | DepartmentOfEnergyDataItem[];
  openAll?: boolean;
}

const DataItemsAccordion = ({
  dataItems,
  openAll,
}: DataItemsAccordionProps) => {
  const [value, setValue] = useState<string[]>([]);
  useEffect(() => {
    if (openAll) {
      setValue(dataItems.map((item) => item.id));
    } else {
      setValue([]);
    }
  }, [dataItems, openAll]);
  return (
    <Accordion.Root
      type="multiple"
      className={styles.AccordionRoot}
      value={value}
      onValueChange={setValue}
    >
      {dataItems?.length &&
        dataItems.map((dataItem, index) => (
          <Accordion.Item key={index} value={dataItem.id}>
            <Accordion.Header>
              <Accordion.Trigger className={styles.AccordionTrigger}>
                {dataItem.title}
                <ChevronDownIcon />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className={styles.AccordionContent}>
              {/* {dataItem.description} */}
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(dataItem.description),
                }}
              ></div>
            </Accordion.Content>
          </Accordion.Item>
        ))}
    </Accordion.Root>
  );
};

export default DataItemsAccordion;
