import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { useEffect, useState } from "react";
import styles from "styles/LoginSignupAlert.module.scss";
import UserPasswordForm from "components/UserPasswordForm";
import * as Separator from "@radix-ui/react-separator";

type LoginSignupAlertProps = {
  // open: boolean;
  // title: string;
  // description?: string;
  // cancelText: string;
  // actionText: string;
  // action: () => void;
  // cancelAction: () => void;
  parentOpenFlag: boolean;
  parentOpenSetter: (flag: boolean) => void;
};

const LoginSignupAlert = ({
  parentOpenFlag,
  parentOpenSetter,
}: LoginSignupAlertProps) => {
  const [open, setOpen] = useState(false);
  const cancelAction = () => parentOpenSetter(false);
  useEffect(() => {
    setOpen(parentOpenFlag);
  }, [parentOpenFlag]);
  return (
    <AlertDialog.Root open={open}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className={styles.AlertDialogOverlay} />
        <AlertDialog.Content className={styles.AlertDialogContent}>
          <AlertDialog.Title className={styles.AlertDialogTitle}>
            Login or create a free account to persist and retrieve your
            bookmarks?
          </AlertDialog.Title>
          <div style={{ display: "flex", gap: 25, flexDirection: "column" }}>
            <UserPasswordForm
              onSuccess={() => {
                parentOpenSetter(false);
              }}
            />
            <Separator.Root
              className="SeparatorRoot"
              style={{ margin: "15px", backgroundColor: "grey", height: "1px" }}
            />
            <AlertDialog.Cancel asChild>
              <button onClick={cancelAction} className={styles.Button}>
                No Thanks
              </button>
            </AlertDialog.Cancel>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export default LoginSignupAlert;
