import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import PDBChart from "./PDB_Chart";

interface ChartDialogProps {
  chartItemUrl: string;
}

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
            <PDBChart chartItemUrl={chartItemUrl} />
          </Dialog.Description>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ChartDialog;
