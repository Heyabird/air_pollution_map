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
      
    // map.on('load', () => {
    //   console.log("loading")
    //   map.addSource('points', {
    //     'type': 'geojson',
    //       'data': {
    //       'type': 'FeatureCollection',
    //       'features': [
    //         {
    //           'type': 'Feature',
    //           'geometry': {
    //           'type': 'Point',
    //           'coordinates': [
    //             -117.228993, 32.866037
    //             ]
    //           },
    //           'properties': {
    //             'title': 'SD',
    //             'icon': 'harbor ',
    //             'description':
    //               '<p>San Diego</p>'
    //           }
    //         },
    //         {
    //           'type': 'Feature',
    //           'geometry': {
    //             'type': 'Point',
    //             'coordinates': [-122.414, 37.776]
    //             },
    //           'properties': {
    //             'title': 'SF',
    //             'icon': 'harbor',
    //             'description':
    //               '<p>San Francisco.</p>'
    //           }
    //         },
    //         {
    //           'type': 'Feature',
    //           'geometry': {
    //             'type': 'Point',
    //             'coordinates': [-118.2437, 34.0522]
    //             },
    //           'properties': {
    //             'title': 'LA',
    //             'icon': 'harbor',
    //             'description':
    //               '<p>Los Angeles</p>'
    //           }
    //         }
    //       ]
    //     }
    //   });
  
    //   map.addLayer({
    //     'id': 'points',
    //     'type': 'symbol',
    //     'source': 'points',
    //       'layout': {
    //       // get the icon name from the source's "icon" property
    //       // concatenate the name to get an icon from the style's sprite sheet
    //       'icon-image': ['concat', ['get', 'icon'], '-15'],
    //       'icon-size': 2,
    //       // get the title name from the source's "title" property
    //       'text-field': ['get', 'title'],
    //       'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
    //       'text-offset': [0, 0.6],
    //       'text-anchor': 'top'
    //       }
    //   });

    //   var popup = new mapboxgl.Popup({
    //     closeButton: false,
    //     closeOnClick: false
    //     });

    //   map.on('mouseenter', 'points', (e) => {
    //     var coordinates = e.features[0].geometry.coordinates.slice();
    //     var description = e.features[0].properties.description;

    //     map.getCanvas().style.cursor = 'pointer';
 
    //     var coordinates = e.features[0].geometry.coordinates.slice();
    //     var description = e.features[0].properties.description;

    //     // Ensure that if the map is zoomed out such that multiple
    //     // copies of the feature are visible, the popup appears
    //     // over the copy being pointed to.
    //     while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    //     coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    //     }
      
    //     popup
    //       .setLngLat(coordinates)
    //       .setHTML(description)
    //       .addTo(map)
    //       .setMaxWidth("400px")
    //   });

    //   map.on('mouseleave', 'points', function() {
    //     map.getCanvas().style.cursor = '';
    //     popup.remove();
    //     });
    // }) 
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