import { useMediaQuery, useTheme } from "@material-ui/core";
import React from "react";
import LazyImage from "../../../System/LazyImage";

const Logo = () => {
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down("xs"));

  return !xs ? (
    <span className="w-36 absolute top-1/2 -translate-y-1/2 inset-x-0 ml-4 xs:mx-auto flex z-[2000]">
      <div className="w-36 overflow-hidden flex">
        <LazyImage
          src="/images/design/logo/logo_tm.svg"
          aria-label="logo"
          className="min-w-[140px]"
        />
      </div>
    </span>
  ) : null;
};

export default Logo;
