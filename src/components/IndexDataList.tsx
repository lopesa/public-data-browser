import DataItemDialog from "components/DataItemDialog";
import { useMemo, useState } from "react";
import { createSelector } from "@reduxjs/toolkit";
import PageScrollSpy from "components/PageScrollSpy";
import DatasetIndex from "services/dataset-index";

interface IndexDataListProps {
  datasetId: "departmentOfAgriculture";
}

function IndexDataList({ datasetId }: IndexDataListProps) {
  const PAGE_LENGTH = 300;
  const [lastIndex, setLastIndex] = useState(PAGE_LENGTH);
  const { data, error, isLoading } = DatasetIndex[datasetId].dataService("");

  // adapted from here: https://redux.js.org/tutorials/essentials/part-8-rtk-query-advanced#selecting-values-from-results
  const selectPaginatedDataItems = useMemo(() => {
    // Return a unique selector instance for this page so that
    // the filtered results are correctly memoized
    return createSelector(
      (res?: typeof data) => res?.dataset,
      (res: typeof data, lastIndex: number) => lastIndex,
      (dataset, lastIndex) => (dataset ? dataset.slice(0, lastIndex) : [])
    );
  }, []);

  const { paginatedDataItems } = DatasetIndex[datasetId].dataService("", {
    selectFromResult: (result: typeof data) => ({
      ...result,
      paginatedDataItems: selectPaginatedDataItems(
        result.data || { dataset: [] },
        lastIndex
      ),
    }),
  });

  // debugger;

  return (
    <div style={{ textAlign: "left", fontSize: "9px" }}>
      {data && <h2>Current Dataset: {DatasetIndex[datasetId].title}</h2>}
      <h4>
        {data && <span>Total Num Items: {data.dataset.length}</span>} /
        {paginatedDataItems && (
          <span> Current Num Items: {paginatedDataItems.length}</span>
        )}
      </h4>
      {isLoading && <div>Loading...</div>}
      {(paginatedDataItems as typeof data) &&
        paginatedDataItems.map((item: typeof data.dataset, index: number) => (
          <DataItemDialog key={index} dataItem={item} />
        ))}
      {error && <div>Error: {`${error}`}</div>}
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
