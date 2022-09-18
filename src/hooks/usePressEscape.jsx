import { useEffect, useRef } from "react";
import { useKeyPress } from "./useKeyPress";

export const usePressEscape = (callback, disabled) => {
  const escape = useKeyPress("Escape");

  const clickedRef = useRef(false);

  useEffect(() => {
    if (!clickedRef.current && escape && callback && !disabled) {
      clickedRef.current = true;
      callback();
    }

    if (!escape && !disabled) {
      clickedRef.current = false;
    }
  }, [escape, callback, disabled]);
};
