import DataItemsAccordion from "components/DataItemsAccordion";
import { useEffect, useMemo, useState } from "react";
// import PageScrollSpy from "components/PageScrollSpy";
import DatasetIndex, {
  getDatasetGetAllMethod,
  getDatasetEndpointName,
} from "services/dataset-index";
import { DatasetsAvailable } from "types/dataset-index-type";

import { useAppDispatch } from "../app/hooks";
import { apiSlice } from "../services/apiSlice";
import { createSelector } from "@reduxjs/toolkit";
import PDBCheckbox from "./PDB_Checkbox";
import styles from "styles/IndexDataList.module.scss";
import { InitialIndexData, InitialIndexDataItem } from "types/types-general";

interface IndexDataListProps {
  data: InitialIndexDataItem[];
}

function IndexDataList({ data }: IndexDataListProps) {
  // const PAGE_LENGTH = 300;
  // const [lastIndex, setLastIndex] = useState(PAGE_LENGTH);
  const [showXml, setShowXml] = useState(false);
  const [showXls, setShowXls] = useState(false);
  const [showCsv, setShowCsv] = useState(false);
  const [openAllAccordions, setOpenAllAccordions] = useState(false);

  // adapted from here: https://redux.js.org/tutorials/essentials/part-8-rtk-query-advanced#selecting-values-from-results

  // const selectPaginatedDataItems = useMemo(() => {
  //   // Return a unique selector instance for this page so that
  //   // the filtered results are correctly memoized
  //   return createSelector(
  //     (res: typeof data) => res,
  //     // (res: typeof data, lastIndex: number) => lastIndex,
  //     (res: typeof data, showXml: boolean) => showXml,
  //     (res: typeof data, showXml: boolean, showCsv: boolean) => showCsv,
  //     (
  //       res: typeof data,
  //       showXml: boolean,
  //       showCsv: boolean,
  //       showXls: boolean
  //     ) => showXls,
  //     (res, showXml, showCsv, showXls) => {
  //       if (!res) {
  //         return [];
  //       }

  //       let returnVal = res.data;

  //       type DataType = "xml" | "csv" | "xls";
  //       const includesArray: DataType[] = [];
  //       if (showXml) {
  //         includesArray.push("xml");
  //       }
  //       if (showCsv) {
  //         includesArray.push("csv");
  //       }
  //       if (showXls) {
  //         includesArray.push("xls");
  //       }

  //       if (!includesArray.length) {
  //         return returnVal;
  //       }
  //       return returnVal.filter((item: any) => {
  //         if (!item.dataTypesByFileExtension?.length) {
  //           return false;
  //         }
  //         for (let i = 0; i < includesArray.length; i++) {
  //           if (item.dataTypesByFileExtension.includes(includesArray[i])) {
  //             return true;
  //           }
  //         }
  //         return false;
  //       });
  //     }
  //   );
  // }, []);

  // const { filteredDataItems } = DatasetIndex[datasetId].getAll(undefined, {
  //   selectFromResult: (result) => ({
  //     ...result,
  //     filteredDataItems: selectPaginatedDataItems(
  //       result.data,
  //       // lastIndex,
  //       showXml,
  //       showCsv,
  //       showXls
  //     ),
  //   }),
  // });

  return (
    <div className={styles.IndexDataListContainer}>
      {data && (
        <h4>
          {/* <span>Total Num Items: {data.data?.length}</span>/ */}
          <span>Total Num Items: {data.length}</span>/
          {/* {data && <span> Current Num Items: {filteredDataItems?.length}</span>} */}
        </h4>
      )}
      <div className={styles.CheckboxGroupContainer}>
        <PDBCheckbox label="Show items with Xml" onCheckedChange={setShowXml} />
        <PDBCheckbox label="Show items with Xls" onCheckedChange={setShowXls} />
        <PDBCheckbox label="Show items with CSV" onCheckedChange={setShowCsv} />
        <PDBCheckbox
          label="Open all accordions"
          onCheckedChange={setOpenAllAccordions}
        />
      </div>
      {/* {isLoading && <div>Loading...</div>} */}
      {/* {isFetching && <div>Fetching...</div>} */}
      {/* {isError && <div>isError...</div>}
      {error && <div>error...</div>} */}
      {data && (
        <DataItemsAccordion
          dataItems={data}
          datasetId={DatasetsAvailable.departmentOfAgriculture}
          openAll={openAllAccordions}
        />
      )}
      {/* {error && (
        <div>
          Error:{" "}
          {typeof error === "string"
            ? error
            : "problem getting data for this source"}
        </div>
      )}
      {error && <div>Error: {`${error} || error getting data`}</div>} */}
      {/* <PageScrollSpy
        pixelsToBottom={300}
        scrollEvent={(closeToBottom) => {
          if (closeToBottom) {
            setLastIndex(lastIndex + PAGE_LENGTH);
          }
        }}
      /> */}
    </div>
  );
}

export default IndexDataList;
