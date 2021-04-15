import { Home } from "@material-ui/icons";
import * as React from "react";
import {
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemText,
  IconButton,
  makeStyles,
  Container,
} from "@material-ui/core";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";

const useStyles = makeStyles({
  navbarDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`,
  },
  navDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`,
  },
  linkText: {
    textDecoration: `none`,
    textTransform: `uppercase`,
    display: `flex`,
    justifyContent: `space-between`,
    color: `white`,
  },
});

const navLinks = [
  { title: `login`, path: `/login` },
  { title: `home`, path: `/events` }, 
  { title: `events`, path: `/events` },
  { title: `user`, path: `/user` },
  { title: `rsvp`, path: `/rsvp` },
];

const NavDisplay = () => {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <Container maxWidth="xl" className={classes.navbarDisplayFlex}>
          <IconButton edge="start" color="inherit" aria-label="home">
            <Home fontSize="large" />
          </IconButton>
          {/* Add code */}
          <List
            component="nav"
            aria-labelledby="main navigation"
            className={classes.navDisplayFlex} // this
          >
            <Link className={classes.linkText} to="/">Login{" "}</Link>
            {/* { this.props.sessionToken !== null ? <link> ? }:{} */}

            <Link className={classes.linkText} to="/event">Event{" "}</Link>
            <Link className={classes.linkText} to="/user">User{" "}</Link>
            <Link className={classes.linkText} to="/rsvp">Rsvp{" "}</Link>

            {/* {navLinks.map(({ title, path }) => (
              <a href={path} key={title} className={classes.linkText}>
                <ListItem button>
                  <ListItemText primary={title} />
                </ListItem>
              </a>
            ))} */}
          </List>
        </Container>
        {/* Add code end */}
      </Toolbar>
    </AppBar>
  );
};

export default NavDisplay;
