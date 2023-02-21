import IndexDataList from "components/IndexDataList";
import DatasetSelector from "components/DatasetSelector";
import { DatasetsAvailable } from "types/dataset-index-type";
import "./App.css";
import { useState } from "react";

function App() {
  const [activeDataset, setActiveDataset] = useState<DatasetsAvailable>();
  const onSelect = (value: DatasetsAvailable) => {
    setActiveDataset(value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Public Data Browser</h1>
        <h3>A central place to explore different sources of Public Data</h3>
      </header>
      <div style={{ margin: "0 auto", padding: "0 100px" }}>
        <DatasetSelector onSelect={onSelect} />
        {activeDataset && <IndexDataList datasetId={activeDataset} />}
      </div>
    </div>
  );
}

export default App;
