import DatasetSelector from "components/DatasetSelector";
import IndexDataList from "components/IndexDataList";
import { useEffect, useState } from "react";
import { DatasetsAvailable } from "types/dataset-index-type";
import styles from "styles/Home.module.scss";
import DatasetIndex, {
  getDatasetEndpointName,
  getDatasetGetAllMethod,
} from "services/dataset-index";
import { useAppDispatch } from "app/hooks";
import { apiSlice } from "services/apiSlice";
import { InitialIndexData, InitialIndexDataItem } from "types/types-general";
import {
  selectDatasetSelected,
  setDatasetSelected,
} from "app/DatasetSelected.slice";
import { useSelector } from "react-redux";

export default function Home() {
  const activeDataset = useSelector(selectDatasetSelected);
  // const [activeDataset, setActiveDataset] = useState<DatasetsAvailable>();
  const [data, setData] = useState<InitialIndexData>();
  const [requestIsPending, setRequestIsPending] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string>();
  const dispatch = useAppDispatch();
  const onSelect = (value: DatasetsAvailable) => {
    // setActiveDataset(value);
    dispatch(setDatasetSelected(value));
  };

  useEffect(() => {
    if (!activeDataset) return;
    const datasetIndexName = getDatasetEndpointName(activeDataset);
    if (!datasetIndexName) return;

    setServerError(undefined);
    setData(undefined);
    setRequestIsPending(true);

    dispatch(apiSlice.endpoints[datasetIndexName].initiate())
      .unwrap()
      .then((data) => {
        setRequestIsPending(false);
        setData(data);
      })
      .catch((err) => {
        setRequestIsPending(false);
        setServerError(
          err.message === "Aborted" ? "Server Timeout" : "Server Error"
        );
      });
  }, [activeDataset, dispatch]);

  return (
    <div className={styles.MainContainer}>
      <DatasetSelector
        onSelect={onSelect}
        triggerClassName={styles.DatasetSelector}
      />

      <div className={styles.MessagesContainer}>
        {requestIsPending && <div>Loading...</div>}
        {serverError && <div className={styles.Error}>{serverError}</div>}
      </div>

      {activeDataset && data && (
        <div className={styles.DatasetInfoContainer}>
          <p className={styles.Bold}>
            Current Dataset: {DatasetIndex[activeDataset].title}
          </p>
          <p>
            Original Discovery URL:{" "}
            <a href={data.originalIntialUrl} target="_blank" rel="noreferrer">
              {data.originalIntialUrl}
            </a>
          </p>
          <p>
            Original JSON src URL:{" "}
            <a href={data.originalJsonDataUrl} target="_blank" rel="noreferrer">
              {data.originalJsonDataUrl}
            </a>
          </p>
        </div>
      )}

      {data && <IndexDataList data={data.data} />}
    </div>
  );
}
