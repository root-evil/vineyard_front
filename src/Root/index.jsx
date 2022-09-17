import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { view } from "@risingstack/react-easy-state";
import React, { useLayoutEffect } from "react";
import App from "../App";
import ui from "../store/ui";
import { greenTheme } from "../theme/greenTheme";
import { mainTheme } from "../theme/mainTheme";
import { redTheme } from "../theme/redTheme";

export default view(() => {
  const { themeCurrent } = ui;

  const themeReducer = () => {
    if (themeCurrent === "green") {
      return greenTheme;
    }

    if (themeCurrent === "red") {
      return redTheme;
    }

    return mainTheme;
  };

  useLayoutEffect(() => {
    const val = localStorage.getItem("themeAgro");

    if (val === "green") {
      ui.themeCurrent = "green";
    }

    if (val === "red") {
      ui.themeCurrent = "red";
    }

    if (val === "main") {
      ui.themeCurrent = "main";
    }

    if (!val) {
      localStorage.setItem("themeAgro", "main");
    }
  }, []);

  return (
    <ThemeProvider theme={themeReducer()}>
      <CssBaseline />

      <App />
    </ThemeProvider>
  );
});
