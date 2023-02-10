import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { DepartmentOfAgricultureDataItem } from "types/department-of-agriculture";
import styled, { keyframes } from "styled-components";
import { blackA, violet } from "@radix-ui/colors";

const overlayShow = keyframes`
from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const contentShow = keyframes`
from {
    opacity: 0;
    transform: translate(-50%, -48%) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`;

const DialogTrigger = styled(Dialog.Trigger)`
  all: unset;
  font-size: 10px;
  display: block;
  cursor: pointer;
  margin-bottom: 3px;
`;

const DialogOverlay = styled(Dialog.Overlay)`
    background-color: ${blackA.blackA9}};
    position: fixed;
    inset: 0;
    animation: ${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);
`;

const DialogContent = styled(Dialog.Content)`
  background-color: white;
  border-radius: 6px;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 450px;
  max-height: 85vh;
  padding: 25px;
  animation: ${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);
  &:focus {
    outline: none;
  }
`;

const DialogDescription = styled(Dialog.Description)`
  margin: 10px 0 20px;
  color: var(--mauve11);
  font-size: 15px;
  line-height: 1.5;
`;

const IconButton = styled.button`
  all: unset;
  font-family: inherit;
  border-radius: 100%;
  height: 25px;
  width: 25px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${violet.violet11};
  position: absolute;
  top: 10px;
  right: 10px;
  &:hover {
    background-color: ${violet.violet4};
  }
  &:focus {
    box-shadow: 0 0 0 2px ${violet.violet7};
  }
`;

const DialogClose = styled(Dialog.Close)`
  all: unset;
`;

interface DataItemDialogProps {
  dataItem: DepartmentOfAgricultureDataItem;
}

const DataItemDialog = ({ dataItem }: DataItemDialogProps) => (
  <Dialog.Root>
    <DialogTrigger>{dataItem.title}</DialogTrigger>
    <Dialog.Portal>
      <DialogOverlay />
      <DialogContent>
        <Dialog.Title>{dataItem.title}</Dialog.Title>
        <DialogDescription>{dataItem.description}</DialogDescription>
        <DialogClose>
          <IconButton className="IconButton" aria-label="Close">
            <Cross2Icon />
          </IconButton>
        </DialogClose>
      </DialogContent>
    </Dialog.Portal>
  </Dialog.Root>
);

export default DataItemDialog;
