import { clsx } from "clsx";
import React from "react";

const ShowAndHide = ({ show, children, className }) => {
  return (
    <div
      className={clsx(
        className,
        show
          ? "opacity-100 visible"
          : "opacity-0 invisible h-0 max-h-0 w-0 max-w-0 absolute overflow -top-[9999px] -left-[9999px]"
      )}
    >
      {children}
    </div>
  );
};

export default ShowAndHide;
