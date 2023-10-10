import { createTheme } from "@mui/material";

const lightTheme = createTheme({
  palette: {
    primary: {
      main: "#111827",
    },
    secondary: {
      main: "#D1D5DB",
    },
    mode: "light",
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
});

export default lightTheme;
