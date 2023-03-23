import { useEffect } from "react";
import DatasetIndex, { getDatasetGetAllMethod } from "services/dataset-index";
import { DatasetsAvailable } from "types/dataset-index-type";
import IndexDataList from "./IndexDataList";
import styles from "styles/IndexDataListContainer.module.scss";

type IndexDataListContainerProps = {
  activeDataset: DatasetsAvailable;
};

const IndexDataListContainer = ({
  activeDataset,
}: IndexDataListContainerProps) => {
  const datasetGet = getDatasetGetAllMethod(activeDataset);
  const { data, error, isLoading } = datasetGet();
  return (
    <>
      <div className={styles.MessagesContainer}>
        {isLoading && <div>Loading...</div>}
        {error && <div className={styles.Error}>Error</div>}
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
    </>
  );
};

export default IndexDataListContainer;
