import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { DepartmentOfAgricultureDistributionItem } from "types/department-of-agriculture";
import { useEffect, useState } from "react";
import DatasetIndex from "services/dataset-index";
import { DatasetsAvailable } from "types/dataset-index-type";
import styles from "styles/DataItemDialog.module.scss";
import accordionStyles from "styles/DataItemsAccordion.module.scss";
import { DepartmentOfEnergyDistributionItem } from "types/department-of-energy";
import { getFileExtension } from "utils/utils-general";
import PreviewData from "./PreviewData";
import { InitialIndexDataItem } from "types/types-general";
import PDBButton from "./PDBButton";
import * as Accordion from "@radix-ui/react-accordion";
import DOMPurify from "dompurify";
import useBreakpoint from "hooks/useBreakpoint";
import * as Separator from "@radix-ui/react-separator";
// import json2html from "json2html";

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
  const breakpoint = useBreakpoint();
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

  const getDistributionUrl = (distributionItem: DistributionItems) => {
    return distributionItem?.downloadURL || distributionItem?.accessURL;
  };

  const doNotPrintDataKeys = ["id"];

  return (
    <Dialog.Root onOpenChange={onOpenChange}>
      <Dialog.Trigger
        asChild
        onClick={() => {
          console.log(dataItem);
        }}
        className={styles.DialogTrigger}
      >
        <PDBButton>Details</PDBButton>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.DialogOverlay} />
        {!data && <Dialog.Content>...loading</Dialog.Content>}
        {data && (
          <Dialog.Content
            className={`${styles.DialogContent} ${
              breakpoint === "PHONE" && styles.phone
            }`}
          >
            <Dialog.Close
              className={styles.DialogCloseButton}
              aria-label="Close"
            >
              <Cross2Icon />
            </Dialog.Close>
            {data.title && (
              <Dialog.Title className={styles.DialogTitle}>
                {data.title}
              </Dialog.Title>
            )}
            {data.keyword && (
              <div className={styles.Keyword}>
                <span style={{ fontWeight: "bold" }}>Keywords:</span>&nbsp;
                {data.keyword.map((keyword) => {
                  return <div key={keyword}>• {keyword}</div>;
                })}
              </div>
            )}
            {data.description && (
              <Dialog.Description className={styles.DialogDescription}>
                {/* {data.description} */}
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(data.description),
                  }}
                ></div>
              </Dialog.Description>
            )}
            <h3>Distribution:</h3>
            {data.distribution &&
              data.distribution.map((distribution, index) => {
                return (
                  <div key={index}>
                    <Dialog.Description className={styles.DialogDescription}>
                      {distribution.title && (
                        <div style={{ fontWeight: "bold" }}>
                          {distribution.title}
                        </div>
                      )}
                      <div>
                        <a
                          href={getDistributionUrl(distribution)}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {getDistributionUrl(distribution) &&
                            getDistributionUrl(distribution)}
                        </a>
                      </div>
                    </Dialog.Description>
                    {getPreviewDataLink(distribution)}
                  </div>
                );
              })}

            <Separator.Root className={styles.SeparatorRoot} />

            <Accordion.Root
              className={accordionStyles.AccordionRoot}
              type="single"
              collapsible
            >
              <Accordion.Item
                className={accordionStyles.AccordionItem}
                value="item-1"
              >
                <Accordion.Trigger
                  className={`${accordionStyles.AccordionTrigger} ${styles.AllData}`}
                >
                  All Data
                </Accordion.Trigger>
                <Accordion.Content
                  className={`${accordionStyles.AccordionContent} ${styles.AccordionContent}`}
                >
                  {Object.keys(data).map((key) => {
                    return (
                      !doNotPrintDataKeys.includes(key) && getDataPointHTML(key)
                    );
                  })}
                </Accordion.Content>
              </Accordion.Item>
            </Accordion.Root>
          </Dialog.Content>
        )}
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DataItemDialog;
