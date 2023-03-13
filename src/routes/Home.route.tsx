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
  const dispatch = useAppDispatch();
  const onSelect = (value: DatasetsAvailable) => {
    // setActiveDataset(value);
    dispatch(setDatasetSelected(value));
  };

  useEffect(() => {
    if (!activeDataset) return;
    const datasetIndexName = getDatasetEndpointName(activeDataset);
    if (!datasetIndexName) return;
    dispatch(apiSlice.endpoints[datasetIndexName].initiate())
      .unwrap()
      .then((data) => {
        setData(data);
      });
  }, [activeDataset, dispatch]);

  return (
    <div className={styles.MainContainer}>
      <DatasetSelector
        onSelect={onSelect}
        triggerClassName={styles.DatasetSelector}
      />

      {activeDataset && data && (
        <>
          <h2>Current Dataset: {DatasetIndex[activeDataset].title}</h2>
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

      {data && <IndexDataList data={data.data} />}
    </div>
  );
}
