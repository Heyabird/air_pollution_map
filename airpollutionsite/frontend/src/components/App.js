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
    lng: 5,
    lat: 34,
    zoom: 2,

    };
    this.mapSetUp = this.mapSetUp.bind(this);
    this.test = this.test.bind(this);
    }
  
  mapSetUp(){
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/heyabird/ckaa8st6z07nr1ilousemiggu',
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom
      });
      
  }

  test() {
    var uri = 'http://localhost:8000/retrieveData'
    axios.get(uri)
    .then(response => {
      console.log("retreiving data: ", response.data)
    })
    .catch(function(err){
      console.log(err)
    })
  }
  
  
  componentDidMount() {
    this.mapSetUp(); 
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
        <TimeSeriesChart/>
        <AverageTable/>
        <Button onClick={this.test}>Test Button</Button>
        <Button variant="contained" color="primary">Primary</Button>      
        </>
    );
  }
}

export default App;

// This has to stay in the bottom
const container = document.getElementById("app");
render(<App />, container);