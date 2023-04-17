import styles from "styles/Root.module.scss";
import PDBMenu from "components/PDBMenu";
import { Outlet } from "react-router-dom";
import useWindowSize from "hooks/useWindowSize";
import { useEffect, useState } from "react";
import { BREAKPOINTS } from "../constants";
import AppLogo from "components/AppLogo";
import { BreakpointContext } from "contexts/BreakpointContext";

export default function Root() {
  const windowSize = useWindowSize();
  const [breakpoint, setBreakpoint] = useState<keyof typeof BREAKPOINTS | null>(
    null
  );
  useEffect(() => {
    if (windowSize.innerWidth < BREAKPOINTS.PHONE) {
      setBreakpoint("PHONE");
    } else if (windowSize.innerWidth < BREAKPOINTS.SMALL_WINDOW) {
      setBreakpoint("SMALL_WINDOW");
    } else {
      setBreakpoint(null);
    }
  }, [windowSize]);
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
