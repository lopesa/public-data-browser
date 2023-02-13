import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { DepartmentOfAgricultureDataItem } from "types/department-of-agriculture";
import styled, { keyframes } from "styled-components";
import { blackA, violet } from "@radix-ui/colors";
import DOMPurify from "dompurify";
import { MouseEventHandler, ReactEventHandler } from "react";

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
  max-width: 530px;
  max-height: 85vh;
  padding: 0 25px;
  animation: ${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);
  &:focus {
    outline: none;
  }
  overflow: scroll;
`;

const DialogDescription = styled(Dialog.Description)`
  margin: 10px 0 20px;
  color: var(--mauve11);
  font-size: 15px;
  line-height: 1.5;
  overflow: scroll;
`;

const DialogTitle = styled(Dialog.Title)`
  margin: 10px 0;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 2;
  padding-top: 10px;
`;

const DialogClose = styled(Dialog.Close)`
  all: unset;
  position: fixed;
  top: 10px;
  right: 10px;
  font-family: inherit;
  border-radius: 100%;
  height: 25px;
  width: 25px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${violet.violet11};
  &:hover {
    background-color: ${violet.violet4};
  }
  &:focus {
    box-shadow: 0 0 0 2px ${violet.violet7};
  }
  z-index: 2;
`;

interface DataItemDialogProps {
  dataItem: DepartmentOfAgricultureDataItem;
}

const getFileExtension = (filename: string) => {
  // return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
  return filename.slice(-3);
};

const onClickDownloadXls = (e: React.MouseEvent<HTMLButtonElement>) => {
  console.log(e.currentTarget.value);
  debugger;
};

const DataItemDialog = ({ dataItem }: DataItemDialogProps) => (
  <Dialog.Root>
    <DialogTrigger
      onClick={() => {
        console.log(dataItem);
      }}
    >
      {dataItem.title}
    </DialogTrigger>
    <Dialog.Portal>
      <DialogOverlay />
      <DialogContent>
        <DialogTitle>{dataItem.title}</DialogTitle>

        <DialogClose aria-label="Close">
          <Cross2Icon />
        </DialogClose>
        <DialogDescription
          style={{ marginBottom: "10px" }}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(dataItem.description),
          }}
        ></DialogDescription>
        {dataItem.distribution && (
          <DialogDescription style={{ marginTop: "20px" }}>
            <b>Distribution:</b>
          </DialogDescription>
        )}
        {dataItem.distribution &&
          dataItem.distribution.map((distribution, index) => {
            return (
              <DialogDescription key={index}>
                <a
                  href={
                    distribution.downloadURL
                      ? distribution.downloadURL
                      : distribution.accessURL
                      ? distribution.accessURL
                      : ""
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  {distribution.title || distribution.downloadURL}
                </a>
                {distribution.downloadURL &&
                  getFileExtension(distribution.downloadURL) === "xls" && (
                    <div>
                      <button
                        onClick={(e) => {
                          onClickDownloadXls(e);
                        }}
                      >
                        Download xls
                      </button>
                    </div>
                  )}
              </DialogDescription>
            );
          })}
      </DialogContent>
    </Dialog.Portal>
  </Dialog.Root>
);

export default DataItemDialog;
