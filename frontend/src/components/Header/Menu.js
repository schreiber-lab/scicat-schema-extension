import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ListItemText,
  Box,
  SwipeableDrawer,
  IconButton,
  List,
  ListItem,
  Divider,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import FolderIcon from "@material-ui/icons/Folder";
import SpaIcon from "@material-ui/icons/Spa";
import CenterFocusWeakIcon from "@material-ui/icons/CenterFocusWeak";
import CreateNewFolderIcon from "@material-ui/icons/CreateNewFolder";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";
import SettingsIcon from "@material-ui/icons/Settings";
import SettingsApplicationsIcon from "@material-ui/icons/SettingsApplications";

export const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setIsOpen(open);
  };

  return (
    <div>
      <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)}>
        <MenuIcon />
      </IconButton>
      <SwipeableDrawer
        anchor="left"
        open={isOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <Box
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            <ListItem button component={Link} to="/proposals">
              <Box color="primary.main">
                <SpaIcon />
              </Box>
              <ListItemText
                primary={
                  <Typography style={{ marginLeft: 30 }}>Proposals</Typography>
                }
              />
            </ListItem>
            {/* <Divider /> */}
            <ListItem button component={Link} to="/instruments">
              <Box color="primary.main">
                <SettingsIcon />
              </Box>
              <ListItemText
                primary={
                  <Typography style={{ marginLeft: 30 }}>
                    Instruments
                  </Typography>
                }
              />
            </ListItem>
            {/* <Divider /> */}
            <ListItem button component={Link} to="/samples">
              <Box color="primary.main">
                <CenterFocusWeakIcon />
              </Box>
              <ListItemText
                primary={
                  <Typography style={{ marginLeft: 30 }}>Samples</Typography>
                }
              />
            </ListItem>
            {/* <Divider /> */}
            <ListItem button component={Link} to="/datasets">
              <Box color="primary.main">
                <FolderIcon />
              </Box>
              <ListItemText
                primary={
                  <Typography style={{ marginLeft: 30 }}>Datasets</Typography>
                }
              />
            </ListItem>
            <Divider />
            <ListItem button component={Link} to="/proposal-creation">
              {/* <Box color="primary.main"> */}
              <CreateNewFolderIcon />
              {/* </Box> */}
              <ListItemText
                primary={
                  <Typography style={{ marginLeft: 2 }}>
                    Create Proposal
                  </Typography>
                }
              />
            </ListItem>
            {/* <Divider /> */}
            <ListItem button component={Link} to="/instrument-creation">
              {/* <Box color="primary.main"> */}
              <CreateNewFolderIcon />
              {/* </Box> */}
              <ListItemText
                primary={
                  <Typography style={{ marginLeft: 2 }}>
                    Create Instrument
                  </Typography>
                }
              />
            </ListItem>
            {/* <Divider /> */}
            <ListItem button component={Link} to="/sample-creation">
              {/* <Box color="primary.main"> */}
              <CreateNewFolderIcon />
              {/* </Box> */}
              <ListItemText
                primary={
                  <Typography style={{ marginLeft: 2 }}>
                    Create Sample
                  </Typography>
                }
              />
            </ListItem>
            {/* <Divider /> */}
            <ListItem button component={Link} to="/dataset-creation">
              {/* <Box color="primary.main"> */}
              <CreateNewFolderIcon />
              {/* </Box> */}
              <ListItemText
                primary={
                  <Typography style={{ marginLeft: 2 }}>
                    Create Dataset
                  </Typography>
                }
              />
            </ListItem>
            <ListItem button component={Link} to="/dataset-and-sample-creation">
              {/* <Box color="primary.main"> */}
              <CreateNewFolderIcon />
              {/* </Box> */}
              <ListItemText
                primary={
                  <Typography style={{ marginLeft: 2 }}>
                    Create Dataset&Sample
                  </Typography>
                }
              />
            </ListItem>
            <Divider />
            <ListItem button component={Link} to="/md-schemas">
              <Box color="primary.main">
                <LibraryBooksIcon />
              </Box>
              <ListItemText primary="Show MD Schemas" />
            </ListItem>
            {/* <Divider /> */}
            <ListItem button component={Link} to="/md-schema-creation">
              {/* <Box color="primary.main"> */}
              <LibraryAddIcon />
              {/* </Box> */}
              <ListItemText primary="Create new MD Schema" />
            </ListItem>
            <ListItem button component={Link} to="/autocomplete-schemas">
              {/* <Box color="primary.main"> */}
              <SettingsApplicationsIcon />
              {/* </Box> */}
              <ListItemText primary="Autocomplete schemas" />
            </ListItem>
          </List>
        </Box>
      </SwipeableDrawer>
    </div>
  );
};
