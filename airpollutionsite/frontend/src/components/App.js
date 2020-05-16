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
    // this.initialMapSetUp = this.initialMapSetUp.bind(this);
    }

  

  componentDidMount() {
    const map = new mapboxgl.Map({
    container: this.mapContainer,
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [this.state.lng, this.state.lat],
    zoom: this.state.zoom
    });
    var marker = new mapboxgl.Marker()
    .setLngLat([-117.228993, 32.866037])
    // .setPopup(popup)
    .addTo(map)

    map.on('load', () => {
      console.log("loading")
      map.addSource('points', {
        'type': 'geojson',
          'data': {
          'type': 'FeatureCollection',
          'features': [
            {
            // feature for mock Hotel Heya
              'type': 'Feature',
              'geometry': {
              'type': 'Point',
              'coordinates': [
                -117.228993, 32.866037
                ]
              },
              'properties': {
                'title': 'SD',
                'icon': 'music',
                'description':
                  '<p>San Diego</p>'
              }
            },
            {
            // feature for mock Hotel Bay
              'type': 'Feature',
              'geometry': {
                'type': 'Point',
                'coordinates': [-122.414, 37.776]
                },
              'properties': {
                'title': 'SF',
                'icon': 'harbor',
                'description':
                  '<p>San Francisco.</p>'
              }
            }
          ]
        }
      });
  
      map.addLayer({
        'id': 'points',
        'type': 'symbol',
        'source': 'points',
          'layout': {
          // get the icon name from the source's "icon" property
          // concatenate the name to get an icon from the style's sprite sheet
          'icon-image': ['concat', ['get', 'icon'], '-15'],
          'icon-size': 2,
          // get the title name from the source's "title" property
          'text-field': ['get', 'title'],
          'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
          'text-offset': [0, 0.6],
          'text-anchor': 'top'
          }
      });

      map.on('click', 'points', (e) => {
        var coordinates = e.features[0].geometry.coordinates.slice();
        var description = e.features[0].properties.description;
      
        new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(description)
          .addTo(map)
          .setMaxWidth("400px")
      });

    // create the popup
    // var popup = new mapboxgl.Popup({ offset: 25 }).setText(
      // 'Construction on the Washington Monument began in 1848.'
      // );
    // // create DOM element for the marker
    var el = document.createElement('div');
    el.id = 'marker';
    // this.initialMapSetUp;
    })  

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
      </>
    );
  }
}

export default App;

// This has to stay in the bottom
const container = document.getElementById("app");
render(<App />, container);