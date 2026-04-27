import { useState, useEffect } from "react";

// Returns true when viewport width is below the given breakpoint (default 641px)
export default function useIsMobile(breakpoint = 641) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);

  return isMobile;
}
