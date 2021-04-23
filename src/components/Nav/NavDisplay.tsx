import { Home } from "@material-ui/icons";
import {
  AppBar,
  Toolbar,
  List,
  IconButton,
  makeStyles,
  Container,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  navbarDisplayFlex: {
    display: ``
  
  },
  navDisplayFlex: {
    display: `flex`,
    justifyContent: `space-around`,
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
  { title: `events`, path: `/events` },
  { title: `rsvp`, path: `/rsvp` },
];

const NavDisplay = () => {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <Container maxWidth="xl" className={classes.navbarDisplayFlex}>
          {/* <IconButton edge="start" color="inherit" aria-label="home"> */}
            {/* <Home fontSize="large" /> */}
          {/* </IconButton> */}
          {/* Add code */}
          <List
            component="nav"
            aria-labelledby="main navigation"
            className={classes.navDisplayFlex} // this
          >
          
            <Link className={classes.linkText} to="/">User{" "}</Link>
            <Link className={classes.linkText} to="/events">Event{" "}</Link>
            <Link className={classes.linkText} to="/rsvp">Rsvp{" "}</Link>

           
          </List>
        </Container>
        {/* Add code end */}
      </Toolbar>
    </AppBar>
  );
};

export default NavDisplay;
