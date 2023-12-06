import { BREAKPOINTS } from "../constants";
import { useState, useEffect } from "react";
import useWindowSize from "./useWindowSize";

const useBreakpoint = () => {
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
  return breakpoint;
};

export default useBreakpoint;
