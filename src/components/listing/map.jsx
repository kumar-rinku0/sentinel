import { useRef, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'
import "./listing.css"

import 'mapbox-gl/dist/mapbox-gl.css';

const Map = ({ accessToken, coordinates, location }) => {
  const mapRef = useRef()
  const mapContainerRef = useRef()

  useEffect(() => {
    console.log(accessToken);
    mapboxgl.accessToken = accessToken;
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: coordinates,
      zoom: 12, // starting zoom
      style: "mapbox://styles/mapbox/streets-v12",
      attributionControl: false,
    });

    const marker1 = new mapboxgl.Marker({ color: 'red' })
      .setLngLat(coordinates)
      .addTo(mapRef.current);

    mapRef.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
      })
    );

    mapRef.current.addControl(
      new mapboxgl.AttributionControl({
        customAttribution: "Map design by Rinku Kumar!",
      })
    );

    // const popup = new mapboxgl.Popup({
    //   className: "map-popup",
    //   closeButton: true,
    //   closeOnClick: true,
    //   closeOnMove: true,
    // })
    //   .setLngLat(coordinates)
    //   .setHTML(`${location}`)
    //   .addTo(mapRef.current);

    return () => {
      mapRef.current.remove()
    }
  }, [])

  // mapboxgl.accessToken = accessToken;
  // const newCoordinates = coordinates.split(",");
  // const map = new mapboxgl.Map({
  //   container: "map", // container ID
  //   center: coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90

  // }).addControl(

  // );


  return (
    <div id='map-container' ref={mapContainerRef} />
  )
}

export default Map;




// import './App.css'

// function App() {





//   return (
//     <>
//       <div id='map-container' ref={mapContainerRef}/>
//     </>
//   )
// }

// export default App