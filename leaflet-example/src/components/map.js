import React, { PureComponent } from 'react';
import './../App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'leaflet/dist/leaflet.css';

import LeafletMap from './map/index';


class Maps extends PureComponent {
  state = {
    marker: {latitude: 0, longitude: 0},
  };

  setMarker = ({latitude, longitude}) => {
    this.setState({
      marker: {
        latitude,
        longitude 
      }
    })
    this.props.latLongValues(latitude, longitude)
  }

  render() {
    console.log(this.state)
    return (
      <div className="App"style={{textAlign: "left"}}>
        <LeafletMap marker={this.state.marker} setMarker={this.setMarker} />
      </div>
    );
  }
}

export default Maps;