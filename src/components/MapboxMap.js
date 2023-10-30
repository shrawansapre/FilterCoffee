import React, { useState, useMemo, useContext, useEffect } from "react";
import Map, { Marker, NavigationControl, FullscreenControl} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import CustomMarker from "./customMarker";
import LoadingAnimation from "./loadingAnimation";
import ShopPopup from "./ShopPopup";

import { CoffeeShopContext } from "../context/CoffeeShopContext";


const MapboxMap = ({scrollToCard}) => {
  const { coffeeShops, loading, userLocation } = useContext(CoffeeShopContext);
  const [selectedShop, setSelectedShop] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: userLocation.latitude,
    longitude: userLocation.longitude,
    zoom: 15,
  });

  const customMarkers = useMemo(
    (setSelectedShopIndex) =>
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
            // const index = coffeeShops.findIndex(shop => shop.id === selectedShop.id);
            // setSelectedShopIndex(index);
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
    <div  style={{ width: "100%", height: "100%"}}>
      {userLocation ? (
        <>
          {loading ? (
            <div style={{display:"flex", justifyContent:"center", alignContent:"center"}}> <LoadingAnimation /> </div>
          ) : (
            <Map initialViewState={viewport} style={{ width: "100%", height: "100%"  }} mapStyle="mapbox://styles/mapbox/streets-v10" mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}>
              <FullscreenControl position="top-left" />
              <NavigationControl position="top-left" />

              {/* User Marker */}
              <Marker longitude={userLocation.longitude} latitude={userLocation.latitude}/>
              {/* Shop Markers */}
              {customMarkers}
              {/* Shop Popups */}
              {selectedShop && <ShopPopup selectedShop={selectedShop} onClose={() => setSelectedShop(false)} scrollToCard={scrollToCard} />}
            </Map>
          )}
        </>
      ) : (
        <div style={{display:"flex", justifyContent:"center", alignContent:"center"}}> <LoadingAnimation /> </div>
      )}
    
   </div>
  );
};

export default MapboxMap;
