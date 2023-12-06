import styles from "styles/Root.module.scss";
import PDBMenu from "components/PDBMenu";
import { Outlet } from "react-router-dom";
import AppLogo from "components/AppLogo";
import { BreakpointContext } from "contexts/BreakpointContext";
import useBreakpoint from "hooks/useBreakpoint";

export default function Root() {
  const breakpoint = useBreakpoint();
  return (
    <BreakpointContext.Provider value={breakpoint}>
      <div className={styles.AppContainer}>
        <header className={styles.AppHeaderBlock}>
          <AppLogo />
          {!breakpoint && (
            <h2>A central place to explore different sources of Public Data</h2>
          )}
          <div className={styles.MenuPositioner}>
            <PDBMenu />
          </div>
        </header>
        <Outlet />
      </div>
    </BreakpointContext.Provider>
  );
}
