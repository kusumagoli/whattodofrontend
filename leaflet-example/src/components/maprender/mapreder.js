import React, {Component} from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import {myicon} from "./icon";
import {myicon2} from "./icon2"
import pin2 from "./../app/images/pin2.png";
import Button from '@material-ui/core/Button';


delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});
const position = [17.440081, 78.348915];
class MapRender extends Component {

  handleClick = (e) => {
    this.props.setMarker({
      latitude: e.latlng.lat,
      longitude: e.latlng.lng 
    });
  };

  componentDidMount() {

    {navigator.geolocation.getCurrentPosition(function(location) {
      console.log("my current latitude :",location.coords.latitude)
      console.log("my current longitude :",location.coords.longitude);
     sessionStorage.setItem("lat",location.coords.latitude)
     sessionStorage.setItem("long",location.coords.longitude)
     console.log("my current latitude :",sessionStorage.getItem("lat"))
      console.log("my current longitude :",sessionStorage.getItem("long"));

    })}
    
  }
  handleViewMore = (event)=> {


    let id=event.currentTarget.value
    console.log(id);
    let path= `/view/`;
    this.props.history.push({
      pathname: path,
      state: {
        id : id
      }
   }) 


    
    
  }

  
  render() {
    return (
      <Map
        ref={this.mapRef}
        center={position} 
        zoom={13} 
        style={{ height: '600px', width: '1800px' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
         
        />

      <Marker  style={{position:"fixed"}} icon={myicon} position={[parseFloat(sessionStorage.getItem("lat")), parseFloat(sessionStorage.getItem("long"))]}>
                                 <Popup>Your Current location.</Popup>
                                 </Marker>
        {


          this.props.data.map((data) => (
            <Marker position={[parseFloat(data.latitude), parseFloat(data.longitude)]}>
            <Popup>
            
              
            <b>{data.attr_Name}</b>
            <br/>
            {data.location}
            <Button size="small" color="primary" style={{float :"right", fontSize: "8px"}} onClick = {this.handleViewMore} value={data.aid}>
                        View...
            </Button>
            </Popup>
            </Marker>
          ))
        }
      </Map>
    );
  }
}

export default MapRender;