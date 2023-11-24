import React, { useState, useMemo, useContext, useEffect, useRef } from "react";
import Map, { Marker, NavigationControl, FullscreenControl} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import CustomMarker from "./customMarker";
import LoadingAnimation from "./loadingAnimation";
import ShopPopup from "./ShopPopup";

import { Button } from "@mui/material";
import { CoffeeShopContext } from "../context/CoffeeShopContext";


const MapboxMap = ({scrollToCard}) => {
  const { coffeeShops, loading, userLocation, updateUserLocation } = useContext(CoffeeShopContext);
  const [selectedShop, setSelectedShop] = useState(null);
  const [viewState, setViewState] = useState({
    latitude: userLocation.latitude,
    longitude: userLocation.longitude,
    zoom: 15,
  });

  const [userMoved, setUserMoved] = useState(false);
  const moveTimeout = useRef(null); 

  const customMarkers = useMemo(() => {
      if (loading) {
        return <div style={{display:"flex", justifyContent:"center", alignContent:"center"}}> <LoadingAnimation /> </div>;
       }
    
      return coffeeShops.map((shop, index) => (
        <Marker key={`marker-${index}`} latitude={shop.lat} longitude={shop.lng} anchor="bottom"
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            setSelectedShop(shop);
          }}
        >
          <CustomMarker details={shop} />
        </Marker>
      ));
    
        },[coffeeShops, loading]
    );

  console.log("rendering Mapbox Map");

  const onMove = (evt) => {
    console.log("usermove")
    if (moveTimeout.current) {
      clearTimeout(moveTimeout.current);
    }
    moveTimeout.current = setTimeout(() => {
      setUserMoved(true); // Set state to show button after a delay
    }, 500);
    setViewState(evt.viewState)
  };

  useEffect(() => {
    if (userLocation) {
      console.log("user loc changed")
      setViewState({
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        zoom: 15
      });
    }
  }, [userLocation]);

  return (
    <div  style={{ width: "100%", height: "100%"}}>
      {userLocation ? (
        <>
        
            <Map reuseMaps {...viewState} style={{ width: "100%", height: "100%"  }} mapStyle="mapbox://styles/mapbox/streets-v10" mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN} onMove={onMove}>
              <FullscreenControl position="top-left" />
              <NavigationControl position="top-left" />

              {/* User Marker */}
              <Marker longitude={userLocation.longitude} latitude={userLocation.latitude}/>
              {/* Shop Markers */}
              {customMarkers}
              {/* in-map Search */}
              {userMoved && (
                 <div style={{ position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)', zIndex: 9999 }}>
                  <Button 
                    variant="contained" 
                    sx={{
                      borderRadius: '12px',
                      padding: '5px 15px',
                      fontSize: '1rem',
                      textTransform: 'none',
                      backgroundColor: "#f4f1ea",
                      color: "#8B4513",
                      '&:hover': {
                        backgroundColor: "#8B4513",
                        color: "#f4f1ea",
                      },
                    }}
                    onClick={() => {
                      updateUserLocation({latitude: viewState.latitude, longitude: viewState.longitude});
                      setUserMoved(false);
                    }}
                  >
                    Search in this area
                  </Button>
                </div>
              )}

              {/* Shop Popups */}
              {selectedShop && <ShopPopup selectedShop={selectedShop} onClose={() => setSelectedShop(false)} scrollToCard={scrollToCard} />}
            </Map>
        
        </>
      ) : (
        <div style={{display:"flex", justifyContent:"center", alignContent:"center"}}> <LoadingAnimation /> </div>
      )}
    
   </div>
  );
};

export default MapboxMap;
