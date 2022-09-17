import { createTheme } from "@material-ui/core/styles";

export const mainColor = "#017ac1";

export const mainTheme = createTheme({
  palette: {
    primary: { main: mainColor, contrastText: "#fff" },
    secondary: { main: mainColor, contrastText: "#fff" },
  },
  typography: {
    fontFamily: "'Noto Sans JP', Arial, Helvetica, sans-serif",
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        a: {
          cursor: "pointer",
          fontWeight: 700,
          color: mainColor,

          userSelect: "none",
          textDecoration: "none",
          letterSpacing: "0.04em",

          "&:hover": {
            color: mainColor,
          },
        },
        html: {
          width: "100%",
        },
        body: {
          minWidth: 320,
          width: "100%",
          backgroundColor: "#fff",
          overflowY: "auto",
          fontFamily: "'Noto Sans JP', sans-serif",
        },
        b: {
          fontWeight: 700,
        },
        "#app": {
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          height: "100vh",
        },

        "#root": {
          height: "100%",
        },
        "#component-error-text": {
          color: "red",
        },
        h1: {
          fontWeight: 700,
          marginBottom: "1rem",
        },
        h2: {
          fontWeight: 700,
          marginBottom: "1rem",
        },
        h3: {
          fontWeight: 700,
          marginBottom: "1rem",
        },
        p: {
          marginBottom: "1rem",
        },
        img: {
          maxWidth: "100%",
        },

        ".btn-anim": {
          "& svg": {
            transform: "translateX(0)",
          },

          "&:hover svg": {
            transform: "translateX(4px)",
          },
        },

        ".shake-anim": {
          animation: "shake 1.3s cubic-bezier(.36,.07,.19,.97) infinite",
        },

        "@keyframes shake": {
          "10%, 90%": {
            transform: "translate3d(-1px, 0, 0)",
          },

          "20%, 80%": {
            transform: "translate3d(2px, 0, 0)",
          },

          "30%, 50%, 70%": {
            transform: "translate3d(-4px, 0, 0)",
          },

          "40%, 60%": {
            transform: "translate3d(4px, 0, 0)",
          },
        },
      },
    },
    MuiButton: {
      root: {
        marginTop: "1rem",
        backgroundColor: "#fff",
        borderRadius: "3em",
        fontWeight: 700,
        border: `none`,
        color: mainColor,
        transition: "all .3s ease",
        textTransform: "unset",
        letterSpacing: "0.04em",
        height: "auto",
        "&:hover": {
          backgroundColor: mainColor,
          color: "#fff",
        },

        "&$disabled": {
          backgroundColor: "#eee",
        },
      },
    },
    MuiIconButton: {
      root: {
        alignSelf: "flex-start",
      },
    },
    MuiTab: {
      root: {
        textTransform: "unset",
        fontWeight: 700,
        letterSpacing: ".04em",

        "@media (min-width: 600px)": {
          minWidth: "auto",
        },
      },
    },
    MuiInputBase: {
      input: {
        "&:-webkit-autofill": {
          transitionDelay: "9999s",
          transitionProperty: "background-color, color",
        },
      },
    },
    MuiInput: {
      underline: {
        "&&&&:before": {
          borderBottom: "2px solid #dedede",
        },
        "&&&&:hover:before": {
          borderBottom: "2px solid #0061a1",
        },
      },
    },
    MuiFormLabel: {
      root: {
        color: "#444444d9",
        fontSize: "1rem",
        fontWeight: 700,
        lineHeight: "1.6",
      },
    },
    MuiFormHelperText: {
      root: {
        fontSize: ".9rem",
        lineHeight: "1.6",
        color: "#5f5f5f",
        "&$error": {
          color: "red",
        },
      },
    },
    MuiPaper: {
      rounded: {
        borderRadius: 10,
      },
    },
    MuiTableCell: {
      root: {
        borderBottom: "none",
      },
    },
  },
});
