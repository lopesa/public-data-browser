import * as Select from "@radix-ui/react-select";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import DatasetIndex from "services/dataset-index";
import { useState } from "react";
import { DatasetsAvailable } from "types/dataset-index-type";

interface DatasetSelectorProps {
  onSelect: (value: DatasetsAvailable) => void;
}

const DatasetSelector = ({ onSelect }: DatasetSelectorProps) => {
  const [selectedDataset, setSelectedDataset] = useState<DatasetsAvailable>();
  return (
    <Select.Root onValueChange={onSelect}>
      <Select.Trigger>
        <Select.Value placeholder="Select a dataset…" />
        <Select.Icon>
          <ChevronDownIcon />
        </Select.Icon>
        <Select.Icon />
      </Select.Trigger>

      <Select.Portal>
        <Select.Content>
          <Select.ScrollUpButton />
          <Select.Viewport>
            {DatasetIndex &&
              Object.keys(DatasetIndex).map((key, index) => {
                return (
                  <Select.Item value={key} key={index}>
                    <Select.ItemText>{key}</Select.ItemText>
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