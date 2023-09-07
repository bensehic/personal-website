import "./styles/App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import React, { useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/home-page";
import darkTheme from "./styles/darkTheme";
import lightTheme from "./styles/lightTheme";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const location = useLocation();
  const isActiveRoute = location.pathname === "/";

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <div className="h-screen flex flex-col bg-gradient-to-t from-gray-300">
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <div className="outlet justify-center">
          {isActiveRoute ? <HomePage /> : <Outlet />}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
