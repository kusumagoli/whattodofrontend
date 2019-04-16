import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBModalFooter,
  MDBIcon,
  MDBInput
} from "mdbreact";
import {Button} from "react-bootstrap";
import { Paper } from "@material-ui/core";
import withStyles from '@material-ui/core/styles/withStyles';
import User from 'react-ionicons/lib/IosLogIn';
import User1 from 'react-ionicons/lib/IosPerson';
import Pswd from 'react-ionicons/lib/MdLock';

const styles = theme => ({

  main: {
    width: '100%',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 850,
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
})

var body;

class Login extends React.Component {


  constructor(props) {
    super(props);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onRegisterClick = this.onRegisterClick.bind(this);
  }

  handleSubmit(event) {

    
    body = {
      username: this.state.username,
      password: this.state.password,
    }
    console.log(body)
    console.log(body.password)
    console.log(body.username)
    const url = "http://localhost:9000/users/signin";
    console.log(url)
    let headers = new Headers();
 
    headers.append('Content-Type','application/json');
    headers.append('Accept','application/json');
 
    headers.append('Access-Control-Allow-origin',url);
    headers.append('Access-Control-Allow-Credentials','true');
 
    headers.append('PUT','POST');
 
    fetch(url, {
       headers:headers,
       method: 'PUT',
       body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(contents => {console.log(contents);

      localStorage.setItem("AccessToken",contents.accessToken);
      
      this.props.history.push('/')
                      
 })
 .catch(()=> console.log("can't access" + url + "response. "))
 
  }



  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 5;
  }

  handlePasswordChange (event) {
    this.setState({password: event.target.value});
  }

  handleUserChange(event) {
    this.setState({ username: event.target.value})
  }



onRegisterClick(){
    console.log(this.props.values)
    
    this.props.history.push('/signup')
}

 render(){
  const { classes } = this.props;
  return (
    <div style={{backgroundImage: "url(" + "https://wallimpex.com/data/out/629/wallpaper-air-9863103.jpg" + ")",
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
     }}>
     <br/><br/><br/><br/><br/><br/><br/><br/>
    <MDBContainer><br/>
    <main className={classes.main}>
      <Paper>
      <MDBRow>
          <MDBCol md="4"></MDBCol>
        <MDBCol md="4">
        <br/>
                  <h1 style={{fontSize: "40px"}}><center> <User /> &nbsp; Login</center> </h1>
              <form><br/>
                <div className="grey-text">
                <User1/>
                  <MDBInput
                    label="Type your UserName"
                    icon="envelope"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    onChange = {this.handleUserChange}
                  />
                  <Pswd/>
                  <MDBInput
                    label="Type your password"
                    icon="lock"
                    group
                    type="password"
                    validate
                    onChange={this.handlePasswordChange}
                  />
                </div>

              <div className="text-center mt-4">
              <Button onClick={this.handleSubmit}  style={{background : "#2DABCA"}}><b>Login</b></Button>
              </div>
              <br/><br/>
              </form>
              <MDBModalFooter>
                <div className="font-weight-light">
                <p>Not a member?  <Button onClick={this.onRegisterClick} style={{background : "#1793B2"}}>Sign Up</Button></p>
                </div>

              </MDBModalFooter>
        </MDBCol>
      </MDBRow>
     
      </Paper>
      </main>
    </MDBContainer>
    </div>
  );
}

 }
  

export default withStyles(styles)(Login);