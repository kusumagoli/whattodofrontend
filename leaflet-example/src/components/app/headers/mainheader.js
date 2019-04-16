import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import SearchIcon from '@material-ui/icons/Search';
import Button from "@material-ui/core/Button";

import logo from './../images/vvlogo.png';
import home from "./../images/home1.svg"

var body;

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },

  margin: {
    margin: theme.spacing.unit,
  },

  toolbar: {
    paddingRight: 24,
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    height:"80px",
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
  
  title: {
    flexGrow: 1,
  },
  
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
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

  logo: {
      fontSize: '30px',
      width: '150px',
      height: '80px',
      borderRadius: '50%',
      backgroundColor: 'black',
  
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

class MainHeader extends React.Component {


    constructor(props){
        super(props);
        this.onLoginClick = this.onLoginClick.bind(this);
        
    }
    onLoginClick(){
        console.log(this.props.values)
        console.log(this.props.history)
        this.props.history.push('/login')
    }

  state = {
    open: false,
    anchorEl: null,
  };


  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };
  handleHome = () => {  
    this.props.history.push('/')
  }

  render() {
    const {anchorEl} = this.state;
    const { classes } = this.props;
    const open = Boolean(anchorEl);


    return (
      <div>
      <div className={classes.root} style={{height: "200px"}}>

        <AppBar
          position="absolute"
          className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
        >
          <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
           
          <img src={logo} className={classes.logo}/>
            <Typography
            
              component="h4"
              variant="h4"
              color="inherit"
              noWrap
              className={classes.title}
            >
            <b>
              VibrantVibes
              </b>
            </Typography>
            <Button onClick={this.handleHome}>
                  <img src={home} style={{height: "20px", width: "30px"}}/>
                </Button>

          <div> <Button variant="outlined" size="medium"  style={{background : "white"}} className={classes.margin} onClick={this.onLoginClick}>
        Login
      </Button></div>

 

            
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

MainHeader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainHeader);