import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBIcon,
  MDBCol,
  MDBInput
} from "mdbreact";
import {Modal, Alert} from "react-bootstrap";
//import Button from '@material-ui/core/Button';
import {Button} from "react-bootstrap";
import { withStyles} from '@material-ui/styles';


var body;


class CreatedAttractions extends React.Component{

  constructor(props) {
    super(props);

    this.state =
    {
      data : [],
      show: false,
      aid: ""

    }
    this.handleDelete = this.handleDelete.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }


  handleEdit(event) {

    this.setState({aid : event.currentTarget.value}, () => {
    console.log(this.state.aid)

    let aid =this.state.aid
    console.log(aid);

  

    console.log("sending aid"+aid)
    let path= `/editattr/`;
    this.props.history.push({
      pathname: path,
      state: {
        aid: aid
      }
   }) 

   console.log("sent city"+this.state.city)
      });
    
  }

 handleDelete(event) {
   console.log("Hey reached")
  body = { aid : event.currentTarget.value }
  console.log(this.state.aid)
  if(window.confirm('Delete the item?'))
  {
    console.log("deleting started" + body.aid)
    const url = "http://localhost:9000/attractions/delete"; 
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    headers.append('Access-Control-Allow-Origin', url);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('DELETE','POST');

    fetch(url, {
       headers:headers,
       method: 'DELETE',
       body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(contents => { console.log("In fetch: "+ contents);
     this.handleClose() 
     window.location.reload(); 
                            
 })
 .catch(()=> console.log("can't access" + url + "response. "))
}
 } 



  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }
    


  componentDidMount(event) {

    body = { accessToken: localStorage.getItem("AccessToken") }
    console.log(localStorage.getItem("AccessToken"))
   
      const url = "http://localhost:9000/attractions/token"; 
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
                            data : contents
                          })
                          console.log('test1 '+this.state)
        
                              
   })
   .catch(()=> console.log("can't access" + url + "response. "))
   
    }
    
    render(){
     
    
        return (
            <div>
              <Button
              style={{fontSize:"10px", backgroundColor:"#1B5868", width: "150px"}}
                
                  onClick={this.handleShow}
                >
            <b>CREATED ATTRACTIONS </b>
          </Button>
      <Modal show={this.state.show} onHide={this.handleClose}  
          dialogClassName="modal-100w"
          aria-labelledby="example-custom-modal-styling-title" >
     
      <Modal.Header closeButton style={{backgroundColor: "black", color: "white"}}>
              <Modal.Title><p className="h3 text-center mb-8"><br/><br/>CREATED ATTRACTIONS</p></Modal.Title>
            </Modal.Header>
        <Modal.Body >
       <MDBContainer>
       <MDBRow>
        <MDBCol md="9">
       <div >
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Attractions</th>
                            
                            <th>City</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.data.map((Attractions,index) => {
            return(
                  <tr  >
                    <td>{Attractions.attr_Name}</td>
                    <td>{Attractions.city}</td>
                   

                    <td>
                      <Button  onClick={this.handleEdit} value={Attractions.aid} style={{margin : "4px", fontSize:"10px", backgroundColor:"#1885A1", width: "100px"}}>Edit</Button>
                    </td>
                    <td>
                  <Button style={{margin : "4px", fontSize:"10px", backgroundColor:"#1885A1", width: "100px"}} 
                  onClick= {this.handleDelete}
                  value={Attractions.aid}>Delete</Button>

                  
                  </td>
               
                  </tr>
            )}
            )}
                    </tbody>
                </table>
            </div>
            </MDBCol>
    </MDBRow>
     
    </MDBContainer>
    </Modal.Body>
    <Modal.Footer >
          
              <Button onClick={this.handleClose} style={{margin : "4px", fontSize:"10px", backgroundColor:"#1B5868", width: "100px"}}
                  >  Done </Button>
            </Modal.Footer>
         
    </Modal>

   
      </div>
      
          );
       
    }

    
    
}
 

export default CreatedAttractions;