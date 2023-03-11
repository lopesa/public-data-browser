import * as Accordion from "@radix-ui/react-accordion";
import {
  ChevronDownIcon,
  BookmarkIcon,
  BookmarkFilledIcon,
} from "@radix-ui/react-icons";
import { DepartmentOfAgricultureDataItem } from "types/department-of-agriculture";
import { DepartmentOfEnergyDataItem } from "types/department-of-energy";
import styles from "styles/DataItemsAccordion.module.scss";
import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import DataItemDialog from "./DataItemDialog";
import { DatasetsAvailable } from "types/dataset-index-type";
import { InitialIndexDataItem } from "types/types-general";
import {
  addBookmark,
  removeBookmark,
  selectBookmarks,
} from "features/bookmarksSlice";
import { useAppDispatch, useAppSelector } from "app/hooks";

interface DataItemsAccordionProps {
  dataItems: InitialIndexDataItem[];
  datasetId: DatasetsAvailable;
  openAll?: boolean;
}

const DataItemsAccordion = ({
  dataItems,
  datasetId,
  openAll,
}: DataItemsAccordionProps) => {
  const [value, setValue] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const bookmarks = useAppSelector(selectBookmarks);

  useEffect(() => {
    if (openAll) {
      setValue(dataItems.map((item) => item.id));
    } else {
      setValue([]);
    }
  }, [dataItems, openAll]);

  const isBookmarked = (id: string) => {
    return bookmarks.find((item) => item.id === id);
  };

  const onClickBookmark = (e: React.MouseEvent<SVGElement>) => {
    e.preventDefault();
    const id = e.currentTarget.dataset.itemId;
    if (!id) {
      return;
    }
    const fullDataItemFromId = dataItems.find((item) => item.id === id);
    if (!fullDataItemFromId) {
      return;
    }
    isBookmarked(id)
      ? dispatch(removeBookmark(fullDataItemFromId))
      : dispatch(addBookmark(fullDataItemFromId));
  };

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
                {isBookmarked(dataItem.id) ? (
                  <BookmarkFilledIcon
                    data-item-id={dataItem.id}
                    onClick={onClickBookmark}
                  />
                ) : (
                  <BookmarkIcon
                    data-item-id={dataItem.id}
                    onClick={onClickBookmark}
                  />
                )}
                <ChevronDownIcon />
                {dataItem.title}
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className={styles.AccordionContent}>
              <div>{dataItem.description}</div>
              <DataItemDialog
                key={index}
                dataItem={dataItem}
                datasetId={datasetId}
              />
            </Accordion.Content>
          </Accordion.Item>
        ))}
    </Accordion.Root>
  );
};

export default DataItemsAccordion;
