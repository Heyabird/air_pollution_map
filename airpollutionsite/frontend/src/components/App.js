import React from "react";
import { render } from "react-dom";
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import TimeSeriesChart from './timeSeriesChart';
import AverageTable from './averageTable';
import Button from '@material-ui/core/Button';

mapboxgl.accessToken = 'pk.eyJ1IjoiaGV5YWJpcmQiLCJhIjoiY2s5ZWl0c3M0MDJzdDNnbzE2dXB5bDRhdSJ9.bNbukgXKDz5ZbTc9gQ4-bQ';

const axios = require('axios');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    lng: -0,
    lat: 35,
    zoom: 1.5,
    city: "",
    };
    // this.mapSetUp = this.mapSetUp.bind(this);
    this.test = this.test.bind(this);
    this.updateChart = this.updateChart.bind(this);
    }
  
  // mapSetUp(){
  //   const map = new mapboxgl.Map({
  //     container: this.mapContainer,
  //     style: 'mapbox://styles/heyabird/ckaa8st6z07nr1ilousemiggu',
  //     center: [this.state.lng, this.state.lat],
  //     zoom: this.state.zoom
  //     });
  // }


  // testing if the frontend can receive air pollution data in the backend
  test() {
    var uri = 'http://localhost:8000/retrieveData'
    axios.get(uri)
    .then(response => {
      console.log("retrieving data: ", response.data)
    })
    .catch(function(err){
      console.log(err)
    })
  }

  updateChart() {
    console.log("updating chart!");
  }
  
  // Set map and pop up whenever the page loads
  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/heyabird/ckaa8st6z07nr1ilousemiggu',
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom
      });
      
    // activate pop up function
    map.on('click', (e) => {
      var features = map.queryRenderedFeatures(e.point, {
        layers: ['8-cities']
      });
      if (!features.length) {
        return;
      }
      var feature = features[0];
      var popup = new mapboxgl.Popup({ offset: [0, -15] })
        .setLngLat(feature.geometry.coordinates)
        .setHTML('<h3>' + feature.properties.place_name + '</h3>')
        .addTo(map);
      this.updateChart();
      this.setState({
        city: feature.properties.place_name
      });
    });
  }

  render() {   
    return (
      <>
        <div id="pagetitle">
          <h2>Air Pollution Today</h2>
        </div>
        <br/>
        {/* mapContainer ref specifies that map should be drawn to the HtML page in a new <div> element */}
        <div ref={el => this.mapContainer = el} className="mapContainer" /> 
        <br/>
        <div id="graphs">
          <TimeSeriesChart/>
          <AverageTable/>
        </div>
        <Button variant="contained" color="primary" onClick={this.test}>Test Button</Button>   
      </>
    );
  }
}

export default App;

// This has to stay in the bottom
const container = document.getElementById("app");
render(<App />, container);