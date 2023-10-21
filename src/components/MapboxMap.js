import React, { useState, useMemo, useContext, useEffect } from "react";
import Map, { Marker, NavigationControl, FullscreenControl} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

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
    zoom: 15,
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
          <CustomMarker details={shop} />
        </Marker>
      )),
    [coffeeShops]
  );

  console.log("rendering Mapbox Map");

  useEffect(() => {
    if (userLocation) {
      console.log("user loc changed")
      setViewport((prev) => ({
        ...prev,
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
      }));
    }
  }, [userLocation]);

  return (
    <div  style={{ paddingTop: "20px"}}>
      {userLocation ? (
        <>
          {loading ? (
            <div style={{display:"flex", justifyContent:"center", alignContent:"center"}}> <LoadingAnimation />: </div>
          ) : (
            <Map initialViewState={viewport} style={{ width: "100%", height: "60vh" }} mapStyle="mapbox://styles/mapbox/streets-v10" mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}>
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
    
   </div>
  );
};

export default MapboxMap;
