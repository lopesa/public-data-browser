import DataItemDialog from "components/DataItemDialog";
import DataItemsAccordion from "components/DataItemsAccordion";
import { useEffect, useMemo, useState } from "react";
import PageScrollSpy from "components/PageScrollSpy";
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

interface IndexDataListProps {
  datasetId: DatasetsAvailable;
}

function IndexDataList({ datasetId }: IndexDataListProps) {
  const PAGE_LENGTH = 300;
  const [lastIndex, setLastIndex] = useState(PAGE_LENGTH);
  const [showOnlyWithXml, setShowOnlyWithXml] = useState(false);
  const [openAllAccordions, setOpenAllAccordions] = useState(false);
  const dispatch = useAppDispatch();
  let method = getDatasetGetAllMethod(datasetId);
  const { data, error, isLoading, isFetching, refetch, isError } = method();

  useEffect(() => {
    const datasetIndexName = getDatasetEndpointName(datasetId);
    if (!datasetIndexName) return;
    dispatch(apiSlice.endpoints[datasetIndexName].initiate());
  }, [datasetId, dispatch]);

  // adapted from here: https://redux.js.org/tutorials/essentials/part-8-rtk-query-advanced#selecting-values-from-results

  // @TODO: this is only sort of working now that I added in the
  // imperative dispatch in the hook above.
  const selectPaginatedDataItems = useMemo(() => {
    // Return a unique selector instance for this page so that
    // the filtered results are correctly memoized
    return createSelector(
      (res: typeof data) => res,
      // (res: typeof data, lastIndex: number) => lastIndex,
      (res: typeof data, showOnlyWithXml: boolean) => showOnlyWithXml,
      // (res, lastIndex, showOnlyWithXml) => {
      (res, showOnlyWithXml) => {
        if (!res) {
          return [];
        }

        // let returnVal = res.data?.slice(0, lastIndex);
        let returnVal = res.data;
        if (!showOnlyWithXml) {
          return returnVal;
        }
        return returnVal.filter((item: any) => {
          if (!item.dataTypesByFileExtension.length) {
            return false;
          }
          return item.dataTypesByFileExtension.includes("csv");
        });
      }
    );
  }, []);

  const { filteredDataItems } = DatasetIndex[datasetId].getAll(undefined, {
    selectFromResult: (result) => ({
      ...result,
      filteredDataItems: selectPaginatedDataItems(
        result.data,
        // lastIndex,
        showOnlyWithXml
      ),
    }),
  });

  return (
    <div className={styles.IndexDataListContainer}>
      {data && (
        <>
          <h2>Current Dataset: {DatasetIndex[datasetId].title}</h2>
          <h3>
            Original Discovery URL:{" "}
            <a href={data.originalIntialUrl} target="_blank" rel="noreferrer">
              {data.originalIntialUrl}
            </a>
          </h3>
          <h3>
            Original JSON src URL:{" "}
            <a href={data.originalJsonDataUrl} target="_blank" rel="noreferrer">
              {data.originalJsonDataUrl}
            </a>
          </h3>
        </>
      )}
      {data && (
        <h4>
          <span>Total Num Items: {data.data?.length}</span>/
          {data && <span> Current Num Items: {filteredDataItems?.length}</span>}
        </h4>
      )}
      <div className={styles.CheckboxGroupContainer}>
        <PDBCheckbox
          label="Show only items with CSV"
          onCheckedChange={setShowOnlyWithXml}
        />
        <PDBCheckbox
          label="Open all accordions"
          onCheckedChange={setOpenAllAccordions}
        />
      </div>
      {isLoading && <div>Loading...</div>}
      {isFetching && <div>Fetching...</div>}
      {/* {isError && <div>isError...</div>}
      {error && <div>error...</div>} */}
      {
        // (filteredDataItems as typeof data) && (
        filteredDataItems && (
          <DataItemsAccordion
            dataItems={filteredDataItems}
            datasetId={datasetId}
            openAll={openAllAccordions}
          />
        )

        // filteredDataItems?.map((item: any, index: number) => (
        //   <DataItemDialog key={index} dataItem={item} datasetId={datasetId} />
        // ))
      }
      {error && (
        <div>
          Error:{" "}
          {typeof error === "string"
            ? error
            : "problem getting data for this source"}
        </div>
      )}
      {error && <div>Error: {`${error} || error getting data`}</div>}
      <PageScrollSpy
        pixelsToBottom={300}
        scrollEvent={(closeToBottom) => {
          if (closeToBottom) {
            setLastIndex(lastIndex + PAGE_LENGTH);
          }
        }}
      />
    </div>
  );
}

export default IndexDataList;
