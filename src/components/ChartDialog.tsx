import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import React from "react";
import "styles/DialogStyles.scss";
import PDBChart from "./PDB_Chart";

interface ChartDialogProps {
  chartItemUrl: string;
}

// const ChartDialog = React.forwardRef(({ chartItemUrl }: ChartDialogProps) => {
const ChartDialog = ({ chartItemUrl }: ChartDialogProps) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <div>Get Data and Show Chart</div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">Chart:</Dialog.Title>
          <Dialog.Close className="DialogClose" aria-label="Close">
            <Cross2Icon />
          </Dialog.Close>
          <Dialog.Description asChild>
            {/* <div>Chart Content</div> */}
            <PDBChart chartItemUrl={chartItemUrl} />
          </Dialog.Description>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ChartDialog;
