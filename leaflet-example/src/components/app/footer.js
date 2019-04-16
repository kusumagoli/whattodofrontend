import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter, MDBIcon, MDBBtn } from "mdbreact";

import Fb from 'react-ionicons/lib/LogoFacebook';
import Twitter from 'react-ionicons/lib/LogoTwitter';
import Google from 'react-ionicons/lib/LogoGoogle';
import Insta from 'react-ionicons/lib/LogoInstagram';


 let fa = {
    padding: '20px',
    fontSize: '30px',
    width: '80px',
    textAlign: 'center',
    textDecoration: 'none',
    margin: '5px 10px',
    borderRadius: '50%'
  }

  let fb = {
    background: '#3B5998',
    color: 'white'
  }

  let ft = {
    background: '#55ACEE',
    color: 'white'
  }
  let fg = {
    background: '#dd4b39',
    color: 'white'
}
let fi = {
    background: '#125688', 
    color : 'white'
}

  
const Footer = () => {
  return (
    <MDBFooter color="white" style = {{background :"black", height: "150px"}} className="fixed-bottom">
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="1"></MDBCol>
          <MDBCol md="8">
          <br></br>
            <h3 className="title" style={{color : "#E0E0E0"}}><b>Contact Info </b></h3>
            <p style={{color : "#E0E0E0"}}>
                Mobile Number : +91 9988776655 <br/>
                Email         : vibrantvibes@gmail.com
            </p>
          </MDBCol>
          <MDBCol md="3">
            <br></br>
            <MDBRow>
              <div style = {{...fa, ...fb}}><center><Fb fontSize="35px" color = "white"/></center></div>
              <div style = {{...fa, ...ft}}><Twitter fontSize="35px" color = "white"/></div>
              <div style = {{...fa, ...fg}}><Google fontSize="35px" color = "white"/></div>
              <div style = {{...fa, ...fi}}><Insta fontSize="35px" color = "white"/></div>

            </MDBRow>
          </MDBCol>
        </MDBRow>
        <center style={{color: "#E0E0E0"}}>
        &copy; {new Date().getFullYear()} Copyright: VibrantVibes.com
        </center>
      </MDBContainer>
    </MDBFooter>
  );
}

export default Footer;