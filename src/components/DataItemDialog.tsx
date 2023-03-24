import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { DepartmentOfAgricultureDistributionItem } from "types/department-of-agriculture";
import { useEffect, useState } from "react";
import DatasetIndex from "services/dataset-index";
import { DatasetsAvailable } from "types/dataset-index-type";
import styles from "styles/DataItemDialog.module.scss";
import { DepartmentOfEnergyDistributionItem } from "types/department-of-energy";
import { getFileExtension } from "utils/utils-general";
import PreviewData from "./PreviewData";
import * as Tabs from "@radix-ui/react-tabs";
import { InitialIndexDataItem } from "types/types-general";

type DistributionItems =
  | DepartmentOfAgricultureDistributionItem
  | DepartmentOfEnergyDistributionItem;

interface DataItemDialogProps {
  dataItem: InitialIndexDataItem;
  datasetId: DatasetsAvailable;
}

const onClickDownloadXls = (e: React.MouseEvent<HTMLButtonElement>) => {
  console.log(e.currentTarget.value);
  debugger;
};

const DataItemDialog = ({ dataItem, datasetId }: DataItemDialogProps) => {
  const [skip, setSkip] = useState(true);
  // @TODO default to departmentOfAgriculture if not datasetId
  // make the prop not optionally undefined
  const { data, error, isLoading } = DatasetIndex[
    dataItem.datasetId || DatasetsAvailable.departmentOfAgriculture
  ].getById(dataItem.id, { skip });

  const getPreviewDataLink = (distributionItem: DistributionItems) => {
    const url = distributionItem?.downloadURL || distributionItem?.accessURL;
    if (!url) {
      return;
    }
    const extension = getFileExtension(url);
    const shouldOfferPreviewData =
      typeof extension === "string" &&
      (extension.includes("csv") || extension.includes("xls"));

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

  const getDataPointHTML = (key: string) => {
    if (!data || !key) {
      return;
    }
    const value = data[key as keyof typeof data];
    if (value === null) {
      return;
    }
    return (
      <div key={key} style={{ marginBottom: "10px" }}>
        <span style={{ fontWeight: "bold" }}>{`• ${key}: `}</span>
        <span>{typeof value === "string" ? value : JSON.stringify(value)}</span>
      </div>
    );
  };

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
            {/* <Dialog.Description asChild>
              <div
                className="DialogDescription"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(data.description),
                }}
              ></div>
            </Dialog.Description> */}

            {/* <div> */}
            <Tabs.Root className={styles.TabsRoot} defaultValue="tab1">
              <Tabs.List
                className={styles.TabsList}
                aria-label="@TODO: Add aria-label"
              >
                <Tabs.Trigger className={styles.TabsTrigger} value="tab1">
                  All Data
                </Tabs.Trigger>
                {data.distribution && (
                  <Tabs.Trigger className={styles.TabsTrigger} value="tab2">
                    Preview Distribution data
                  </Tabs.Trigger>
                )}
              </Tabs.List>
              <div style={{ overflow: "scroll" }}>
                <Tabs.Content className={styles.TabsContent} value="tab1">
                  {Object.keys(data).map((key) => {
                    return getDataPointHTML(key);
                  })}
                </Tabs.Content>
                {data.distribution && (
                  <Tabs.Content className={styles.TabsContent} value="tab2">
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
                          </div>
                        );
                      })}
                  </Tabs.Content>
                )}
              </div>
            </Tabs.Root>
            {/* </div> */}
          </Dialog.Content>
        )}
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DataItemDialog;
