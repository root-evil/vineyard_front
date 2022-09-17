import { IconButton, useMediaQuery } from "@material-ui/core";
import { ExitToApp, Person } from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import clsx from "clsx";
import React, { useState } from "react";
import ui from "../../../store/ui";
import ShowAndHide from "../../../System/ShowAndHide";

const SelectTheme = ({ setOpen }) => {
  const theme = useTheme();

  return (
    <div
      className={clsx(
        "flex flex-col text-sm w-auto py-1.5 transition-all duration-500 px-2.5 absolute rounded-md shadow-md z-[999999] whitespace-nowrap before:content-[''] before:border-solid before:border-transparent before:absolute before:border-8 before:-mt-2.5",
        "left-[30%] -translate-x-1/2 top-full before:bottom-full before:left-1/2 before:border-b-gray-200"
      )}
      style={{
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
      }}
    >
      <span
        className="mb-2"
        onClick={(e) => {
          e.stopPropagation();
          ui.themeCurrent = "main";
          localStorage.setItem("themeAgro", "main");
          setOpen(false);
        }}
      >
        Голубая тема
      </span>
      <span
        className="mb-2"
        onClick={(e) => {
          e.stopPropagation();
          ui.themeCurrent = "green";
          localStorage.setItem("themeAgro", "green");
          setOpen(false);
        }}
      >
        Зеленая тема
      </span>
      <span
        className="mb-2"
        onClick={(e) => {
          e.stopPropagation();
          ui.themeCurrent = "red";
          localStorage.setItem("themeAgro", "red");
          setOpen(false);
        }}
      >
        Красная тема
      </span>
    </div>
  );
};

const Menu = () => {
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down("xs"));
  const [open, setOpen] = useState(false);

  console.log(open);

  return (
    <nav className="flex justify-end items-center w-full px-4">
      {!xs && (
        <div className="relative">
          <IconButton
            color="inherit"
            onClick={() => setOpen((prevState) => !prevState)}
          >
            <Person fontSize="medium" color="primary" />

            <ShowAndHide show={open}>
              <SelectTheme setOpen={setOpen} />
            </ShowAndHide>
          </IconButton>
        </div>
      )}

      <IconButton color="inherit">
        <ExitToApp fontSize="medium" color="primary" />
      </IconButton>
    </nav>
  );
};

export default Menu;
