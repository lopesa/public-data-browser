import * as Accordion from "@radix-ui/react-accordion";
import {
  ChevronDownIcon,
  BookmarkIcon,
  BookmarkFilledIcon,
} from "@radix-ui/react-icons";
import styles from "styles/DataItemsAccordion.module.scss";
import { useEffect, useState } from "react";
import DataItemDialog from "./DataItemDialog";
import { DatasetsAvailable } from "types/dataset-index-type";
import { InitialIndexDataItem } from "types/types-general";
import {
  addBookmark,
  removeBookmark,
  selectBookmarks,
} from "features/bookmarksSlice";
import { useAppDispatch, useAppSelector } from "app/hooks";
import PDBAlert from "components/PDBAlert";
import {
  setHasSeenMakeAccountSuggestionDialog,
  selectHasSeenMakeAccountSuggestionDialog,
} from "app/User.slice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface DataItemsAccordionProps {
  dataItems: InitialIndexDataItem[];
  datasetId: DatasetsAvailable;
  openAll?: boolean;
}

const DataItemsAccordion = ({
  dataItems,
  openAll,
}: DataItemsAccordionProps) => {
  const [value, setValue] = useState<string[]>([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const dispatch = useAppDispatch();
  const bookmarks = useAppSelector(selectBookmarks);
  const hasSeenMakeAccountSuggestionDialog = useSelector(
    selectHasSeenMakeAccountSuggestionDialog
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (openAll) {
      setValue(dataItems.map((item) => item.id));
    } else {
      setValue([]);
    }
  }, [dataItems, openAll]);

  const isBookmarked = (id: string) => {
    return bookmarks.find((bookmark) => bookmark.id === id);
  };

  const onClickBookmark = (e: React.MouseEvent<SVGElement>) => {
    e.preventDefault();
    if (!hasSeenMakeAccountSuggestionDialog) {
      setAlertOpen(true);
      dispatch(setHasSeenMakeAccountSuggestionDialog(true));
    }
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
    <>
      <PDBAlert
        open={alertOpen}
        title="Do you want to login or create a free account to persist/retrieve your bookmarks?"
        cancelText="No Thanks"
        actionText="Yes"
        action={() => navigate("/bookmarks")}
        cancelAction={() => setAlertOpen(false)}
      />
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
                  datasetId={DatasetsAvailable.departmentOfAgriculture}
                />
              </Accordion.Content>
            </Accordion.Item>
          ))}
      </Accordion.Root>
    </>
  );
};

export default DataItemsAccordion;
