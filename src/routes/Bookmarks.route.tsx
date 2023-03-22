import IndexDataList from "components/IndexDataList";
import styles from "styles/Bookmarks.module.scss";
import { selectBookmarks } from "features/bookmarksSlice";
import { useLazyGetBookmarksQuery } from "services/apiSlice";
import { useAppSelector } from "app/hooks";
import { selectToken } from "app/User.slice";
import { useEffect } from "react";

export default function Bookmarks() {
  const localBookmarks = useAppSelector(selectBookmarks);
  const [getRemoteBookmarks, { data: remoteBookmarks, isLoading, error }] =
    useLazyGetBookmarksQuery();
  const token = useAppSelector(selectToken);
  let bookmarks = token ? remoteBookmarks : localBookmarks;

  useEffect(() => {
    if (token) {
      getRemoteBookmarks();
    }
  }, [token, getRemoteBookmarks]);

  return (
    <div className={styles.MainContainer}>
      <h3 className={styles.Title}>Bookmarks</h3>
      {!!bookmarks?.length && <IndexDataList data={bookmarks} />}
      {!bookmarks?.length && !token && (
        <div className={styles.LoginCreateContainer}>
          <p>
            Login to get remote bookmarks, or create a new account to save
            future bookmarks
          </p>
          <button>open dialog</button>
        </div>
      )}
    </div>
  );
}
