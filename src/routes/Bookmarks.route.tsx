import IndexDataList from "components/IndexDataList";
import styles from "styles/Bookmarks.module.scss";
import { selectBookmarks } from "features/bookmarksSlice";
import { useSelector } from "react-redux";
import { useGetBookmarksQuery } from "services/apiSlice";

export default function Bookmarks() {
  // const data = useSelector(selectBookmarks);
  const { data, isLoading } = useGetBookmarksQuery();
  return (
    <>
      <div>Bookmarks</div>
      <div className={styles.MainContainer}>
        {data && <IndexDataList data={data} />}
      </div>
    </>
  );
}
