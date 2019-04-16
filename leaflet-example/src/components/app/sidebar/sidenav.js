import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { fade } from '@material-ui/core/styles/colorManipulator';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MainListItems from './listItems';
import { Button } from '@material-ui/core';

import sch from "./../images/schedule.svg";
import home from "./../images/home1.svg"


var body;

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {

    backgroundColor: 'black',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - 230px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: 230,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },

  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
  
});

class SideNav extends React.Component {
  state = {
    open: false,
    anchorEl: null,
  };
constructor(props)
{
  super(props);
  this.Logout=this.Logout.bind(this);
}
  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };


  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };


handleProfile = () => {  
  this.props.history.push('/profile')
}

handleHome = () => {  
  this.props.history.push('/')
}

handleSchedule = () => {  
  this.props.history.push('/schedule')
}

  Logout = () => {
    body = { token: localStorage.getItem("AccessToken") }
    console.log(localStorage.getItem("AccessToken"))
    const url = "http://localhost:9000/users/signout?token="+localStorage.getItem("AccessToken"); 
    console.log(url)       
    let headers = new Headers();
    localStorage.removeItem("AccessToken")

          headers.append('Content-Type', 'application/json');
          headers.append('Accept', 'application/json');

          headers.append('Access-Control-Allow-Origin', url);
          headers.append('Access-Control-Allow-Credentials', 'true');

          headers.append('PUT', 'GET');
          console.log("1")  
          console.log(JSON.stringify(body))
          fetch(url, {
              headers: headers,
              method: 'PUT',
              body :JSON.stringify(body)
          })
         
        
          .then(response =>{  })
          .then(contents => {}
            )
          
           .catch(() => console.log("Can’t access " + url + " response. "))      
           this.props.history.push('/')    
  }



  render() {
    const {anchorEl} = this.state;
    const { classes } = this.props;
    const open = Boolean(anchorEl);


    return (
      <div className={classes.root}>
        {/* <CssBaseline /> */}
        <AppBar
          position="absolute"
          className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
        >
          <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(
                classes.menuButton,
                this.state.open && classes.menuButtonHidden,
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h4"
              color="inherit"
              noWrap
              className={classes.title}
            >
              VibrantVibes
            </Typography>

            <Button onClick={this.handleHome}>
                  <img src={home} style={{height: "20px", width: "30px"}}/>
                </Button>

                <Button onClick={this.handleSchedule}>
                  <img src={sch} style={{height: "30px", width: "30px"}}/>
                </Button>

            {/* <div className={classes.title} />
                  <div className={classes.search}>
                      <div className={classes.searchIcon}>
                          <SearchIcon />
                      </div>
                      <InputBase
                        placeholder="Search…"
                        classes={{
                              root: classes.inputRoot,
                              input: classes.inputInput,
                            }}
            />
          </div> */}
                <IconButton
                  aria-owns={open ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  
                  <MenuItem onClick={this.handleProfile}>Profile</MenuItem>
                  <MenuItem onClick={this.Logout}>LogOut</MenuItem>
                </Menu>
            
          </Toolbar>
        </AppBar>
        <Drawer
          variant="persistent"
          classes={{
            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            <MainListItems history={this.props.history}/>
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
        </main>
      </div>
    );
  }
}

SideNav.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SideNav);