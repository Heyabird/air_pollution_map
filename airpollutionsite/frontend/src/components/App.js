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
      cityData: {
        city: 'Los Angeles',
        chartData: [1,12,9,3,15,6,3,7,54,7,34,42,52,12,66,77,88,69,109],
        tableData: [
          ['March', 30, 44, 50],
          ['April', 10, 20, 30],
          ['May', 33, 22, 33]
        ],
      },
      externaldata: "",
      // mockAveragePM: [
      //   ['March', 30, 40, 50],
      //   ['April', 10, 20, 30],
      //   ['May', 33, 22, 33]
      // ],  
      lng: -0,
      lat: 35,
      zoom: 1.5,
      city: "__________",
    };
    // this.mapSetUp = this.mapSetUp.bind(this);
    this.getCityData = this.getCityData.bind(this);
    this.updateCityData = this.updateCityData.bind(this);
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
  getCityData(city) {
    let cityName;
    if(city === "Los Angeles, California, United States") {
      cityName = 'LA'
    } else if (city === "San Diego, California, United States") {
      cityName = 'SD'
    } else if (city === "New York, New York, United States") {
      cityName = 'NY'
    } else if (city === "San Francisco, California, United States") {
      cityName = 'SF'
    } else if (city === "New Delhi, Delhi, India") {
      cityName = 'ND'
    } else if (city === "Beijing Shi, China") {
      cityName = 'BJ'
    } else if (city === "Houston, Texas, United States") {
      cityName = 'HO'
    }else if (city==="Chicago, Illinois, United States") {
      cityName = 'CH'
    }
    console.log(cityName, "is chosen!")
    var uri = `http://localhost:8000/retrieveData${cityName}`
    axios.get(uri)
    .then(response => {
      console.log("retrieving data: ", response.data)
      this.setState({externalData: response.data})
    })
    .catch(function(err){
      console.log(err)
    })
  }

  updateCityData () {
    console.log("updating city data!");
    this.setState({
      cityData: {
        city: this.state.city,
        chartData: [3,32,9,4,15,6,3,7,54,7,34,45,22,2,3,2,1,1,2],
        tableData: [
          ['March', 10, 20, 10],
          ['April', 10, 20, 10],
          ['May', 33, 22, 43]
        ],
      },
    })
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
      console.log("testing")
      this.getCityData(feature.properties.place_name);
      this.updateCityData();
      // this.test(feature.properties.place_name);
      this.setState({
        city: feature.properties.place_name,
        // cityData:
      });
    });
  }

  render() {   
    // destructuring states
    const { city, cityData } = this.state;
    return (
      <>
        <div id="pagetitle">
          <h2>I want to see the PM2.5 Values in <span style={{color: "red"}}>{city}</span>.</h2>
          <h4><strong>To choose a city, click on one of the red markers in the map.</strong></h4>
        </div>
        <br/>
        {/* mapContainer ref specifies that map should be drawn to the HtML page in a new <div> element */}
        <div ref={el => this.mapContainer = el} className="mapContainer" /> 
        <br/>
        <div id="graphs">
          <TimeSeriesChart 
            city={city}
            cityData={cityData}/>
          <AverageTable 
            city={city}
            // averagePM={mockAveragePM}
            cityData={cityData}
            />
        </div>
        {/* <Button variant="contained" color="primary" onClick={this.getCityData}>Test Button</Button>    */}
      </>
    );
  }
}

export default App;

// This has to stay in the bottom
const container = document.getElementById("app");
render(<App />, container);