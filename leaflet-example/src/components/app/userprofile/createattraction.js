import React from 'react';
import {MDBInput} from "mdbreact";
import {Modal} from "react-bootstrap";

import Map from "./../../map";
import Button from '@material-ui/core/Button';
import Header from "./../headers/index";
import Att from "react-ionicons/lib/IosBonfire";
import Pin from "react-ionicons/lib/MdPin";
import Category from "react-ionicons/lib/IosSwitch";
import Descp from "react-ionicons/lib/MdInformationCircle";
import Locate from "react-ionicons/lib/IosLocateOutline";
import Fare from "react-ionicons/lib/MdCash";
import Time1 from "react-ionicons/lib/IosTimeOutline";
import Time2 from "react-ionicons/lib/IosTime";
import Rating from "react-ionicons/lib/MdHeart";
import Onmap from "react-ionicons/lib/IosLocateOutline";
import Image from "react-ionicons/lib/MdImages";

import styles from './rating.css'

var body;
let fields1;
class CreateAttraction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        attr_Name : "",
        city : "",
        category : "",
        description: "",
        location : "",
        from_Timings : "",
        upto_Timings : "",
        fare : "",
        rating : "",
        imageUrls:[],
        
  
      },
    
      fields:{},
      errors: {},
      file: '',
      imagePreviewUrl: '',
      result:'',
      img:[],
      latitude: "",
      longitude: "",
    };
      this.handleChange = this.handleChange.bind(this);
      this.handlelatLongValues = this.handlelatLongValues.bind(this);
      this.submitForm = this.submitForm.bind(this);
      this._handleSubmit = this._handleSubmit.bind(this);
      
      this._handleImageChange = this._handleImageChange.bind(this);

      this.handleShow = this.handleShow.bind(this);
      this.handleClose = this.handleClose.bind(this);
   
    }
    _handleSubmit(e) {
     // e.preventDefault();
     console.log('.......'+this.state.form.imageUrls)
     body = {
      imageUrls:this.state.form.imageUrls,
     }
     console.log(body);
      console.log('handle uploading-', this.state.file);
      const url = "http://localhost:9000/images"; 
      const formdata=new FormData()
        formdata.append("file",this.state.file);
        
      let headers = new Headers();
  
          formdata.append("file",this.state.file);
  
          headers.append('Content-Type', 'multipart/form-data');
          headers.append('Accept', 'application/json');
      
          headers.append('Access-Control-Allow-Origin', url);
          headers.append('Access-Control-Allow-Credentials', 'true');
      
          headers.append('GET', 'POST');
          
          e.preventDefault();
          
          fetch(url, {
            headers: headers,
            method: 'POST',
            withCredentials:true,
            credentials:'include',
            headers:{
              'Access-Control-Allow-Origin': url
            },
            body: formdata
          })               
          .then(r=> {r.json()
            .then(response=>{console.log(response)
               this.setState ({
                 result: JSON.stringify(response.image_url)
               })
               console.log("result image:"+this.state.result.replace('\"','',))
               this.setState ({
                 result: this.state.result.replace('\"','',)
               })
               console.log("result image:"+this.state.result.replace('\"','',))
               this.setState ({
                 result: this.state.result.replace('\"','',)
               })
               if(r.status==200){
                 console.log("success")
                 this.setState(
                   {
                     img:this.state.img.concat(this.state.result)
                   })
                   console.log("img in state appending "+this.state.img)
               }
              
            })
           })
         .catch(() => console.log("Can’t access " + url + " response. "))
         alert("Image Uploaded");
        
     }
    _handleImageChange(e) {
      e.preventDefault();
  
      let reader = new FileReader();
      let file = e.target.files[0];
  
      reader.onloadend = () => {
        this.setState({
          file: file,
          imagePreviewUrl: reader.result
        });
      }
  
      reader.readAsDataURL(file)
    }
  handleChange(e) {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({
      fields
    });

  }

  handlelatLongValues(lat, long) {
    console.log("Hey" + lat);
    console.log(long);
    this.setState({
      latitude : lat,
      longitude: long,
    })

  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  //history = createHistory(this.props);


  submitForm(e) {
    let res;
    e.preventDefault();
    if (this.validateForm()) {
      let fields = {};
      fields["attr_Name"] = "";
      fields["city"] = "";
      fields["category"] = ""; 
      fields["description"] = ""; 
      fields["location"] = ""; 
      fields["from_Timings"] = "";
      fields["upto_Timings"] = "";
      fields["fare"] = "";
      fields["rating"]="";
      fields["imageUrls"]=[];
      this.setState({fields:fields});
      let store = this.state;
      store.form.name = this.state.fields["attr_Name"];
      store.form.location = this.state.fields["city"];
      store.form.category = this.state.fields["category"];
      console.log("HEyya" + store.form.category)
      store.form.price = this.state.fields["description"];
      store.form.price = this.state.fields["location"];
      store.form.price = this.state.fields["from_Timings"];
      store.form.price = this.state.fields["upto_Timings"];
      store.form.rating = this.state.fields["fare"];
      store.form.rating = this.state.fields["rating"];
     console.log('img........'+this.state.img);
      store.form.imageUrls=this.state.img;
     
     // console.log(imageUrls);
      this.setState(store);
      console.log("Form name"+this.state.form.attr_Name);
      console.log("Form location"+this.state.form.city);
      console.log("Form price"+this.state.form.category);
      console.log("Form ranking"+this.state.form.location);
      console.log("Form category"+this.state.form.description);
      console.log("Form imgurl"+this.state.form.imageUrls);
    
    let token = localStorage.getItem("AccessToken");
    const url = "http://localhost:9000/attractions";
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
      attr_Name: this.state.fields.attr_Name,
      city: this.state.fields.city,
      category: this.state.fields.category,
      description : this.state.fields.description,
      location: this.state.fields.location,
      from_Timings: this.state.fields.from_Timings,
      upto_Timings: this.state.fields.upto_Timings,
      fare: this.state.fields.fare,
      rating: this.state.fields.rating,
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      imageUrls:this.state.form.imageUrls,
     
    }
   
    console.log(body);
    console.log(token);
    e.preventDefault();
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
    
  .then(console.log(this.state.fields))
 .catch(() => console.log("Can’t access " + url + " response. "))
          alert("Form submitted");
          this.props.history.push('/profile')
  }
      }
      validateForm() {

        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
    
        if (!fields["attr_Name"]) {
          formIsValid = false;
          errors["attr_Name"] = "*Please enter your attraction Name";
        }
        if (!fields["city"]) {
          formIsValid = false;
          errors["city"] = "*Please enter the city";
        }
        if (!fields["category"]) {
          formIsValid = false;
          errors["category"] = "*Please enter the category";
        }
        if (!fields["description"]) {
          formIsValid = false;
          errors["description"] = "*Please enter description";
        }
        if (!fields["location"]) {
          formIsValid = false;
          errors["location"] = "*Please enter location";
        }
        if (!fields["from_Timings"]) {
          formIsValid = false;
          errors["from_Timings"] = "*Please enter from Timings";
        }
        if (!fields["upto_Timings"]) {
          formIsValid = false;
          errors["upto_Timings"] = "*Please enter upto Timings";
        }
        if (!fields["fare"]) {
          formIsValid = false;
          errors["fare"] = "*Please enter fare";
        }
        if (!fields["rating"]) {
          formIsValid = false;
          errors["rating"] = "*Please enter rating";
        }
        this.setState({
          errors: errors
        });
        return formIsValid;
      }
  

  render() {
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img style={{width:"20%",height:"20%"}} src={imagePreviewUrl} />);
    } else {
      $imagePreview = (<div className="previewText"><b>Please select an Image for Preview</b></div>);
    }
