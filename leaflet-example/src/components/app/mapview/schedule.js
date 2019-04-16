import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBIcon,
  MDBCol,
  MDBInput
} from "mdbreact";
import {Modal} from "react-bootstrap";
import {Button} from "react-bootstrap";
import Button1 from "@material-ui/core/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Calender from "react-ionicons/lib/MdCalendar";

var body;

class Schedule extends React.Component{

  constructor(props) {
    super(props);
    

    this.state = {
        startDate: new Date()
    }

    this.handleChange = this.handleChange.bind(this);    
    this.onAddClick = this.onAddClick.bind(this);  
    
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  
  onAddClick(event) {

    let aid= this.props.aid;
    let token = localStorage.getItem("AccessToken");
    const url = "http://localhost:9000/schedule/create";
    console.log('token '+token);
    const AuthStr = 'Bearer '.concat(token);
    let headers = new Headers();
  
    //console.log(body);
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Authorization', AuthStr);
    console.log(AuthStr);
    headers.append('Access-Control-Allow-Origin', url);
    headers.append('Access-Control-Allow-Credentials', 'true');
  
    headers.append( 'PUT','POST');
    console.log(url);
    body = {
            aid : aid,
            date : this.state.startDate
     
    }
   
    console.log(body);
    console.log(token);
   
    fetch(url, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify(body),
        withCredentials:true,
                credentials:'include',
                headers:{
                    'Authorization': 'Bearer ' + token,
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': url
                },
       
    })
    
 
 .catch(() => console.log("Can’t access " + url + " response. "))

          alert("Added to Your Schedule");
          this.handleClose();
  }
 

  handleChange(date) {
    this.setState({
      startDate: date
    });
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
              <Button1 size="small" color="primary" style={{float :"right"}} onClick={this.handleShow}>
                        Add to Schedule
                    </Button1>
      <Modal show={this.state.show} onHide={this.handleClose}  >
      <Modal.Header closeButton style={{backgroundColor: "black", color: "white"}}>
              <Modal.Title><p className="h4 text-center mb-4">CHOOSE THE DATE</p></Modal.Title>
            </Modal.Header>
        <Modal.Body style={{width:"1000px"}}>
       <MDBContainer>
      <MDBRow>
        <MDBCol md="6">
          <form>
            
          <DatePicker
                selected={this.state.startDate}
                onChange={this.handleChange}
                
            />
            <Calender/>
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
              <Button onClick={this.onAddClick} style={{fontSize:"15px", backgroundColor:"#16839E", width: "140px"}}>
              Add
               </Button>
            </Modal.Footer>
    </Modal>
      </div>
          );
    }
    
    
}
 

export default Schedule;