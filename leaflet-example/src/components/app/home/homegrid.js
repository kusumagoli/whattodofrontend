import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';

import banglore from './../images/home_grid/bangloreland.jpg';
import charminar from './../images/home_grid/charminar.jpg';
import gof from './../images/home_grid/gateway_of_india.jpg';
import CardView from './../mapview/cardview';
import SelectInput from '@material-ui/core/Select/SelectInput';


var key;

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 300,
    width: '100%',
  },
  image: {
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        border: '4px solid currentColor',
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme.spacing.unit + 6}px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
});

const images = [
  {
    url: banglore,
    value: 'Banglore',
    width: '25%',
  },
  {
    url: charminar,
    value: 'Hyderabad',
    width: '25%',
  },
  {
    url: gof,
    value: 'Mumbai',
    width: '25%',
  },
];
var body;

class GridView extends React.Component {

  constructor(props) {
    super(props);

    this.state = 
    {
      city : "",
    }

    this.handleCity = this.handleCity.bind(this);
  }


  handleCity(event) {

    this.setState({city:event.currentTarget.value}, () => {
    console.log(this.state.city)

    let city=this.state.city
    console.log(city);

  

    console.log("sending city"+city)
    let path= `/cardview/`;
    this.props.history.push({
      pathname: path,
      state: {
        city: city,
        flag : 0
      }
   }) 

   console.log("sent city"+this.state.city)
      });
    
  }


  render() {
    const { classes } = this.props;

    return (
      <div>
         <br></br>
          <center>
            <div style = {{width : "1450px", height:"200px"}}> 
                {images.map(image => (
                    <ButtonBase 
                        onClick={this.handleCity} 
                        focusRipple
                        key={image.value}
                        value={image.value}
                        className={classes.image}
                        
                        focusVisibleClassName={classes.focusVisible}
                        style={{width: image.width}}
                    >
                        <span
                            className={classes.imageSrc}
                            style={{backgroundImage: `url(${image.url})`}}
                        />
                        <span className={classes.imageBackdrop} />
                        <span className={classes.imageButton}>
                            <Typography
                                component="span"
                                variant="subtitle1"
                                color="inherit"
                                className={classes.imageTitle}
                            >
                                {image.value}
                                <span className={classes.imageMarked} />
                            </Typography>
                        </span>
                    </ButtonBase>
                ))}
            </div>
            <div style={{width: "1300px", height: "200px"}}>
                <p style = {{fontSize : '20px'}}>  <br></br>   Our website provides you with the most exquisite places to visit across the
country, with elaboration like mesmerising pictures, crisp description and its location on the map.You can drop your comments , ratings and add pictures
too..feel free to login with us to unveil more privileges and to have a whole new experience!!<br></br>
Relax,You are with us!! We make it simple.</p>
            </div>
</center>
         
      </div>

    )
  }
}

GridView.propTypes = {
         classes: PropTypes.object.isRequired,
         };
      

export default withStyles(styles)(GridView);