const { form} = this.state;
    return (
      <div>
        
      
      <div style={{backgroundImage: "url(" + "https://www.wisc-online.com/assetrepository/getfile?id=1510&getType=view&width=0&height=0" + ")",
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      
       }}>
       <Header history={this.props.history}/>
     <br/><br/><br/>
      <div class ="container" style={{paddingBottom : "350px"}}>
      <div class="card">
        <div class="card-body px-lg-6 pt-0" >
        <h3 className="my-3"><center><b>ADD ATTRACTION </b></center></h3>
        <form method="post"  name="form"  onSubmit= {this.submitForm} >
        
   <div class="md-form">
  
   <label for="inputIconEx1"><Att/>&nbsp;<b>Attraction name</b></label>
   <input type="text" id="inputIconEx1" class="form-control" name="attr_Name" placeholder="Enter Attraction name"  value={this.state.fields.attr_Name} onChange={this.handleChange} />
   <div style={{ fontSize: 12, color: "red" }}>{this.state.errors.attr_Name}</div>
  </div>
  <br/> 
   <div class="md-form">
   <label> <Pin/>&nbsp;<b>City</b></label>
   <select id="inputState" class="form-control" name="city" value={this.state.city} onChange={this.handleChange} >
      <option>Choose City</option>
          <option value="Hyderabad">Hyderabad</option>
          <option value="Banglore">Banglore</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Others">Others</option>
         </select>
  </div>
  <br/>
  <div class="md-form">
  <Category/>&nbsp;
		  <label><b>Category</b></label>
		  <select id="inputState" class="form-control" name="category" value={this.state.category} onChange={this.handleChange} >
      <option>Choose Attraction Category</option>
          <option value="Amusement Parks">Amusement Parks</option>
          <option value="Adventures and Sports">Adventures and Sports</option>
          <option value="Food">Food</option>
          <option value="Nightlife">Nightlife</option>
          <option value="Religious Sites">Religious Sites</option>
          <option value="Historic Places">Historic Places</option>
          <option value="Others">Others</option>
         </select>
		</div>
    <br/>
  <div class="md-form">
  <Descp/>&nbsp;
   <label for="inputIconEx2"><b>Description</b></label>
   <textarea id="inputIconEx2" class="form-control" rows="3" name="description" placeholder="Enter description"  value={this.state.fields.description} onChange={this.handleChange} />
   <div style={{ fontSize: 12, color: "red" }}>{this.state.errors.description}</div>
  </div><br/>
  <div class="md-form">
  <Locate/>&nbsp;
   <label for="inputIconEx2"><b>Location</b></label>
   <textarea id="inputIconEx2" class="form-control" name="location" placeholder="Enter location"  value={this.state.fields.location} onChange={this.handleChange} />
   <div style={{ fontSize: 12, color: "red" }}>{this.state.errors.location}</div>
  </div><br/>
   <div class="md-form">
   <Time1/>&nbsp;
   <label for="inputIconEx3"><b>From Timings</b></label>
   <input type="time" id="example-time-input" class="form-control" name="from_Timings" placeholder="Enter from Timings"  value={this.state.fields.from_Timings} onChange={this.handleChange} />
   <div style={{ fontSize: 12, color: "red" }}>{this.state.errors.from_Timings}</div>
   </div><br/>
   <div class="md-form">
   <Time2/>&nbsp;
   <label for="inputIconEx4"><b>Upto Timings</b></label>
   <input type="time" id="example-time-input"  class="form-control" name="upto_Timings" placeholder="Enter Upto Timings"  value={this.state.fields.upto_Timings} onChange={this.handleChange} />
   <div style={{ fontSize: 12, color: "red" }}>{this.state.errors.from_Timings}</div>
   </div><br/>
  
   <div class="md-form">
   <Fare/>&nbsp;
   <label for="inputIconEx2"><b>Fare</b></label>
   <input type="number" id="example-number-input" class="form-control" name="fare" placeholder="Enter fare"  value={this.state.fields.fare} onChange={this.handleChange} />
   <div style={{ fontSize: 12, color: "red" }}>{this.state.errors.fare}</div>
  </div><br/>
  <div class="md-form">

<fieldset className="rating" onChange={this.handleChange}>
       
       <b>Rate It:</b><br></br>
       <input type="radio" id="star5" name="rating" value="5" /><label for="star5" title="Rocks!">5 stars</label>
       <input type="radio" id="star4" name="rating" value="4" /><label for="star4" title="Pretty good">4 stars</label>
       <input type="radio" id="star3" name="rating" value="3" /><label for="star3" title="Meh">3 stars</label>
       <input type="radio" id="star2" name="rating" value="2" /><label for="star2" title="Kinda bad">2 stars</label>
       <input type="radio" id="star1" name="rating" value="1" /><label for="star1" title="Sucks big time">1 star</label>
      
</fieldset>
  </div>
  <br/>
  <br/>
  <br/>
  <br/>
  <p><Onmap/>&nbsp;<b>Locate on Map</b></p>
  <Map latLongValues={ this.handlelatLongValues}/>
   
   <div class="md-form"><br/>
   <Image/>&nbsp;<label for="inputIconEx5"><b>Upload image</b></label><br/>
   <input className="fileInput" type="file" name="imageUrls" onChange={(e)=>this._handleImageChange(e)} /><br></br>
                <div className="imgPreview" ><br></br>
                  {$imagePreview  }
                </div><br></br>
               <button className="submitButton" type="submit" onClick={(e)=>this._handleSubmit(e)}>Upload Image</button><br></br>
</div>
   
   <button class="btn btn-info btn-block my-4"  type="submit">Submit</button>   
   </form>
   </div>
   </div>
   </div>
  
      </div>
      </div>
      );
    }
  }
  export default CreateAttraction;