import React, {Component} from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import  'leaflet/dist/leaflet.css';
import {Form,Button, FormControl} from 'react-bootstrap';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});
const position = [17.440081, 78.348915];
class LeafletMap extends Component {
  constructor(props) {
    super(props);
    // this.handleLatChange = this.handleLatChange.bind(this);
    // this.handleLongChange = this.handleLongChange.bind(this);

    this.state = {
      lati:"",
      longi:"",
      latiVal:"",
      longiVal:"",
     
    };
  };


  
  handleClick = (e) => {
    this.props.setMarker({
      latitude: e.latlng.lat,
      longitude: e.latlng.lng 
    });
    this.setState({
    
      lati:e.latlng.lat,
      longi:e.latlng.lng,
  
    });
    console.log(this.state.lati);
    console.log(this.state.longi);
  };

  
  render() {
    return (
      <div >
         
        
        <Form className="form" >
          <div >
          <Form inline>
          <FormControl 
              readOnly
            type="text" 
            placeholder="Latitude" 
            className="mr-sm-2"
            value={this.state.lati} 
        
          />
          
          <FormControl 
          readOnly
            type="text" 
            placeholder="Longitude" 
            className="mr-sm-2"
            value={this.state.longi}  
           
          />
      <Map
        ref={this.mapRef}
        center={position} 
        zoom={13} 
        style={{ height: '500px', width: '100%' }}
        onClick={this.handleClick}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
            <Marker position={[parseFloat(this.props.marker.latitude), parseFloat(this.props.marker.longitude)]}>
              <Popup>latitude:{this.props.marker.latitude}<br />longitude:{this.props.marker.longitude}</Popup>
            </Marker>
      </Map>
      </Form>        
      </div>
      </Form>


      </div>
    );
  }
}

export default LeafletMap;