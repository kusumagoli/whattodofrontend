import React from 'react';
import ListItem from '@material-ui/core/ListItem';

import ams from './icons/amusement.png';
import adv from './icons/adventure.png';
import wc from './icons/workshops.png';
import cs from './icons/concert.png';
import food from './icons/food.png';
import pn from './icons/party_nightlife.png';
import hp from './icons/historicals.png';
import rs from './icons/religious.png';
import others from './icons/others.png';
import Button from '@material-ui/core/Button';
import './sidebarstyles.css';


class MainListItems extends React.Component
{
  constructor(props) {
    super(props);
    this.handleCategory = this.handleCategory.bind(this);
  }


  handleCategory(event) {
    console.log(event.currentTarget.value)
    localStorage.setItem("Category",event.currentTarget.value);
    window.location.reload(); 
 
  }

  render() {

    return (

      <div>

    <Button value="Amusement Parks" onClick = {this.handleCategory} style={{width: '230px'}}>
        <img src={ams}  className="icon"/>
        <i>Amusement <br></br>Parks</i>
    </Button>
<br/>
    <Button onClick = {this.handleCategory} value="Adventures and Sports" style={{width: '230px'}}>
      
      <img src={adv}  className="icon"/> 
      
      <i>Adventures <br></br>
        and Sports</i>
    </Button>
   
    <br/>
    <Button onClick = {this.handleCategory} value="Food" style={{width: '230px'}}>
      <img src={food}  className="icon" /> 
      <i>Food   </i>
    </Button>
    <br/>
    <Button onClick = {this.handleCategory} value="Nightlife" style={{width: '230px'}}>
      <img src={pn}  className="icon" /> 
      <i>Nightlife</i>
    </Button>
    <br/>
    <Button onClick = {this.handleCategory} value="Historic Places" style={{width: '230px'}}>
      <img src={hp}  className="icon"  /> 
      <i>Historic Places</i>
    </Button>
    <br/>
    <Button onClick = {this.handleCategory} value="Religious Sites" style={{width: '230px'}}>
      <img src={rs}  className="icon" />
      <i>Religious Sites</i>
    </Button>
    <br/>
    <Button onClick = {this.handleCategory} value="Others" style={{width: '230px'}}>
      <img src={others}  className="icon" /> 
      <i>Others</i>
    </Button>
    <br/>
  </div>

    )
  }


  
} 

export default MainListItems; 
  

