import { Link } from "react-router-dom";
import styles from "styles/AppLogo.module.scss";
import { useContext } from "react";
import { BreakpointContext } from "contexts/BreakpointContext";

const AppLogo = () => {
  const breakpoint = useContext(BreakpointContext);
  return (
    <div className={styles.AppLogo}>
      <Link style={{ color: "inherit", textDecoration: "inherit" }} to="/">
        {!breakpoint ? (
          <div className={styles.Head}>Public Data Browser</div>
        ) : (
          <>
            <div className={styles.Head}>PDB</div>
            <div className={styles.Subhead}>Public Data Browser</div>
          </>
        )}
      </Link>
    </div>
  );
};

export default AppLogo;
