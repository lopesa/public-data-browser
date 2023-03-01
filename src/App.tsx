import IndexDataList from "components/IndexDataList";
import DatasetSelector from "components/DatasetSelector";
import { DatasetsAvailable } from "types/dataset-index-type";
import { useState } from "react";
import styles from "styles/App.module.scss";
import * as Separator from "@radix-ui/react-separator";

function App() {
  const [activeDataset, setActiveDataset] = useState<DatasetsAvailable>();
  const onSelect = (value: DatasetsAvailable) => {
    setActiveDataset(value);
  };

  return (
    <div className={styles.AppContainer}>
      <header className={styles.AppHeaderBlock}>
        <h1>Public Data Browser</h1>
        <h3>A central place to explore different sources of Public Data</h3>
      </header>
      <div className={styles.MainContainer}>
        <DatasetSelector
          onSelect={onSelect}
          triggerClassName={styles.DatasetSelector}
        />
        {/* <Separator.Root
          style={{ width: "100%", height: "1px", backgroundColor: "grey" }}
        /> */}
        {activeDataset && <IndexDataList datasetId={activeDataset} />}
      </div>
    </div>
  );
}

export default App;
