import DatasetSelector from "components/DatasetSelector";
import { DatasetsAvailable } from "types/dataset-index-type";
import styles from "styles/Home.module.scss";
import { useAppDispatch } from "app/hooks";
import {
  selectDatasetSelected,
  setDatasetSelected,
} from "app/DatasetSelected.slice";
import { useSelector } from "react-redux";
import IndexDataListContainer from "components/IndexDataListContainer";

export default function Home() {
  const activeDataset = useSelector(selectDatasetSelected);
  const dispatch = useAppDispatch();
  const onSelect = (value: DatasetsAvailable) => {
    dispatch(setDatasetSelected(value));
  };

  return (
    <div className={styles.MainContainer}>
      <DatasetSelector
        onSelect={onSelect}
        triggerClassName={styles.DatasetSelector}
      />

      {activeDataset && (
        <IndexDataListContainer
          key={activeDataset}
          activeDataset={activeDataset}
        />
      )}
    </div>
  );
}
