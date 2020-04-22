import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import { useAuthContext, logout } from '../utils/AuthContext';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import GradeIcon from '@material-ui/icons/Grade';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    paddingTop: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  toolbar: {
    alignItems: 'flex-start',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    backgroundColor: '#d3d3d3',
    color: 'black',
  },
  title: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    alignItems: 'flex-start',
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  list: {
    width: 250,
  },
  fab: {
    margin: theme.spacing(1),
  },
}));

const Header = () => {
  const { auth, dispatch } = useAuthContext();
  const classes = useStyles();

  const [drawerState, setDrawerState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (side, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setDrawerState({ ...drawerState, [side]: open });
  };

  const sideList = (side) => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        <Divider />

        <ListItem button component={Link} to="/app/home">
          <ListItemIcon>
            <GradeIcon />
          </ListItemIcon>
          <ListItemText>Home</ListItemText>
        </ListItem>

        <ListItem button component={Link} to="/app/tickets">
          <ListItemIcon>
            <GradeIcon />
          </ListItemIcon>
          <ListItemText>Tickets</ListItemText>
        </ListItem>

        <ListItem button component={Link} to="/app/events">
          <ListItemIcon>
            <GradeIcon />
          </ListItemIcon>
          <ListItemText>Events</ListItemText>
        </ListItem>

        <ListItem button component={Link} to="/app/eventstable">
          <ListItemIcon>
            <GradeIcon />
          </ListItemIcon>
          <ListItemText>Events Table</ListItemText>
        </ListItem>

        <ListItem button component={Link} to="/app/ticketreader">
          <ListItemIcon>
            <GradeIcon />
          </ListItemIcon>
          <ListItemText>Ticket Reader</ListItemText>
        </ListItem>

        <ListItem button component={Link} to="/app/shop">
          <ListItemIcon>
            <GradeIcon />
          </ListItemIcon>
          <ListItemText>Shop</ListItemText>
        </ListItem>

        <ListItem button component={Link} to="/app/selltickets">
          <ListItemIcon>
            <GradeIcon />
          </ListItemIcon>
          <ListItemText>Sell Tickets</ListItemText>
        </ListItem>
      </List>
      <Divider />
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {auth.isAuthenticated ? (
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer('left', true)}
            >
              <MenuIcon />
            </IconButton>
          ) : null}

          <Drawer open={drawerState.left} onClose={toggleDrawer('left', false)}>
            {sideList('left')}
          </Drawer>
          <Typography variant="h6" className={classes.title}>
            TicketGuru
          </Typography>
          <div>
            {' '}
            {auth.isAuthenticated ? (
              <Button
                variant="contained"
                color="secondary"
                onClick={() => dispatch(logout())}
              >
                Logout
              </Button>
            ) : null}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default Header;
