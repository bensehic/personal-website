import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import DarkModeToggle from "./DarkModeToggle";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  SwipeableDrawer,
} from "@mui/material";

function Header({ darkMode, toggleDarkMode }) {
  const [toggleDrawer, setToggleDrawer] = React.useState(false);

  const isSmallScreen = window.innerWidth <= 640;

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() => setToggleDrawer(!toggleDrawer)}
        >
          <MenuIcon />
        </IconButton>
        <SwipeableDrawer
          anchor={isSmallScreen ? "bottom" : "left"}
          open={toggleDrawer}
          onOpen={() => setToggleDrawer(!toggleDrawer)}
          onClose={() => setToggleDrawer(!toggleDrawer)}
        >
          <div className="lg:w-80 sm:w-8">
            <List sx={{ flexGrow: 1 }}>
              <ListItem>
                <ListItemButton
                  onClick={() => setToggleDrawer(!toggleDrawer)}
                  href="#"
                >
                  <ListItemIcon>
                    <FitnessCenterIcon />
                  </ListItemIcon>
                  <ListItemText primary="Gym" />
                </ListItemButton>
              </ListItem>
              <ListItem sx={{ justifyContent: "center" }}>
                <DarkModeToggle
                  darkMode={darkMode}
                  toggleDarkMode={toggleDarkMode}
                />
              </ListItem>
            </List>
          </div>
        </SwipeableDrawer>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Ben Sehic
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
