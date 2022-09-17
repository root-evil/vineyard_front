import { IconButton, useMediaQuery } from "@material-ui/core";
import { ExitToApp, Person } from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import React from "react";

const SelectTheme = () => {};

const Menu = () => {
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <nav className="flex justify-end items-center w-full px-4">
      {!xs && (
        <IconButton color="inherit">
          <Person fontSize="medium" color="primary" className="!text-main" />
        </IconButton>
      )}

      <IconButton color="inherit">
        <ExitToApp fontSize="medium" color="primary" className="!text-main" />
      </IconButton>
    </nav>
  );
};

export default Menu;
