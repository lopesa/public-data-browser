import * as Select from "@radix-ui/react-select";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import DatasetIndex from "services/dataset-index";
import { DatasetsAvailable } from "types/dataset-index-type";
import styles from "styles/DatasetSelector.module.scss";
import { selectDatasetSelected } from "app/DatasetSelected.slice";
import { useSelector } from "react-redux";

interface DatasetSelectorProps {
  onSelect: (value: DatasetsAvailable) => void;
  triggerClassName?: string;
}

const DatasetSelector: React.FC<DatasetSelectorProps> = ({
  onSelect,
  triggerClassName,
}: DatasetSelectorProps) => {
  const activeDataset = useSelector(selectDatasetSelected);
  return (
    <Select.Root onValueChange={onSelect}>
      <Select.Trigger className={`${triggerClassName} ${styles.SelectTrigger}`}>
        <Select.Value
          placeholder={
            activeDataset
              ? DatasetIndex[activeDataset].title
              : "Select a dataset…"
          }
        />
        <Select.Icon className={styles.SelectIcon}>
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content className={styles.SelectContent} position="popper">
          {/* <Select.ScrollUpButton /> */}
          <Select.Viewport className={styles.SelectViewport}>
            {DatasetIndex &&
              Object.keys(DatasetIndex).map((key, index) => {
                return (
                  <Select.Item
                    value={key}
                    key={index}
                    className={styles.SelectItem}
                  >
                    <Select.ItemText>
                      {DatasetIndex[key as DatasetsAvailable].title}
                    </Select.ItemText>
                    <Select.ItemIndicator />
                  </Select.Item>
                );
              })}
            {/* <Select.Item value={}>
              <Select.ItemText />
              <Select.ItemIndicator />
            </Select.Item> */}
            {/* 
            <Select.Group>
              <Select.Label />
              <Select.Item>
                <Select.ItemText />
                <Select.ItemIndicator />
              </Select.Item>
            </Select.Group> */}

            {/* <Select.Separator /> */}
          </Select.Viewport>
          <Select.ScrollDownButton />
          <Select.Arrow />
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export default DatasetSelector;
