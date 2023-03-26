import styles from "styles/Root.module.scss";
import PDBMenu from "components/PDBMenu";
import { Link, Outlet } from "react-router-dom";

export default function Root() {
  return (
    <div className={styles.AppContainer}>
      <header className={styles.AppHeaderBlock}>
        <Link style={{ color: "inherit", textDecoration: "inherit" }} to="/">
          <h1>Public Data Browser</h1>
        </Link>
        <h2>A central place to explore different sources of Public Data</h2>
        <div className={styles.MenuPositioner}>
          <PDBMenu />
        </div>
      </header>
      <Outlet />
    </div>
  );
}
