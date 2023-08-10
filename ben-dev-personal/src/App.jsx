import "./styles/App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import React, { useState } from "react";
import { CssBaseline, ThemeProvider, Typography } from "@mui/material";
import Header from "./components/Header";
import darkTheme from "./styles/darkTheme";
import lightTheme from "./styles/lightTheme";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <div>
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <main className="pt-16">
          <Typography variant="h4">Welcome my guy!</Typography>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
