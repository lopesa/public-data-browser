import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import {
  DepartmentOfAgricultureDataItem,
  DepartmentOfAgricultureDistributionItem,
} from "types/department-of-agriculture";
import styled, { keyframes } from "styled-components";
import { blackA, violet } from "@radix-ui/colors";
import DOMPurify from "dompurify";
import { useEffect, useState } from "react";
import DatasetIndex from "services/dataset-index";
import { DatasetsAvailable } from "types/dataset-index-type";
import styles from "styles/DataItemDialog.module.scss";
import ChartDialog from "./ChartDialog";
import {
  DepartmentOfEnergyDataItem,
  DepartmentOfEnergyDistributionItem,
} from "types/department-of-energy";
import { getFileExtension } from "utils/utils-general";
import PreviewData from "./PreviewData";

type DataItem = DepartmentOfAgricultureDataItem | DepartmentOfEnergyDataItem;
type DistributionItems =
  | DepartmentOfAgricultureDistributionItem
  | DepartmentOfEnergyDistributionItem;

interface DataItemDialogProps {
  dataItem: DataItem;
  datasetId: DatasetsAvailable;
}

const onClickDownloadXls = (e: React.MouseEvent<HTMLButtonElement>) => {
  console.log(e.currentTarget.value);
  debugger;
};

const DataItemDialog = ({ dataItem, datasetId }: DataItemDialogProps) => {
  const [skip, setSkip] = useState(true);
  const { data, error, isLoading } = DatasetIndex[datasetId].getById(
    dataItem.id,
    { skip }
  );

  const getPreviewDataLink = (distributionItem: DistributionItems) => {
    const url = distributionItem?.downloadURL || distributionItem?.accessURL;
    if (!url) {
      return;
    }
    const extension = getFileExtension(url);
    const shouldOfferPreviewData =
      typeof extension === "string" && extension.includes("csv");

    // return shouldOfferPreviewData && <ChartDialog chartItemUrl={url} />;
    // return shouldOfferPreviewData && <PreviewData url={url} />;
    return (
      shouldOfferPreviewData && (
        <div className={styles.PreviewDataContainer}>
          <PreviewData url={url} />
        </div>
      )
    );

    // {distribution.downloadURL &&
    //   getFileExtension(distribution.downloadURL) === "xls" && (
    //     <div>
    //       <button
    //         onClick={(e) => {
    //           onClickDownloadXls(e);
    //         }}
    //       >
    //         Download xls
    //       </button>
    //     </div>
    //   )}
  };

  const onOpenChange = (open: boolean) => {
    // could also use useLazyQuery
    setSkip(!open);
  };

  useEffect(() => {
    if (data) {
      console.log("Full Data: ", data);
    }
  }, [data]);

  return (
    <Dialog.Root onOpenChange={onOpenChange}>
      <Dialog.Trigger
        asChild
        onClick={() => {
          console.log(dataItem);
        }}
        className={styles.DialogTrigger}
      >
        <button>Details</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.DialogOverlay} />
        {!data && <Dialog.Content>...loading</Dialog.Content>}
        {data && (
          <Dialog.Content className={styles.DialogContent}>
            <Dialog.Title className={styles.DialogTitle}>
              {data.title}
            </Dialog.Title>
            <Dialog.Close
              className={styles.DialogCloseButton}
              aria-label="Close"
            >
              <Cross2Icon />
            </Dialog.Close>
            <Dialog.Description asChild>
              <div
                className="DialogDescription"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(data.description),
                }}
              ></div>
            </Dialog.Description>
            {data.distribution && (
              <Dialog.Description className="DialogDescription">
                <b>Distribution:</b>
              </Dialog.Description>
            )}
            {data.distribution &&
              data.distribution.map((distribution, index) => {
                return (
                  <div key={index}>
                    <Dialog.Description className="DialogDescription">
                      <a
                        href={
                          distribution.downloadURL
                            ? distribution.downloadURL
                            : distribution.accessURL
                            ? distribution.accessURL
                            : ""
                        }
                        target="_blank"
                        rel="noreferrer"
                      >
                        {distribution.title || distribution.downloadURL}
                      </a>
                    </Dialog.Description>
                    {getPreviewDataLink(distribution)}
                    {/* {distribution.downloadURL &&
                      getFileExtension(distribution.downloadURL) === "xls" && (
                        <div>
                          <button
                            onClick={(e) => {
                              onClickDownloadXls(e);
                            }}
                          >
                            Download xls
                          </button>
                        </div>
                      )} */}
                    {/* </Dialog.Description> */}
                  </div>
                );
              })}
          </Dialog.Content>
        )}
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DataItemDialog;
