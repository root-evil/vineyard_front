import { useTheme } from "@material-ui/styles";
import React from "react";
import Logo from "./components/Logo";
import Menu from "./components/Menu";
import Name from "./components/Name";

const Header = () => {
  const theme = useTheme();

  return (
    <header
      style={{ backgroundColor: theme.palette.primary.contrastText }}
      className="bg-white flex flex-col z-[1048] shadow-sm shadow-black/20"
    >
      <div className="flex relative justify-between items-center h-20 py-4 pl-4">
        <Name />

        <Logo />

        <Menu />
      </div>
    </header>
  );
};

export default Header;
