import App from "./components/App";
import { render } from "react-dom";

// ReactDOM.render(<App />, document.getElementById('app'));

// constructor(props) {
//     super(props);
//     this.state = {
//     lng: 5,
//     lat: 34,
//     zoom: 2
//     };
//     }

// componentDidMount() {
//     const map = new mapboxgl.Map({
//     container: this.mapContainer,
//     style: 'mapbox://styles/mapbox/streets-v11',
//     center: [this.state.lng, this.state.lat],
//     zoom: this.state.zoom
//     });
//     }

//     render() {
//         return (
//         <div>
//         <div ref={el => this.mapContainer = el} />
//         </div>
//         )
//         }