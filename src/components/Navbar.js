import React from "react";
import { NavLink, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Container,
  Toolbar,
  Box,
  Button,
  useScrollTrigger,
  Fab,
  Zoom,
  IconButton,
} from "@material-ui/core";
import StarsIcon from "@material-ui/icons/Stars";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  appBar: { background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)" },
  menu: { flexGrow: 1 },
  icon: {
    position: "absolute",
    left: 0,
    right: 0,
    margin: "0 auto",
  },
  button: {
    margin: theme.spacing(0.5),
    color: "white",
  },
  buttonActive: {
    margin: theme.spacing(0.5),
    backgroundColor: "#f194a9",
  },
  fabStyle: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  },
}));

export default function Navbar(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <ElevationScroll>
        <AppBar className={classes.appBar} position="fixed">
          <Container fixed>
            <Toolbar>
              <Box className={classes.menu}>
                <Button
                  component={NavLink}
                  to="/"
                  exact
                  className={classes.button}
                  activeClassName={classes.buttonActive}
                >
                  Home
                </Button>
                <Button
                  component={NavLink}
                  to="/items"
                  className={classes.button}
                  activeClassName={classes.buttonActive}
                >
                  Items
                </Button>
                <Button
                  component={NavLink}
                  to="/about"
                  className={classes.button}
                  activeClassName={classes.buttonActive}
                >
                  About
                </Button>
              </Box>
              <IconButton color="inherit" className={classes.icon}>
                <StarsIcon fontSize="large" />
              </IconButton>
              <Box mr={2}>
                <Button color="inherit" variant="outlined">
                  Log In
                </Button>
              </Box>
              <Button color="secondary" variant="contained">
                Sign In
              </Button>
            </Toolbar>
          </Container>
        </AppBar>
      </ElevationScroll>
      <Toolbar id="back-to-top-anchor" />
      <ScrollTop {...props}>
        <Fab
          className={classes.fabStyle}
          size="small"
          aria-label="scroll back to top"
        >
          <KeyboardArrowUpIcon style={{ color: "white" }} />
        </Fab>
      </ScrollTop>
    </React.Fragment>
  );
}

function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

function ScrollTop(props) {
  const { children } = props;
  const classes = useStyles();

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}
