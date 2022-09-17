import { useTheme } from "@material-ui/styles";
import React from "react";

const Name = () => {
  const theme = useTheme();

  return (
    <div className="flex mr-4 whitespace-nowrap flex-col justify-center">
      <div className="flex">
        <span
          style={{ color: theme.palette.primary.main }}
          className="text-main md:text-lg font-bold mr-6"
        >
          Иван Иванович
        </span>
      </div>
    </div>
  );
};

export default Name;
