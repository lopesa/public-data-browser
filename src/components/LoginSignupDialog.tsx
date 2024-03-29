import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import PDBDialogCommonStyles from "styles/PDBDialog.module.scss";
import styles from "styles/LoginSignupDialog.module.scss";
import UserPasswordForm from "./UserPasswordForm";
import { Dispatch, SetStateAction } from "react";
import * as Separator from "@radix-ui/react-separator";
import PDBButton from "./PDBButton";
import { useAppSelector } from "app/hooks";
import { selectBookmarks } from "features/bookmarksSlice";
import {
  useAddBookmarksMutation,
  useLazyGetBookmarksQuery,
} from "services/apiSlice";

type LoginSignupDialogProps = {
  parentOpen: boolean;
  parentSetOpen: Dispatch<SetStateAction<boolean>>;
  onSuccess?: () => void;
  showNoThanksButton?: boolean;
  suppressTitle?: boolean;
};

const LoginSignupDialog = ({
  parentOpen,
  parentSetOpen,
  onSuccess,
  showNoThanksButton,
  suppressTitle,
}: LoginSignupDialogProps) => {
  const localBookmarks = useAppSelector(selectBookmarks);
  const [
    addBookmarks,
    { isLoading: addBookmarksIsLoading, error: addBookmarksError },
  ] = useAddBookmarksMutation();
  const [getRemoteBookmarks, { data: remoteBookmarks, isLoading, error }] =
    useLazyGetBookmarksQuery();
  const addLocalBookmarks = async () => {
    localBookmarks.length &&
      (await addBookmarks(
        localBookmarks.map((bookmark) => {
          return {
            dataItemUuid: bookmark.id,
            datasetId: bookmark.datasetId,
          };
        })
      ));
    getRemoteBookmarks();
  };

  return (
    <Dialog.Root open={parentOpen} onOpenChange={parentSetOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className={PDBDialogCommonStyles.PDBDialogOverlay} />
        <Dialog.Content
          className={`${PDBDialogCommonStyles.PDBDialogContent} ${styles.LoginSignupDialogContent}`}
        >
          {!suppressTitle && (
            <Dialog.Title
              style={{ marginBottom: "10px" }}
              className={PDBDialogCommonStyles.PDBDialogTitle}
            >
              Login or create a free account to persist and retrieve your
              bookmarks?
            </Dialog.Title>
          )}
          <Dialog.Close
            className={PDBDialogCommonStyles.PDBDialogCloseButton}
            aria-label="Close"
          >
            <Cross2Icon />
          </Dialog.Close>
          <UserPasswordForm
            onSuccess={async () => {
              await addLocalBookmarks();
              onSuccess?.();
            }}
          />
          {showNoThanksButton && (
            <>
              <Separator.Root
                className="SeparatorRoot"
                style={{
                  margin: "35px auto",
                  backgroundColor: "grey",
                  height: "1px",
                  width: "100px",
                }}
              />
              <PDBButton onClick={() => parentSetOpen(false)}>
                No Thanks
              </PDBButton>
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default LoginSignupDialog;
