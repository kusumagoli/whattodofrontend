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


class Plan extends React.Component{

  constructor(props) {
    super(props);
    

    this.state = {
      city: "", 
    }

    this.handleCityChange = this.handleCityChange.bind(this);    
    this.onContinueClick = this.onContinueClick.bind(this);  
    
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  
  onContinueClick(event) {
    
    let city=this.state.city
    console.log(city);
    console.log("sending city"+city)
    let path= `/cardview/`;
    this.props.history.push({
      pathname: path,
      state: {
        city: city,
        flag: 1
      }
   }) 
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
              style={{fontSize:"10px", backgroundColor:"#0D3F4B", width: "150px"}}
                  onClick={this.handleShow}
                >
            <b> PLAN YOUR WEEKEND</b>
          </Button>
      <Modal show={this.state.show} onHide={this.handleClose}  >
      <Modal.Header closeButton style={{backgroundColor: "black", color: "white"}}>
              <Modal.Title><p className="h4 text-center mb-4"><br/><br/>SELECT CITY</p></Modal.Title>
            </Modal.Header>
        <Modal.Body style={{width:"1000px"}}>
       <MDBContainer>
      <MDBRow>
        <MDBCol md="6">
          <form>
            
            <div className="grey-text" style={{fontSize: "18px"}}>
            <select id="inputState" class="form-control" name="city" value={this.state.city} onChange={this.handleCityChange} >
                <option>Choose City</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Banglore">Banglore</option>
                <option value="Mumbai">Mumbai</option>
            </select>
      </div>
    
    </form>
    </MDBCol>
    
    </MDBRow>


    </MDBContainer>
    </Modal.Body>
    <Modal.Footer >
              <Button  onClick={this.handleClose} style={{fontSize:"15px", backgroundColor:"#16839E", width: "120px"}}>
                Close
              </Button>
              <Button onClick={this.onContinueClick} style={{fontSize:"15px", backgroundColor:"#16839E", width: "140px"}}>
              Continue
               </Button>
            </Modal.Footer>
    </Modal>
      </div>
          );
    }
    
    
}
 

export default Plan;