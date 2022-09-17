import { useEffect } from "react";

export const useCloserByNodes = (node1, node2, open, setOpen) => {
  useEffect(() => {
    const dialog = document.querySelector(".MuiDialog-container");

    const onclick = (e) => {
      if (open && !node1?.contains(e?.target) && !node2?.contains(e?.target)) {
        setOpen(false);
      }
    };

    if (open) {
      if (dialog) {
        dialog.addEventListener("click", onclick);
      } else {
        document.addEventListener("click", onclick);
      }
    }

    return () => {
      if (dialog) {
        dialog.removeEventListener("click", onclick);
      }

      document.removeEventListener("click", onclick);
    };
  }, [node1, node2, open, setOpen]);

  return null;
};
