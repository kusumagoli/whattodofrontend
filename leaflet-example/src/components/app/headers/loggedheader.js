import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import logo from './../images/vvlogo.png';
import { Button } from '@material-ui/core';
import sch from "./../images/schedule.svg";
import home from "./../images/home1.svg"


var body;

const drawerWidth = 240;

const styles = theme => ({

  largeIcon: {
    width: 60,
    height: 60,
  },

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
    height: "80px",
    backgroundColor: 'black',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
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
  logo: {
    fontSize: '30px',
    width: '150px',
    height: '80px',
    borderRadius: '50%',
    backgroundColor: 'black',

},
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
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
    //height: '100vh',
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

class LoggedHeader extends React.Component {
  state = {
    open: false,
    anchorEl: null,
  };

  handleSchedule = () => {  
    this.props.history.push('/schedule')
  }


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

  Logout = () => {
    body = { }
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
          .then(contents => 
          this.props.history.push('/'),
          
          )
           .catch(() => console.log("Can’t access " + url + " response. "))      
           

  }



  render() {
    const {anchorEl} = this.state;
    const { classes } = this.props;
    const open = Boolean(anchorEl);


    return (
      <div>
      <div className={classes.root}>

        <AppBar
          position="absolute"
          className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
        >
          <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
           
          <img src={logo}  className={classes.logo}/>
            <Typography
              component="h5"
              variant="h5"
              color="inherit"
              noWrap
              className={classes.title}
            >
              <b>VibrantVibes</b>
            </Typography>


            <Button onClick={this.handleHome}>
                  <img src={home} style={{height: "20px", width: "30px"}}/>
                </Button>

                <Button onClick={this.handleSchedule}>
                  <img src={sch} style={{height: "30px", width: "30px"}}/>
                </Button>

                <IconButton
                  aria-owns={open ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                  iconStyle={styles.largeIcon}
                  
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
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          
        </main>
      </div>

      
      </div>
    );
  }
}

LoggedHeader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoggedHeader);