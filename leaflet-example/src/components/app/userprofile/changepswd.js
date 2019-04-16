import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBIcon,
  MDBCol,
  MDBInput
} from "mdbreact";
import {Modal} from "react-bootstrap";
import Button from '@material-ui/core/Button';
import { withStyles} from '@material-ui/styles';

var body;


class   UpdatePassword extends React.Component{

  constructor(props) {
    super(props);

    this.state =
    {
      oldpswd : "",
      newpswd : "",
      confirmpswd : "",
      show: false,

    };

    

    this.handleOldpasswordChange = this.handleOldpasswordChange.bind(this);
    this.handleNewpasswordChange = this.handleNewpasswordChange.bind(this);
    this.handleConfirmChange = this.handleConfirmChange.bind(this);
    
    this.onCreateClick = this.onCreateClick.bind(this);  
    
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  validateForm() {
    return (
      this.state.oldpswd.length > 0 &&
      this.state.newpswd.length > 0 &&
      this.state.newpswd === this.state.confirmpswd
    );
  }


  handleOldpasswordChange (event) {
    this.setState({attr_Name: event.target.value});
  }

  handleNewpasswordChange (event) {
    this.setState({city: event.target.value});
  }

  handleConfirmChange(event) {
    this.setState({ category: event.target.value})
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
              style={{fontSize:"10px"}}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="secondary"
                  onClick={this.handleShow}
                >
             Update Password
          </Button>
      <Modal show={this.state.show} onHide={this.handleClose}  >
      <Modal.Header closeButton style={{backgroundColor: "black", color: "white"}}>
              <Modal.Title><p className="h3 text-center mb-4"><br/><br/>CHANGE PASSWORD</p></Modal.Title>
            </Modal.Header>
        <Modal.Body style={{width:"1000px"}}>
       <MDBContainer>
      <MDBRow>
        <MDBCol md="6">
          <form>
            
            <div className="grey-text">

            <MDBInput
                label="Old Password"
                icon="lock"
                group
                type="text"
                validate
                error="wrong"
                success="right"
                value = {this.state.attr_Name}
                onChange = {this.handleOldpasswordChange}
              />

              <MDBInput
                label="New Password"
                placeholder="Enter new password"
                icon="lock"
                group
                type="text"
                validate
                error="wrong"
                success="right"
                value = {this.state.city}
                onChange = {this.handleNewpasswordChange}
              />

              <MDBInput
                label="Confirm New Password"
                placeholder="Enter New Password"
                icon="exclamation-triangle"
                group
                type="text"
                validate
                error="wrong"
                success="right"
                value = {this.state.city}
                onChange = {this.handleConfirmChange}
              />

              
                   
      </div>
      <br/> <br/>
    </form>
    </MDBCol>
    </MDBRow>
    </MDBContainer>
    </Modal.Body >
    <Modal.Footer >
              <Button variant="secondary" onClick={this.handleClose} type="submit"
                  halfWidth
                  variant="contained"
                  color="primary" 
                  style={{margin : "4px"}}>
                Close
              </Button>
              <Button onClick={this.onCreateClick} type="submit"
                  halfWidth
                  variant="contained"
                  color="primary"
                  style={{margin : "4px"}}
                  >  Update Password</Button>
            </Modal.Footer>
    </Modal>
      </div>
          );
    }
    
    
}
 

export default UpdatePassword;