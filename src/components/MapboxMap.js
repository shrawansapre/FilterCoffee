import React, { useState, useMemo, useContext, useEffect } from "react";
import Map, { Marker, NavigationControl, FullscreenControl} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import {Grid} from "@mui/material";

import CustomMarker from "./customMarker";
import LoadingAnimation from "./loadingAnimation";
import ShopPopup from "./ShopPopup";

import { CoffeeShopContext } from "../context/CoffeeShopContext";


const MapboxMap = () => {
  const { coffeeShops, loading, userLocation } = useContext(CoffeeShopContext);
  const [selectedShop, setSelectedShop] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: userLocation.latitude,
    longitude: userLocation.longitude,
    zoom: 14,
  });

  const customMarkers = useMemo(
    () =>
      coffeeShops.map((shop, index) => (
        <Marker
         key={`marker-${index}`}
          latitude={shop.lat}
          longitude={shop.lng}
          anchor="bottom"
          onClick={(e) => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true
            e.originalEvent.stopPropagation();
            setSelectedShop(shop);
          }}
        >
          <CustomMarker />
        </Marker>
      )),
    [coffeeShops]
  );

  console.log("rendering Mapbox Map");

  useEffect(() => {
    if (userLocation) {
      console.log("user loc changed", userLocation)
      setViewport((prev) => ({
        ...prev,
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
      }));
    }
  }, [userLocation]);

  return (
    <Grid container direction="column" spacing={2} alignItems="center" sx={{ minHeight: '100vh', marginTop:"20px" }}>
      <Grid item xs={12}>
      {userLocation ? (
        <>
          {loading ? (
            <LoadingAnimation />
          ) : (
            <Map initialViewState={viewport} style={{ width: "80vw", height: "60vh" }} mapStyle="mapbox://styles/mapbox/streets-v10" mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}>
              <FullscreenControl position="top-left" />
              <NavigationControl position="top-left" />

              {/* User Marker */}
              <Marker longitude={userLocation.longitude} latitude={userLocation.latitude}/>
              {/* Shop Markers */}
              {customMarkers}
              {/* Shop Popups */}
              {selectedShop && <ShopPopup selectedShop={selectedShop} onClose={() => setSelectedShop(false)}/>}
            </Map>
          )}
        </>
      ) : (
        <LoadingAnimation />
      )}
     </Grid>
   </Grid>
  );
};

export default MapboxMap;
