import * as materialColors from "@material-ui/core/colors";

export const palete = {
  type: "light",

  primary: {
    main: materialColors.purple[500],
    dark: materialColors.purple[700],
    light: materialColors.purple[300],
    contrastText: "#fff",
  },

  secondary: {
    main: materialColors.teal[500],
    dark: materialColors.teal[700],
    light: materialColors.teal[300],
    contrastText: "#fff",
  },

  success: {
    main: materialColors.lightGreen[500],
    dark: materialColors.lightGreen[700],
    light: materialColors.lightGreen[300],
    contrastText: "#fff",
  },

  info: {
    main: materialColors.blue[500],
    dark: materialColors.blue[700],
    light: materialColors.blue[300],
    contrastText: "#fff",
  },

  warning: {
    main: materialColors.amber[500],
    dark: materialColors.amber[700],
    light: materialColors.amber[300],
    contrastText: "#fff",
  },

  white: {
    main: "#fff",
  },

  error: {
    main: "#DA495B",
  },
};
