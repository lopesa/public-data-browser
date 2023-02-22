import DataItemDialog from "components/DataItemDialog";
import { useEffect, useState } from "react";
import PageScrollSpy from "components/PageScrollSpy";
import DatasetIndex, {
  getDatasetGetAllMethod,
  getDatasetEndpointName,
} from "services/dataset-index";
import { DatasetsAvailable } from "types/dataset-index-type";

import { useAppDispatch } from "../app/hooks";
import { apiSlice } from "../services/apiSlice";
interface IndexDataListProps {
  datasetId: DatasetsAvailable;
}

function IndexDataList({ datasetId }: IndexDataListProps) {
  const PAGE_LENGTH = 300;
  const [lastIndex, setLastIndex] = useState(PAGE_LENGTH);
  const dispatch = useAppDispatch();
  let method = getDatasetGetAllMethod(datasetId);
  const { data, error, isLoading, isFetching, refetch, isError } = method();

  useEffect(() => {
    const datasetIndexName = getDatasetEndpointName(datasetId);
    if (!datasetIndexName) return;
    dispatch(apiSlice.endpoints[datasetIndexName].initiate());
  }, [datasetId, dispatch]);

  return (
    <div style={{ textAlign: "left", fontSize: "9px" }}>
      {data && <h2>Current Dataset: {DatasetIndex[datasetId].title}</h2>}
      {data && (
        <h4>
          <span>Total Num Items: {data.length}</span>/
          {data && <span> Current Num Items: {data.length}</span>}
        </h4>
      )}
      {isLoading && <div>Loading...</div>}
      {isFetching && <div>Fetching...</div>}
      {/* {isError && <div>isError...</div>}
      {error && <div>error...</div>} */}
      {(data as typeof data) &&
        data?.map((item: any, index: number) => (
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
