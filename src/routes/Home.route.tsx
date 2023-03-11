import DatasetSelector from "components/DatasetSelector";
import IndexDataList from "components/IndexDataList";
import { useState } from "react";
import { DatasetsAvailable } from "types/dataset-index-type";
import styles from "styles/Home.module.scss";

export default function Home() {
  const [activeDataset, setActiveDataset] = useState<DatasetsAvailable>();
  const onSelect = (value: DatasetsAvailable) => {
    setActiveDataset(value);
  };
  return (
    <div className={styles.MainContainer}>
      <DatasetSelector
        onSelect={onSelect}
        triggerClassName={styles.DatasetSelector}
      />
      {activeDataset && <IndexDataList datasetId={activeDataset} />}
    </div>
  );
}
