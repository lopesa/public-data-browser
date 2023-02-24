import DataItemDialog from "components/DataItemDialog";
import DataItemsAccordion from "components/DataItemAccordion";
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

interface IndexDataListProps {
  datasetId: DatasetsAvailable;
}

function IndexDataList({ datasetId }: IndexDataListProps) {
  const PAGE_LENGTH = 300;
  const [lastIndex, setLastIndex] = useState(PAGE_LENGTH);
  const [showOnlyWithXml, setShowOnlyWithXml] = useState(false);
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
      (res: typeof data, lastIndex: number) => lastIndex,
      (res: typeof data, lastIndex: number, showOnlyWithXml: boolean) =>
        showOnlyWithXml,
      (res, lastIndex, showOnlyWithXml) => {
        if (!res) {
          return [];
        }
        let returnVal = res.slice(0, lastIndex);
        if (!showOnlyWithXml) {
          return returnVal;
        }
        return returnVal.filter((item: any) => {
          if (!item.dataTypesByFileExtension.length) {
            return false;
          }
          return item.dataTypesByFileExtension.includes("xls");
        });
      }
    );
  }, []);

  const { paginatedDataItems } = DatasetIndex[datasetId].getAll(undefined, {
    selectFromResult: (result) => ({
      ...result,
      paginatedDataItems: selectPaginatedDataItems(
        result.data,
        lastIndex,
        showOnlyWithXml
      ),
    }),
  });

  return (
    <div style={{ textAlign: "left", fontSize: "9px" }}>
      {data && <h2>Current Dataset: {DatasetIndex[datasetId].title}</h2>}
      {data && (
        <h4>
          <span>Total Num Items: {data.length}</span>/
          {data && <span> Current Num Items: {paginatedDataItems.length}</span>}
        </h4>
      )}
      <PDBCheckbox
        label="Show only items with XML"
        onCheckedChange={setShowOnlyWithXml}
      />
      {isLoading && <div>Loading...</div>}
      {isFetching && <div>Fetching...</div>}
      {/* {isError && <div>isError...</div>}
      {error && <div>error...</div>} */}
      {(paginatedDataItems as typeof data) &&
        // <DataItemsAccordion dataItems={paginatedDataItems} />

        paginatedDataItems?.map((item: any, index: number) => (
          <DataItemDialog key={index} dataItem={item} datasetId={datasetId} />
        ))}
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
