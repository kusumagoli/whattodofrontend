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
import User1 from 'react-ionicons/lib/IosPerson';
import Pswd2 from 'react-ionicons/lib/MdLock';
import Mail from 'react-ionicons/lib/MdMail';
import Pswd1 from 'react-ionicons/lib/IosLock';
import Location from 'react-ionicons/lib/MdPin';



 var body;

class Register extends React.Component {


  constructor(props) {
    super(props);

    this.state =
    {
      username : "",
      email : "",
      password : "",
      confirmpassword : "",
      city : "",
      errors : {},
 
    }

    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.onRegisterClick = this.onRegisterClick.bind(this);
    this.onLoginClick = this.onLoginClick.bind(this);
    
  }

  onRegisterClick(event) {
    if(this.validateForm())
    {
    console.log("validate form 2")
    body = {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
      city: this.state.city,

    }
    console.log(body)
    console.log(body.password)
    console.log(body.username)
    console.log(body.email)
    console.log(body.city)
    const url = "http://localhost:9000/users";
    console.log(url)
    let headers = new Headers();
 
    headers.append('Content-Type','application/json');
    headers.append('Accept','application/json');
 
    headers.append('Access-Control-Allow-origin',url);
    headers.append('Access-Control-Allow-Credentials','true');
 
    headers.append('PUT','POST');
 
    fetch(url, {
       headers:headers,
       method: 'POST',
       body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(contents => {console.log(contents);
      this.props.history.push('/login')
                      
 })
 .catch(()=> console.log("can't access" + url + " response. "))
    }
 
  }

  validateForm() {
    //return this.state.username.length > 0 && this.state.email.length > 0 && this.state.password.length > 5 && this.state.password==this.state.confirmpassword  && this.state.city.length > 0;
    console.log("validate form 1")

    let errors = {};
    let formIsValid = true;

    if (!this.state.username) {
      formIsValid = false;
      console.log(this.state.username)
      errors["username"] = "*Please enter your username.";
    }

    if (typeof (this.state.username) !== "undefined") {
      console.log("true" + this.state.username)
      if (!(this.state.username).match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        console.log("false" + this.state.username)
        errors["username"] = "*Please enter alphabet characters only.";
      }
    }

    if (!this.state.email) {
      formIsValid = false;
      errors["email"] = "*Please enter your email-ID.";
    }

    if (typeof (this.state.email) !== "undefined") {
      //regular expression for email validation
      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (!pattern.test((this.state.email))) {
        formIsValid = false;
        errors["email"] = "*Please enter valid email-ID.";
      }
    }

    if (!this.state.password) {
      formIsValid = false;
      errors["password"] = "*Please enter your password.";
    }

    if (typeof (this.state.password) !== "undefined") {
      if (!(this.state.password).match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
        formIsValid = false;
        errors["password"] = "*Please enter strong password(must contain atleast 1 small letter,1 capital letter,1 special symbol,1 no and length) .";
      }
    }
    if (!this.state.confirmpassword) {
      formIsValid = false;
      errors["confirmpassword"] = "*Please enter your confirm password.";
    }
    if (typeof (this.state.confirmpassword) !== "undefined") {
      if ((this.state.password)!=(this.state.confirmpassword)) {
        formIsValid = false;
        errors["confirmpassword"] = "*Passwords dont match";
      }
    }

    if (!this.state.city) {
      formIsValid = false;
      errors["city"] = "*Please enter your City.";
    }

    if (typeof (this.state.city) !== "undefined") {
      if (!(this.state.city).match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["city"] = "*Please enter alphabet characters only.";
      }
    }

    this.setState({
      errors: errors
    });
    return formIsValid;
  }

  handlePasswordChange (event) {
    this.setState({password: event.target.value});
    console.log("Output:" +this.state.password)
  }

  handleConfirmPasswordChange (event) {
    this.setState({confirmpassword: event.target.value});
  }

  handleUserChange(event) {
    this.setState({ username: event.target.value})
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value})
  }

  handleCityChange(event) {
    this.setState({ city: event.target.value})
  }

    onLoginClick(){
    console.log(this.props.values)
    console.log(this.props.history)
    this.props.history.push('/login')
  }
render(){

  return (
    <div style={{backgroundImage: "url(" + "https://wallimpex.com/data/out/629/wallpaper-air-9863103.jpg" + ")",
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
     }}>
     <br/><br/>
    <MDBContainer>
      <div className="jumbotron" style={{backgroundColor: "white"}}>
      <MDBRow>
          <MDBCol md="4"></MDBCol>
        <MDBCol md="4">
        <br/>  <h1><center><MDBIcon icon="users" /> Register</center> </h1><br/>
              <form>
                <div className="grey-text">
                <User1/>
                <MDBInput
                label="Your name"
                group
                type="text"
                validate
                error="wrong"
                success="right"
                value = {this.state.username}
                onChange = {this.handleUserChange}
              />
              	<div style={{ fontSize: 12, color: "red" }} >{this.state.errors.username}</div>
      
          <Mail/>
              <MDBInput
                label="Your email"
                icon="envelope"
                group
                type="email"
                validate
                error="wrong"
                success="right"
                value = {this.state.email}
                onChange = {this.handleEmailChange}
              />
              	<div style={{fontSize: 12, color: "red"}} >{this.state.errors.email}</div>

              <Pswd1/>
              <MDBInput
                label="Your password"
                icon="lock"
                group
                type="password"
                validate
                value = {this.state.password}
                onChange = {this.handlePasswordChange}
              />
              	<div style={{fontSize: 12, color: "red"}}>{this.state.errors.password}</div>
              <Pswd2/>
              <MDBInput
                label="Confirm your Password"
                icon="exclamation-triangle"
                group
                type="password"
                validate
                value = {this.state.confirmpassword}
                onChange = {this.handleConfirmPasswordChange}
              />
              <div style={{fontSize: 12, color: "red"}}>{this.state.errors.confirmpassword}</div>
              <Location/>
              <MDBInput
                label="Your Permanent Location"
                icon="globe"
                group
                type="text"
                validate
                error="wrong"
                success="right"
                value = {this.state.city}
                onChange = {this.handleCityChange}
              />
              <div style={{fontSize: 12, color: "red"}}>{this.state.errors.city}</div>

                </div>

                <div className="text-center mt-4">
              <Button onClick={this.onRegisterClick}  style={{background : "#2DABCA"}}>Register</Button>
              </div>
              </form>
              <MDBModalFooter>
                <div className="font-weight-light">
                  <p>Already a member? <Button onClick={this.onLoginClick} style={{background : "#2DABCA"}}>Login</Button></p>
                </div>
              </MDBModalFooter>
        </MDBCol>
      </MDBRow>
      </div>
    </MDBContainer>
    </div>
  );
};

}
  

export default Register;