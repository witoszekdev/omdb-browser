import { useEffect, useState } from "react";
import { isBrowser } from "utils/isBrowser";

/** Run media query and return it's result */
export function useMedia(query: string, defaultState = false) {
  const [state, setState] = useState(
    isBrowser ? () => window.matchMedia(query).matches : defaultState
  );

  useEffect(() => {
    let mounted = true;
    const mql = window.matchMedia(query);
    const onChange = () => {
      if (!mounted) {
        return;
      }
      setState(!!mql.matches);
    };

    mql.addEventListener("change", onChange);
    setState(mql.matches);

    return () => {
      mounted = false;
      mql.removeEventListener("change", onChange);
    };
  }, [query]);

  return state;
}
