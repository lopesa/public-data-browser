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
import {
  InitialBookmarkIndexDataItem,
  InitialIndexDataItem,
} from "types/types-general";
import {
  addBookmark,
  removeBookmark as removeBookmarkLocal,
  selectBookmarks,
} from "features/bookmarksSlice";
import {
  useAddBookmarksMutation,
  useLazyGetBookmarksQuery,
  useRemoveBookmarkMutation,
} from "services/apiSlice";
import { useAppDispatch, useAppSelector } from "app/hooks";
import LoginSignupDialog from "components/LoginSignupDialog";
import {
  setHasSeenMakeAccountSuggestionDialog,
  selectHasSeenMakeAccountSuggestionDialog,
} from "app/User.slice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectToken } from "app/User.slice";
import { selectDatasetSelected } from "app/DatasetSelected.slice";

interface DataItemsAccordionProps {
  dataItems: InitialIndexDataItem[] | InitialBookmarkIndexDataItem[];
  datasetId: DatasetsAvailable;
  openAll?: boolean;
}

const DataItemsAccordion = ({
  dataItems,
  openAll,
}: DataItemsAccordionProps) => {
  const localBookmarks = useAppSelector(selectBookmarks);
  const activeDataset = useSelector(selectDatasetSelected);
  const [getRemoteBookmarks, { data: remoteBookmarks, isLoading, error }] =
    useLazyGetBookmarksQuery();
  const [value, setValue] = useState<string[]>([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const token = useAppSelector(selectToken);
  let bookmarks = token ? remoteBookmarks : localBookmarks;
  const dispatch = useAppDispatch();

  const hasSeenMakeAccountSuggestionDialog = useSelector(
    selectHasSeenMakeAccountSuggestionDialog
  );
  const navigate = useNavigate();

  const [
    addBookmarks,
    { isLoading: addBookmarksIsLoading, error: addBookmarksError },
  ] = useAddBookmarksMutation();

  const [
    removeBookmark,
    { isLoading: removeBookmarkIsLoading, error: removeBookmarkError },
  ] = useRemoveBookmarkMutation();

  useEffect(() => {
    if (token) {
      getRemoteBookmarks();
    }
  }, [token, getRemoteBookmarks]);

  useEffect(() => {
    if (openAll) {
      setValue(dataItems.map((item) => item.id));
    } else {
      setValue([]);
    }
  }, [dataItems, openAll]);

  const isBookmarked = (id: string) => {
    return (
      bookmarks &&
      bookmarks.find((bookmark) =>
        token
          ? (bookmark as InitialBookmarkIndexDataItem).originalId === id
          : bookmark.id === id
      )
    );
  };

  const onClickBookmark = async (e: React.MouseEvent<SVGElement>) => {
    e.preventDefault();
    if (!token && !hasSeenMakeAccountSuggestionDialog) {
      setDialogOpen(true);
      dispatch(setHasSeenMakeAccountSuggestionDialog(true));
    }

    const id = e.currentTarget.dataset.itemId;
    if (!id) {
      return;
    }

    const fullDataItemFromId = dataItems.find((item) =>
      isInitialBookmarkIndexDataItem(item) ? item.originalId : item.id === id
    );

    if (!fullDataItemFromId) {
      return;
    }

    if (token) {
      if (!isBookmarked(id)) {
        const bookmarks = [
          { dataItemUuid: id, datasetId: fullDataItemFromId.datasetId },
        ];
        const result = await addBookmarks(bookmarks)
          .unwrap()
          .catch((error) => {
            // debugger;
            // setServerError(true);
            // @TODO: setServerErrors, after getting a better response back from the server
            // actually, keeping this simple for now, just showing a generic error message
          });
      } else {
        // debugger;
        const result = await removeBookmark(id)
          .unwrap()
          .catch((error) => {
            // debugger;
            // setServerError(true);
          });
      }
      getRemoteBookmarks();
    } else {
      isBookmarked(id)
        ? dispatch(removeBookmarkLocal(fullDataItemFromId))
        : dispatch(addBookmark(fullDataItemFromId));
    }
  };

  const isInitialBookmarkIndexDataItem = (
    indexItem: InitialBookmarkIndexDataItem | InitialIndexDataItem
  ): indexItem is InitialBookmarkIndexDataItem => {
    return (indexItem as InitialBookmarkIndexDataItem).originalId !== undefined;
  };

  return (
    <>
      <LoginSignupDialog
        parentOpen={dialogOpen}
        parentSetOpen={setDialogOpen}
        onSuccess={() => setDialogOpen(false)}
        showNoThanksButton={true}
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
              <Accordion.Header className={styles.AccordionHeader}>
                {isBookmarked(
                  isInitialBookmarkIndexDataItem(dataItem)
                    ? dataItem.originalId
                    : dataItem.id
                ) ? (
                  <BookmarkFilledIcon
                    data-item-id={
                      isInitialBookmarkIndexDataItem(dataItem)
                        ? dataItem.originalId
                        : dataItem.id
                    }
                    onClick={onClickBookmark}
                  />
                ) : (
                  <BookmarkIcon
                    data-item-id={dataItem.id}
                    onClick={onClickBookmark}
                  />
                )}
                <Accordion.Trigger className={styles.AccordionTrigger}>
                  {/* {isBookmarked(
                    isInitialBookmarkIndexDataItem(dataItem)
                      ? dataItem.originalId
                      : dataItem.id
                  ) ? (
                    <BookmarkFilledIcon
                      data-item-id={
                        isInitialBookmarkIndexDataItem(dataItem)
                          ? dataItem.originalId
                          : dataItem.id
                      }
                      onClick={onClickBookmark}
                    />
                  ) : (
                    <BookmarkIcon
                      data-item-id={dataItem.id}
                      onClick={onClickBookmark}
                    />
                  )} */}

                  <ChevronDownIcon />
                  {dataItem.title}
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className={styles.AccordionContent}>
                <div>{dataItem.description}</div>
                {activeDataset && (
                  <DataItemDialog
                    key={index}
                    dataItem={dataItem}
                    datasetId={activeDataset}
                  />
                )}
              </Accordion.Content>
            </Accordion.Item>
          ))}
      </Accordion.Root>
    </>
  );
};

export default DataItemsAccordion;
