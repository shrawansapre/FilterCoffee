import React, { useState, useMemo, useContext, useEffect } from "react";
import Map, {
  Marker,
  NavigationControl,
  FullscreenControl,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import CustomMarker from "./customMarker";

import { CoffeeShopContext } from "../context/CoffeeShopContext";
import LoadingAnimation from "./loadingAnimation";
import ShopPopup from "./ShopPopup";

const MapboxMap = () => {
  // const [userLocation, setUserLocation] = useState(null);
  const { coffeeShops, loading, userLocation } = useContext(CoffeeShopContext);
  const [selectedShop, setSelectedShop] = useState(null);
  console.log("in component");
  console.log(userLocation);

  const [viewport, setViewport] = useState({
    latitude: userLocation.latitude,
    longitude: userLocation.longitude,
    zoom: 14,
  });

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

  return (
    <>
      {userLocation ? (
        <>
          {loading ? (
            <LoadingAnimation />
          ) : (
            <Map
              initialViewState={viewport}
              style={{ width: "80vw", height: "60vh" }}
              mapStyle="mapbox://styles/mapbox/streets-v10"
              mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            >
              <FullscreenControl position="top-left" />
              <NavigationControl position="top-left" />

              {/* User Marker */}
              <Marker
                longitude={userLocation.longitude}
                latitude={userLocation.latitude}
              />
              {/* Shop Markers */}
              {customMarkers}
              {/* Shop Popups */}
              {selectedShop && (
                <ShopPopup
                  selectedShop={selectedShop}
                  onClose={() => setSelectedShop(false)}
                />
              )}
            </Map>
          )}
        </>
      ) : (
        <LoadingAnimation />
      )}
    </>
  );
};

export default MapboxMap;

// const [viewport, setViewport] = useState({});
// useEffect(() => {
//   navigator.geolocation.getCurrentPosition((pos) => {
//     setViewport({
//       ...viewport,
//       latitude: pos.coords.latitude,
//       longitude: pos.coords.longitude,
//       zoom: 14,
//     });
//     console.log("in component");
//     updateUserLocation({ latitude:pos.coords.latitude, longitude: pos.coords.longitude})
//   });

// }, []);

// const handleGeolocation = (position) => {
//   const { latitude, longitude } = position.coords;
//   console.log(latitude, longitude)
//   updateUserLocation({ latitude, longitude });
// };

// import { convertToGeoJSON } from '../utils/geoUtils';

// These are just example layers. You can define their styles as you see fit.
// const clusterLayer = {
//   id: 'clusters',
//   type: 'circle',
//   filter: ['has', 'point_count'],
//   /* other styling options */
// };

// const clusterCountLayer = {
//   id: 'cluster-count',
//   type: 'symbol',
//   filter: ['has', 'point_count'],
//   /* other styling options */
// };

// const unclusteredPointLayer = {
//   id: 'unclustered-point',
//   type: 'circle',
//   filter: ['!', ['has', 'point_count']],
//   /* other styling options */
// };

// {
//   /* <Source
//           id="myData"
//           type="geojson"
//           data={geoJSONData}
//           cluster={true}
//           clusterMaxZoom={12} // Max zoom to cluster points on
//           clusterRadius={50} // Radius of each cluster when clustering points (defaults to 50)
//         >
//             { !showMarkers &&
//             <>
//           <Layer source="myData" {...clusterLayer} />
//           <Layer source ="myData" {...clusterCountLayer} />
//           <Layer source ="myData" {...unclusteredPointLayer} />
//           </>
//         }
//         </Source> */
// }

// {
//   /* { showMarkers &&  */
// }
