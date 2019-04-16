import React from 'react';
import PropTypes from 'prop-types';
//import Button from '@material-ui/core/Button';
import {Button} from "react-bootstrap";
import CssBaseline from '@material-ui/core/CssBaseline';
import purple from '@material-ui/core/colors/purple';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import profile from './../images/home_grid/profile.png';
import UpdateProfile from './updateprofile';
import Header from '../headers';
import CreatedAttractions from './createdattractions';
import Plan from './plan';

const accent = purple.A200;

const styles = theme => ({
  main: {
    width: '100%',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 800,
      marginLeft: 'auto',
      marginRight: 'auto',
      
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height:750,
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  
  
  submit: {
    marginTop: theme.spacing.unit * 3,
    width:'150px'
  },
});
var body;
class Profile extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      username : "",
      email: "",
      city: "",
    }
    this.handleCreate =this.handleCreate.bind(this)
  }

  handleCreate(event){
    this.props.history.push('/create');
  }



  componentDidMount(event) {

    body = { accessToken: localStorage.getItem("AccessToken") }
    console.log(localStorage.getItem("AccessToken"))
   
      const url = "http://localhost:9000/users/accesstoken"; 
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
      .then(contents => { console.log("In fetch: "+ contents);
                          this.setState({
                            username : contents.username,
                            email: contents.email,
                            city: contents.city
                          })
                          console.log('test1 dgfvfcbfc'+this.state)
        
                              
   })
   .catch(()=> console.log("can't access" + url + "response. "))
   
    }
  
 render(){

  const { classes } = this.props;
  return (
    <div style={{backgroundImage: "url(" + "https://www.wisc-online.com/assetrepository/getfile?id=1510&getType=view&width=0&height=0" + ")",
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
     }}>
    <Header history={this.props.history}/>
    <main className={classes.main}>
      <CssBaseline />
     

      <Paper className={classes.paper} >
        <center>
          <img src={profile}/>        </center>
        <Typography component="h1" variant="h5">
         <h5><b>User Profile</b></h5>
        </Typography>
        
        <Typography >
            <h6><b >Username: </b>  {this.state.username}</h6>
           
        </Typography>
        <Typography>
            <h6><b>Email: </b> {this.state.email}</h6>
            <br/>
            
        </Typography>

        <center>
          <div>

        <UpdateProfile history={this.props.history}/>
       
       </div>
       
        {/* <div>
        <UpdatePassword history={this.props.history}/>
        </div> */}
        <br></br>
          
        <div>
        <Button
                  style={{fontSize:"10px", backgroundColor:"#237489", width: "150px"}}
                  onClick={this.handleCreate}
                >
            <b>ADD ATTRACTION</b>
          </Button>
        </div>

        <br></br> 
        <div>
        <CreatedAttractions history={this.props.history}/>
          
       </div>   
         <br></br> 
       <div>
       <Plan history={this.props.history}/>
        </div>


          </center>
      </Paper>
      </main>
      </div>
   
  );
 }
  
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profile);