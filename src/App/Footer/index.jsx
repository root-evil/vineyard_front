import { useTheme } from "@material-ui/styles";
import React, { memo } from "react";

export default memo(() => {
  const theme = useTheme();

  return (
    <>
      <footer
        style={{ backgroundColor: theme.palette.primary.main }}
        className={`relative flex shrink-0`}
      >
        <div className="flex flex-col flex-1 items-center pt-2 px-2">
          <div>
            <p
              style={{ color: theme.palette.primary.contrastText }}
              className={`w-full text-center text-white text-sm m-0}`}
            >
              © 2022 Root Evil Ltd.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
});
