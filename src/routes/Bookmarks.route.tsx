import IndexDataList from "components/IndexDataList";
import styles from "styles/Bookmarks.module.scss";
import { selectBookmarks } from "features/bookmarksSlice";
import { useLazyGetBookmarksQuery } from "services/apiSlice";
import { useAppSelector } from "app/hooks";
import { selectToken } from "app/User.slice";
import { useEffect, useState } from "react";
import PDBButton from "components/PDBButton";
import LoginSignupDialog from "components/LoginSignupDialog";
import { PersonIcon } from "@radix-ui/react-icons";

export default function Bookmarks() {
  const localBookmarks = useAppSelector(selectBookmarks);
  const [getRemoteBookmarks, { data: remoteBookmarks, isLoading, error }] =
    useLazyGetBookmarksQuery();
  const token = useAppSelector(selectToken);
  const [dialogOpen, setDialogOpen] = useState(false);
  let bookmarks = token ? remoteBookmarks : localBookmarks;

  useEffect(() => {
    if (token) {
      getRemoteBookmarks();
    }
  }, [token, getRemoteBookmarks]);

  return (
    <>
      {!token && (
        <LoginSignupDialog
          parentOpen={dialogOpen}
          parentSetOpen={setDialogOpen}
          onSuccess={() => setDialogOpen(false)}
          suppressTitle={!bookmarks?.length}
        />
      )}
      {!!bookmarks?.length && !token && (
        <PDBButton
          onClick={() => {
            setDialogOpen(true);
          }}
          style={{
            borderRadius: "100%",
            width: "25px",
            height: "25px",
            padding: "0",
            position: "absolute",
            top: "70px",
            right: "40px",
          }}
        >
          <PersonIcon />
        </PDBButton>
      )}
      <div className={styles.MainContainer}>
        <h3 className={styles.Title}>Bookmarks</h3>
        {!!bookmarks?.length && <IndexDataList data={bookmarks} />}

        {!bookmarks?.length && !token && (
          <div className={styles.LoginCreateContainer}>
            <p style={{ margin: "0 auto 20px" }}>
              Login to get remote bookmarks
              <br />
              or create a new account to save future bookmarks
            </p>
            <PDBButton
              onClick={() => {
                setDialogOpen(true);
              }}
              style={{ width: "fit-content", margin: "0 auto" }}
            >
              Go
            </PDBButton>
          </div>
        )}
      </div>
    </>
  );
}
