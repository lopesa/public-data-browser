import * as Popover from "@radix-ui/react-popover";
import { DepartmentOfAgricultureDataItem } from "types/department-of-agriculture";
import styled from "styled-components";

interface DataItemPopoverProps {
  dataItem: DepartmentOfAgricultureDataItem;
}

const PopoverRoot = styled(Popover.Root)`
  display: block;
`;

const PopoverTrigger = styled(Popover.Trigger)`
  backgroundcolor: white;
  borderradius: 4px;
`;

const PopoverContent = styled(Popover.Content)`
  borderradius: 4px;
  padding: 20px;
  width: 260px;
  backgroundcolor: white;
`;

const PopoverArrow = styled(Popover.Arrow)`
  fill: white;
`;

const DataItemPopover = ({ dataItem }: DataItemPopoverProps) => (
  <PopoverRoot>
    <PopoverTrigger>{dataItem.title}</PopoverTrigger>
    <Popover.Portal>
      <PopoverContent sideOffset={5}>
        {dataItem.description}
        <PopoverArrow />
      </PopoverContent>
    </Popover.Portal>
  </PopoverRoot>
);

export default DataItemPopover;
