import * as AlertDialog from "@radix-ui/react-alert-dialog";
import styles from "styles/PDBAlert.module.scss";

type PDBAlertProps = {
  open: boolean;
  title: string;
  description?: string;
  cancelText: string;
  actionText: string;
  action: () => void;
  cancelAction: () => void;
};

const PDBAlert = ({
  open,
  title,
  description,
  cancelText,
  actionText,
  action,
  cancelAction,
}: PDBAlertProps) => {
  return (
    <AlertDialog.Root open={open}>
      {/* <AlertDialog.Trigger asChild>
      <button className="Button violet">Delete account</button>
    </AlertDialog.Trigger> */}
      <AlertDialog.Portal>
        <AlertDialog.Overlay className={styles.AlertDialogOverlay} />
        <AlertDialog.Content className={styles.AlertDialogContent}>
          <AlertDialog.Title className={styles.AlertDialogTitle}>
            {title}
          </AlertDialog.Title>
          {description && (
            <AlertDialog.Description className={styles.AlertDialogDescription}>
              {description}
            </AlertDialog.Description>
          )}
          <div style={{ display: "flex", gap: 25, justifyContent: "flex-end" }}>
            <AlertDialog.Cancel asChild>
              <button
                onClick={cancelAction}
                className={`${styles.Button} ${styles.mauve}`}
              >
                {cancelText}
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button
                onClick={action}
                className={`${styles.Button} ${styles.red}`}
              >
                {actionText}
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export default PDBAlert;
