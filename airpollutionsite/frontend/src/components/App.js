import React from "react";
import { render } from "react-dom";
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import TimeSeriesChart from './timeSeriesChart';
import AverageTable from './averageTable'

mapboxgl.accessToken = 'pk.eyJ1IjoiaGV5YWJpcmQiLCJhIjoiY2s5ZWl0c3M0MDJzdDNnbzE2dXB5bDRhdSJ9.bNbukgXKDz5ZbTc9gQ4-bQ';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    lng: 5,
    lat: 34,
    zoom: 2
    };
    }

  componentDidMount() {
    const map = new mapboxgl.Map({
    container: this.mapContainer,
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [this.state.lng, this.state.lat],
    zoom: this.state.zoom
    });
    }    

  render() {
    // mapboxgl.accessToken = 'MAPBOX_ACCESS_TOKEN';
    return (
      <>
        <div id="pagetitle">
          <h2>Air Pollution Today</h2>
        </div>
        <br/>
        {/* mapContainer ref specifies that map should be drawn to the HtML page in a new <div> element */}
        <div ref={el => this.mapContainer = el} className="mapContainer" /> 
        <br/>
        <TimeSeriesChart/>
        <AverageTable/>
      </>
    );
  }
}

export default App;

// This has to stay in the bottom
const container = document.getElementById("app");
render(<App />, container);