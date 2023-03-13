import IndexDataList from "components/IndexDataList";
import styles from "styles/Bookmarks.module.scss";
import { selectBookmarks } from "features/bookmarksSlice";
import { useSelector } from "react-redux";

export default function Bookmarks() {
  const data = useSelector(selectBookmarks);
  return (
    <>
      <div>Bookmarks</div>
      <div className={styles.MainContainer}>
        {data && <IndexDataList data={data} />}
      </div>
    </>
  );
}
