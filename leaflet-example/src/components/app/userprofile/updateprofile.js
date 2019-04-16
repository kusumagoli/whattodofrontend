import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBIcon,
  MDBCol,
  MDBInput
} from "mdbreact";
import {Modal} from "react-bootstrap";
//import Button from '@material-ui/core/Button';
import {Button} from "react-bootstrap";
import { withStyles} from '@material-ui/styles';
import User from 'react-ionicons/lib/MdPerson';
import Mail from 'react-ionicons/lib/MdMail';
import Pin from "react-ionicons/lib/MdPin";


let body;

class UpdateProfile extends React.Component{

  constructor(props) {
    super(props);
    

    this.state = {
      username : "",
      email: "",
      city: "",
      show: false,
     
    }

    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    
    this.onUpdateClick = this.onUpdateClick.bind(this);  
    
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  
  onUpdateClick(event) {

  console.log(this.state.username);
    
    let body = {
      username : this.state.username,
      email: this.state.email,
      city: this.state.city,

    }
    console.log(body)
    console.log(body.username)
    console.log(body.email)
    console.log(body.city)
    const url = "http://localhost:9000/users/update";
    console.log("url:"+url)
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
      this.setState({ show: false }); 
      window.location.reload(); 
    
                   
 })
 .catch(()=> console.log("can't access" + url + " response. "))

 
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
      .then(contents => { console.log("In fetch: "+ JSON.stringify(contents));
                          this.setState({
                            username : contents.username,
                            email: contents.email,
                            city: contents.city
                          })
                          console.log("response:"+ contents.username)
                          console.log('test1 '+this.state)
                          
                              
   })
   .catch(()=> console.log("can't access" + url + "response. "))
   
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


  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }
       
    render(){
    
        return (
            <div>
              <Button
              style={{fontSize:"10px", backgroundColor:"#16839E", width: "150px"}}
                  onClick={this.handleShow}
                >
            <b> UPDATE PROFILE</b>
          </Button>
      <Modal show={this.state.show} onHide={this.handleClose}  >
      <Modal.Header closeButton style={{backgroundColor: "black", color: "white"}}>
              <Modal.Title><p className="h4 text-center mb-4"><br/><br/>UPDATE PROFILE</p></Modal.Title>
            </Modal.Header>
        <Modal.Body style={{width:"1000px"}}>
       <MDBContainer>
      <MDBRow>
        <MDBCol md="6">
          <form>
            
            <div className="grey-text" style={{fontSize: "18px"}}>
            <User/>
            <MDBInput
                label="User"
                icon="envelope"
                group
                type="text"
                validate
                error="wrong"
                success="right"
                disabled
                value = {this.state.username}
                onChange = {this.handleUserChange}
              />
            
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

            <Pin/>
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
              
                   
      </div>
      <br/> <br/>
    </form>
    </MDBCol>
    
    </MDBRow>


    </MDBContainer>
    </Modal.Body>
    <Modal.Footer >
              <Button  onClick={this.handleClose} style={{fontSize:"15px", backgroundColor:"#16839E", width: "120px"}}>
                Close
              </Button>
              <Button onClick={this.onUpdateClick} style={{fontSize:"15px", backgroundColor:"#16839E", width: "140px"}}
                  
                  >  Update Profile</Button>
            </Modal.Footer>
    </Modal>
      </div>
          );
    }
    
    
}
 

export default UpdateProfile;