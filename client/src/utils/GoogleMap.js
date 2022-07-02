import React, { useState, useEffect } from "react";
// Google map react
import GoogleMapReact from "google-map-react";
// Material ui
import HomeIcon from "@material-ui/icons/Home";

const AnyReactComponent = () => (
  <div>
    <HomeIcon fontSize="large" color="secondary" />
  </div>
);

const SimpleMap = ({ address }) => {
  const [longtitude, setLongtitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const API_KEY = "AIzaSyAR_O7jPWJ4PerXuIKr1ioZI-IzuTVNxNs";
  const defaultProps = {
    center: {
      lat: latitude,
      lng: longtitude,
    },
    zoom: 15,
  };

  // Get the coordinates from google api
  const getLocation = async () => {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}}&key=${API_KEY}`
    );
    const { results } = await res.json();
    console.log(results);
    if (results.length > 0) {
      const { lat, lng } = results[0].geometry.location;
      setLongtitude(Number(lng));
      setLatitude(Number(lat));
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "300px", width: "100%", marginTop: "50px" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: API_KEY, language: "iw" }}
        center={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        {latitude && longtitude && (
          <AnyReactComponent lat={latitude} lng={longtitude} />
        )}
      </GoogleMapReact>
    </div>
  );
};

export default SimpleMap;
