import { Button } from "@mui/material";
import React from "react";
import LightModeIcon from '@mui/icons-material/LightMode';
import BedtimeIcon from '@mui/icons-material/Bedtime';


function DarkModeToggle({ darkMode, toggleDarkMode }) {
  return (
    <Button
      onClick={toggleDarkMode}
      variant="filledTonal"
      startIcon={darkMode ? <LightModeIcon /> : <BedtimeIcon />}
    >
      {darkMode ? "Light Mode" : "Dark Mode"}
    </Button>
  );
}

export default DarkModeToggle;
