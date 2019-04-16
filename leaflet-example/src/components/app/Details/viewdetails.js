import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Header from "../headers/index";
import Carousel from 'react-bootstrap/Carousel';
import Button from '@material-ui/core/Button';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';

import './../sidebar/sidebarstyles.css';
import {myicon} from "./../../maprender/icon";
import {myicon2} from "./../../maprender/icon2";
import car from "./../images/car.svg"





const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  mainFeaturedPost: {
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    // marginBottom: theme.spacing.unit * 4,
  },
  mainFeaturedPostContent: {
    padding: `${theme.spacing.unit * 6}px`,
    [theme.breakpoints.up('md')]: {
      paddingRight: 0,
    },
  },
  mainGrid: {
    marginTop: theme.spacing.unit * 3,
  },
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
  
  sidebarAboutBox: {
    padding: theme.spacing.unit * 2,
    backgroundColor: theme.palette.grey[200],
  },

icon: {
  padding: '3px',
  fontSize: '15px',
  width: '25px',
  height: '25px',
  borderRadius: '25%'
},


  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
});

var body;
const position = [17.440081, 78.348915];
class ViewDetails extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      attr_Name : "",
      city : "",
      category : "",
      description: "",
      location : "",
      from_Timings : "",
      upto_Timings : "",
      fare : "",
      rating : "",
      latitude: "",
      longitude: "",
      imgurls: [],
      id : "",
      distance: "",
      time: 0,
      city1 : ""
    }

    this.getDistance =this.getDistance.bind(this)
    this.handleBack =this.handleBack.bind(this)
  }
  componentDidMount(event) {

    let id= this.props.location.state.id;
    console.log(this.props.location.state.id);
    console.log(id);
    body = {
      aid: id,
    }
    console.log(body);
    console.log(body.aid);
   
      const url = "http://localhost:9000/attractions/id"; 
      let headers = new Headers();
  
      headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'application/json');
  
      headers.append('Access-Control-Allow-Origin', url);
      headers.append('Access-Control-Allow-Credentials', 'true');
  
      headers.append('PUT','POST');
  
      fetch(url, {
         headers:headers,
         method: 'PUT',
         body: JSON.stringify(body)
      })
      .then(response => response.json())
      .then(contents => { 
        console.log("In fetch: "+ contents);

                          this.setState({
                            attr_Name : contents.attr_Name,
                            city : contents.city,
                            category : contents.category,
                            description: contents.description,
                            location : contents.location,
                            from_Timings : contents.from_Timings,
                            upto_Timings : contents.upto_Timings,
                            fare : contents.fare,
                            rating : contents.rating,
                            imgurls: contents.imageUrls,
                            latitude: contents.latitude,
                            longitude: contents.longitude,
                          })

                          console.log("Hello"  + this.state.imgurls)
                          console.log("Hello hi"  + this.state.category)
        
               
                          {navigator.geolocation.getCurrentPosition(function(location) {
                            console.log("my current latitude :",location.coords.latitude)
                            console.log("my current longitude :",location.coords.longitude);
                           sessionStorage.setItem("lat",location.coords.latitude)
                           sessionStorage.setItem("long",location.coords.longitude)
                           console.log("my current latitude :",sessionStorage.getItem("lat"))
                            console.log("my current longitude :",sessionStorage.getItem("long"));
          
                          })}
                          
                          
   })

   
   .catch(()=> console.log("can't access" + url + "response. "))
   
    }



    handleBack(event) {

      this.setState({city1 : event.currentTarget.value}, () => {
      console.log(this.state.city1)
  
      let city=this.state.city1
      console.log(city);
      let path= `/cardview/`;
      this.props.history.push({
        pathname: path,
        state: {
          city: city,
          flag: 0
        }
     }) 
  
     console.log("sent city"+this.state.id)
        });
      
    }

   getDistance() {
      // return distance in meters
      var lon1 = (parseFloat(sessionStorage.getItem("long")))*Math.PI/180,
          lat1 = (parseFloat(sessionStorage.getItem("lat")))*Math.PI/180,
          lon2 = (this.state.longitude)*Math.PI/180,
          lat2 = (this.state.latitude)*Math.PI/180;
  
      var deltaLat = lat2 - lat1;
      var deltaLon = lon2 - lon1;
  
      var a = Math.pow(Math.sin(deltaLat/2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon/2), 2);
      var c = 2 * Math.asin(Math.sqrt(a));
      var EARTH_RADIUS = 6371;
      var d= (c * EARTH_RADIUS).toFixed(2);
      var time = ((d*1000)/234).toFixed(2);
     // var d = geolib.getDistance({latitude: lat1, longitude: lon1}, {latitude: lat2, longitude: lon2})
      this.setState ({ distance : d,
      time: time})
  }



    setMarker = ({ latitude, longitude }) => {
      this.setState({
          markers: [...this.state.markers, {
              latitude,
              longitude
          }]
      })
      }
    render() {
      const {classes} = this.props;

  return (
    <div style={{ 
      // backgroundColor: "#A0A0A0"
      backgroundImage: "url(" + "https://wallpaperplay.com/walls/full/9/7/4/249650.jpg" + ")",
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    }}>
    <React.Fragment>
      <CssBaseline />
      <Header history={this.props.history}/>
      <div className={classes.layout} style={{paddingBottom : "200px"}}>
        
        <main>
            <br></br>
            <center>
           <Typography component="h1" variant="h4" color="inherit" gutterBottom>
           <b>{this.state.attr_Name}</b></Typography>
          </center>
          {/* Main featured post */}
          <br></br>
          <div className="row">
          <div className="col md-6">
           
            <Carousel style={{width: "520px", height: "300px"}}>
              {this.state.imgurls.map((Image,index) => {
                          return(
                <Carousel.Item>
                  <img
                    style={{height: "300px", widht: "100%"}}
                    className="d-block w-100"
                    src={Image}
                    alt="First slide"
                  />
                </Carousel.Item>
                          )}
                      )}
              </Carousel>
              </div>
              <div className="col md-6">
              <Map
                  ref={this.mapRef}
                  center={position}
                  zoom={13}
                  style={{ height: '300px', width: '100%' }}
                >

               <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

<Marker  style={{position:"fixed"}} icon={myicon} position={[parseFloat(sessionStorage.getItem("lat")), parseFloat(sessionStorage.getItem("long"))]}>
                                 <Popup>Your Current location.</Popup>
                                 </Marker>

                                                <Marker style={{position:"fixed"}} icon={myicon2} position={[this.state.latitude, this.state.longitude]} onclick={this.getDistance}>
                                                <Popup minWidth={"200"} closeButton={true} minHeight={10}>
                                 
                                                    <div>
                                                    <b>{this.state.attr_Name}</b><br></br>
                                                
                                                    {this.state.location}<br></br><img src={car}  className={classes.icon}/> 
                                                    <b>{this.state.time}</b>&nbsp;mins
                                                    <br></br>{this.state.distance}&nbsp;Km
                                                    
                                                    </div>
                                                </Popup>
                                                </Marker>
                                            </Map><br></br><br></br>
              </div>
              </div>
         <br/>
          
          <Grid container spacing={40} className={classes.cardGrid}>
            
              <Grid item  xs={12} md={6}>
                <Card className={classes.card}>
                  <div className={classes.cardDetails}>
                    <CardContent>
                      <Typography variant="h5">
                        <b>Address </b>
                      </Typography>  <br></br>                  
                      <Typography variant="h6">
                        {this.state.location}
                      </Typography>
                     </CardContent>
                  </div>  
                </Card>
              </Grid>
              <Grid item  xs={12} md={6}>
                <Card className={classes.card} style={{height: "155px"}}>
                  <div className={classes.cardDetails}>
                    <CardContent>
                      <Typography variant="h5">
                        <b>Category</b>
                      </Typography>  <br></br>                  
                      <Typography variant="h6">
                        {this.state.category}
                      </Typography>
                     </CardContent>
                  </div>  
                </Card>
              </Grid>
              <Grid item  xs={12} md={6}>
                <Card className={classes.card}>
                  <div className={classes.cardDetails}>
                    <CardContent>
                      <Typography variant="h5">
                      <b>Timing</b>                        
                      </Typography>  <br></br>                  
                      <Typography variant="h6">
                      {this.state.from_Timings} <b> - </b> {this.state.upto_Timings}
                      </Typography>
                     </CardContent>
                  </div>  
                </Card>
              </Grid>
              <Grid item xs={12} md={3}>
              <Paper elevation={0} className={classes.sidebarAboutBox} style={{height: "125px"}}>
                <Typography variant="h5" gutterBottom>
                  <b>Fare</b>
                </Typography>
                <Typography variant="h6" gutterBottom>
                Rs. {this.state.fare}&nbsp;/-
                </Typography>
              </Paper>
            
             
            </Grid>

              <Grid item xs={12} md={3}>
              <Paper elevation={0} className={classes.sidebarAboutBox} style={{height: "125px"}}>
                <Typography variant="h5" gutterBottom>
                  <b>Rating</b>
                </Typography>
                <Typography variant="h6" gutterBottom>
                {this.state.rating}
                </Typography>
              </Paper>
            
             
            </Grid>
              
            
          </Grid>
          {/* End sub featured posts */}
          <Grid container spacing={40} className={classes.mainGrid}>
            {/* Main content */}
            {/* <Grid item xs={12} md={8}> */}
              {/* <Typography variant="h5" gutterBottom>
               <b>Description</b> 
              </Typography> */}
              {/* <Divider />
              {this.state.description}
                            
                <br></br><br></br> */}
          
            {/* </Grid> */}
            {/* End main content */}
            {/* Sidebar */}

            <Grid item  xs={12} md={12}>
                <Card className={classes.card}>
                  <div className={classes.cardDetails}>
                    <CardContent>
                      <Typography variant="h5">
                        <b>Description</b>
                      </Typography>  <br></br>                  
                      <Typography variant="h6">
                      {this.state.description}
                      </Typography>
                      <Button size="small" color="primary" style={{float :"right", fontSize: "10px"}} onClick = {this.handleBack} value={this.state.city}>
                        Previous page...
            </Button>
                     </CardContent>
                  </div>  
                </Card>
              </Grid>
            
            {/* End sidebar */}
          </Grid>
        </main>
      </div>
    
    </React.Fragment>
    </div>
  );
}
}

ViewDetails.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ViewDetails);