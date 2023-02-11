import { useGetBaseDepartmentOfAgricultureDataQuery } from "services/department-of-agriculture";
import DataItemDialog from "components/DataItemDialog";
import { useMemo, useState } from "react";
import { createSelector } from "@reduxjs/toolkit";
import type {
  DepartmentOfAgriculture,
  DepartmentOfAgricultureDataItem,
} from "types/department-of-agriculture";
import PageScrollSpy from "components/PageScrollSpy";

function IndexDataList() {
  const PAGE_LENGTH = 300;
  const [lastIndex, setLastIndex] = useState(PAGE_LENGTH);
  const { data, error, isLoading } =
    useGetBaseDepartmentOfAgricultureDataQuery("");

  // adapted from here: https://redux.js.org/tutorials/essentials/part-8-rtk-query-advanced#selecting-values-from-results
  const selectPaginatedDataItems = useMemo(() => {
    // Return a unique selector instance for this page so that
    // the filtered results are correctly memoized
    return createSelector(
      (res?: DepartmentOfAgriculture) => res?.dataset,
      (res: DepartmentOfAgriculture, lastIndex: number) => lastIndex,
      (dataset, lastIndex) => (dataset ? dataset.slice(0, lastIndex) : [])
    );
  }, []);

  const { paginatedDataItems } = useGetBaseDepartmentOfAgricultureDataQuery(
    "",
    {
      selectFromResult: (result) => ({
        ...result,
        paginatedDataItems: selectPaginatedDataItems(
          result.data || { dataset: [] },
          lastIndex
        ),
      }),
    }
  );

  // debugger;

  return (
    <div style={{ textAlign: "left", fontSize: "9px" }}>
      <h4>
        {data && <span>Total Num Items: {data.dataset.length}</span>} /
        {paginatedDataItems && (
          <span> Current Num Items: {paginatedDataItems.length}</span>
        )}
      </h4>
      {isLoading && <div>Loading...</div>}
      {paginatedDataItems &&
        paginatedDataItems.map((item, index) => (
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
