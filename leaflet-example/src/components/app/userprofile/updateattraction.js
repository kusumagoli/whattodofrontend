import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput
} from "mdbreact";
import {Button} from "react-bootstrap";
import Header from "../headers";

import Att from "react-ionicons/lib/IosBonfire";
import Pin from "react-ionicons/lib/MdPin";
import Category from "react-ionicons/lib/IosSwitch";
import Descp from "react-ionicons/lib/MdInformationCircle";
import Locate from "react-ionicons/lib/IosLocateOutline";
import Fare from "react-ionicons/lib/MdCash";
import Time1 from "react-ionicons/lib/IosTimeOutline";
import Time2 from "react-ionicons/lib/IosTime";

var body;

class UpdateAttractions extends React.Component{

  constructor(props) {
    super(props);

    this.state =
    {
      attr_Name : "",
      city : "",
      category : "",
      description: "",
      location : "",
      from_Timings : "",
      upto_Timings : "",
      fare : "",
      star : 0,

    }

    this.handleAttractionChange = this.handleAttractionChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleUptoChange = this.handleUptoChange.bind(this);
    this.handleFareChange = this.handleFareChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.onUpdateClick = this.onUpdateClick.bind(this);  
    this.handleClick = this.handleClick.bind(this);  
  }

  onUpdateClick(event) {

    let aid= this.props.location.state.aid;

    body = {
      aid: aid,
      attr_Name: this.state.attr_Name,
      city: this.state.city,
      category: this.state.category,
      description : this.state.description,
      location: this.state.location,
      from_Timings: this.state.from_Timings,
      upto_Timings: this.state.upto_Timings,
      fare: this.state.fare,
      rating: this.state.star,

    }
    console.log(body)
    
    const url = "http://localhost:9000/attractions/edit";
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
      this.props.history.push('/profile')
                      
 })
 .catch(()=> console.log("can't access" + url + "response. "))

 
  }

  componentDidMount(event) {

    let aid= this.props.location.state.aid;

    body = { aid : aid}
    console.log(body.aid)
   
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
      .then(contents => { console.log("In fetch: "+ JSON.stringify(contents));
                          this.setState({
                            attr_Name : contents.attr_Name,
                            city : contents.city,
                            category : contents.category,
                            description: contents.description,
                            location : contents.location,
                            from_Timings : contents.from_Timings,
                            upto_Timings : contents.upto_Timings,
                            fare : contents.fare,
                            star : contents.rating,
                            imgurls: contents.imgurls,
                          })
                          console.log("response:"+ contents.username)
                          console.log('test1 '+this.state)
                          
                              
   })
   .catch(()=> console.log("can't access" + url + "response. "))
   
    }


  handleAttractionChange (event) {
    this.setState({attr_Name: event.target.value});
  }

  handleCityChange (event) {
    this.setState({city: event.target.value});
  }

  handleCategoryChange(event) {
    this.setState({ category: event.target.value})
  }

  handleDescriptionChange(event) {
    this.setState({ description: event.target.value})
  }

  handleLocationChange(event) {
    this.setState({ location: event.target.value})
  }

  handleFromChange(event) {
    this.setState({ from_Timings: event.target.value})
  }

  handleUptoChange(event) {
    this.setState({ upto_Timings: event.target.value})
  }

  handleFareChange(event) {
    this.setState({ fare: event.target.value})
  }

  handleClick(event){    
    this.setState({star:event.target.value});
    
  }  

    getPickerValue = value => {
        console.log(value);
      };
      
    
    render(){
        return (
          
            <div 
            style={{backgroundImage: "url(" + "https://www.wisc-online.com/assetrepository/getfile?id=1510&getType=view&width=0&height=0" + ")",
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
           
            }}>
            <Header history={this.props.history}></Header>

            <div className="container" style={{paddingBottom:"200px"}}>
       <MDBContainer>
      <MDBRow>
      <br></br><br></br>
      <div className="card" >
        <div class="card-body px-lg-9 pt-0" style={{width:"800px"}}>
        
          <form>
            <br></br>
            <p className="h3 text-center mb-4"><b>UPDATE ATTRACTION</b></p>
            <div className="grey-text">
            <Att/>
            <MDBInput
                label="Attraction Name"
                icon="adn"
                group
                type="text"
                validate
                error="wrong"
                success="right"
                disabled
                value = {this.state.attr_Name}
                onChange = {this.handleAttractionChange}
              />
              <Pin/>
              <MDBInput
                label="City"
                placeholder="Enter the city"
                icon="map-marker"
                group
                type="text"
                validate
                error="wrong"
                success="right"
                disabled
                value = {this.state.city}
                onChange = {this.handleCityChange}
              />

              <Category/>
              <select className="browser-default custom-select"
              value = {this.state.category}
              onChange = {this.handleCategoryChange}>
          <option>Choose Attraction Category</option>
          <option value="amusement parks">Amusement Parks</option>
          <option value="adventures">Adventures and Sports</option>
          <option value="workshops">Workshops and Classes</option>
          <option value="concerts">Concerts and Shows</option>
          <option value="food">Food</option>
          <option value="parties">Parties and Nightlife</option>
          <option value="religious sites">Religious Sites</option>
          <option value="historic places">Historic Places</option>
          <option value="others">Others</option>
         </select>
        <br/>
        <br/>
              <Descp/>
              <MDBInput
                type="textarea"
                rows="2"
                label="Description"
                icon="edit"
                value = {this.state.description}
                onChange = {this.handleDescriptionChange}
              />

            <Locate/>
              <MDBInput
                label="Location"
                icon="globe"
                type="textarea"
                rows="2"
                value = {this.state.location}
                onChange = {this.handleLocationChange}
                />

            <Time1/>
              <MDBInput
                label="From-Timings"
                group
                type="time"
                validate
                error="wrong"
                success="right"
                value = {this.state.from_Timings}
                onChange = {this.handleFromChange}
              />

            <Time2/>
              <MDBInput
                label="Upto-Timing"
                group
                type="time"
                validate
                error="wrong"
                success="right"
                value = {this.state.upto_Timings}
                onChange = {this.handleUptoChange}
              />

            <Fare/>
            <MDBInput
                label="Fare"
                icon="money"
                group
                type="number"
                validate
                error="wrong"
                success="right"
                value = {this.state.fare}
                onChange = {this.handleFareChange}
              />

              <div>
              <div>

<fieldset className="rating" onChange={this.handleClick}>
       
       <b>Rating:</b><br></br>
       <input type="radio" id="star5" name="rating" value="5" /><label for="star5" title="Rocks!">5 stars</label>
       <input type="radio" id="star4" name="rating" value="4" /><label for="star4" title="Pretty good">4 stars</label>
       <input type="radio" id="star3" name="rating" value="3" /><label for="star3" title="Meh">3 stars</label>
       <input type="radio" id="star2" name="rating" value="2" /><label for="star2" title="Kinda bad">2 stars</label>
       <input type="radio" id="star1" name="rating" value="1" /><label for="star1" title="Sucks big time">1 star</label>
      
</fieldset>

      </div>

                </div>         <br/> <br/>    
      </div>
      <br/> <br/>
      <Button onClick={this.onUpdateClick} style={{ fontSize:"15px", backgroundColor:"#237489", width: "200px", float: "right" }}>  <b>Update Attraction </b></Button>
    </form>
    
    </div>
    </div>
    </MDBRow>
    </MDBContainer>
    </div>
      </div>
          );
    }
    
    
}
 

export default UpdateAttractions;