import DataItemDialog from "components/DataItemDialog";
import { useMemo, useState } from "react";
import { createSelector } from "@reduxjs/toolkit";
import PageScrollSpy from "components/PageScrollSpy";
import DatasetIndex from "services/dataset-index";
import { DatasetsAvailable } from "types/dataset-index-type";
interface IndexDataListProps {
  datasetId: DatasetsAvailable;
}

function IndexDataList({ datasetId }: IndexDataListProps) {
  const PAGE_LENGTH = 300;
  const [lastIndex, setLastIndex] = useState(PAGE_LENGTH);
  const { data, error, isLoading } = DatasetIndex[datasetId].getAll();

  // adapted from here: https://redux.js.org/tutorials/essentials/part-8-rtk-query-advanced#selecting-values-from-results
  const selectPaginatedDataItems = useMemo(() => {
    // Return a unique selector instance for this page so that
    // the filtered results are correctly memoized
    return createSelector(
      (res?: typeof data) => res,
      (res: typeof data, lastIndex: number) => lastIndex,
      (res, lastIndex) => (res ? res.slice(0, lastIndex) : [])
    );
  }, []);

  const { paginatedDataItems } = DatasetIndex[datasetId].getAll(undefined, {
    selectFromResult: (result) => ({
      ...result,
      paginatedDataItems: selectPaginatedDataItems(
        result.data || [],
        lastIndex
      ),
    }),
  });

  return (
    <div style={{ textAlign: "left", fontSize: "9px" }}>
      {data && <h2>Current Dataset: {DatasetIndex[datasetId].title}</h2>}
      {data && (
        <h4>
          <span>Total Num Items: {data.length}</span>/
          {paginatedDataItems && (
            <span> Current Num Items: {paginatedDataItems.length}</span>
          )}
        </h4>
      )}
      {isLoading && <div>Loading...</div>}
      {(paginatedDataItems as typeof data) &&
        paginatedDataItems.map((item, index: number) => (
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
      {/* {error && <div>Error: {`${error} || error getting data`}</div>} */}
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
