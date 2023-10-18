import React, { useState, useContext, useEffect } from "react";
import { Tab, Tabs, AppBar, Grid, Typography, Box } from "@mui/material";

import MapboxMap from "./components/MapboxMap";
import ListCards from './components/listCards';
import SearchBar from './components/searchBar';
import theme from "./theme";
// import coffeeShops from "./coffeeShops.json";

import { CoffeeShopContext } from './context/CoffeeShopContext';

function App() {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [isSearchActivated, setIsSearchActivated] = useState(null);
  const [selectedLatLng, setSelectedLatLng] = useState( JSON.parse(localStorage.getItem('selectedLatLng')));
  const { updateUserLocation } = useContext(CoffeeShopContext);
  
  const handlePlaceSelected = (latLng) => {
    setIsSearchActivated(true);
    setSelectedLatLng(latLng);
  };

  console.log("rendering")
  const handleChange = (event, newValue) => {
    setSelectedTabIndex(newValue);
  };

  useEffect(() => {
    // Attempt to get the user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setSelectedLatLng({ lat, lng });
          updateUserLocation({ latitude: lat, longitude: lng });
          setIsSearchActivated(true);
        },
        (error) => {
          console.log('Geolocation is not enabled. Will rely on search.', error);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }, []);


  useEffect(() => {
    if (selectedLatLng) {
      localStorage.setItem('selectedLatLng', JSON.stringify(selectedLatLng)); // Store the value in local storage whenever it changes
    }
  }, [selectedLatLng]);

  return (
    <div className="App">
      <Typography 
        variant="h3" 
        align="center" 
        sx={{
          fontFamily: "'Pacifico', cursive", 
          marginTop: theme.spacing(2), // 16px
            [theme.breakpoints.up('md')]: {marginTop: theme.spacing(4), // 32px
            },
            [theme.breakpoints.up('lg')]: {marginTop: theme.spacing(6), // 48px
            },
        }}>
        Coffee Shops in the Neighborhood
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: isSearchActivated ? 'auto' : 'calc(100vh - 64px)', // 64px to adjust for title height
          transition: 'top 1s ease-in-out',
          // transform: 'translate(-50%, -50%)',
          position: 'relative',
          // marginTop: '20px'
        }}
      >
      <div 
      style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          marginTop: '20px' }}>
        <SearchBar onPlaceSelected={handlePlaceSelected}/>
        <Typography variant="body1" sx={{ marginLeft: '16px', color: '#8B4513' }}>
          or enable your location
        </Typography>
      </div>
      {isSearchActivated && (
       <> 
      <div style={{ display: "flex",  justifyContent: 'center',marginTop: '20px', backgroundColor: '#FFFFFF'}}>
        <div style ={{display: 'inline-flex', backgroundColor: '#FFF8DC', borderRadius: 12,border: '2px solid #8B4513'}}>
          
          <AppBar position="static" sx={{ backgroundColor: "transparent", boxShadow: "none" }}>
          <Box sx={{ borderRadius: '8px', overflow: 'hidden' }}> {/* Container with overflow hidden */}
            <Tabs value={selectedTabIndex} onChange={handleChange}  TabIndicatorProps={{style: {backgroundColor: "transparent"}}}>
              <Tab label="Map" 
                    sx={{
                      backgroundColor: selectedTabIndex === 0 ?  '#8B4513':'#FFF8DC',
                      color: selectedTabIndex === 0 ? '#ffffff':'#8B4513',
                      '&.Mui-selected': {
                        color: '#ffffff',
                      }}} />
              <Tab label="List"
                    sx={{
                      backgroundColor: selectedTabIndex === 1 ?  '#8B4513':'#FFF8DC',
                      color: selectedTabIndex === 1 ? '#ffffff':'#8B4513',
                      '&.Mui-selected': {
                        color: '#ffffff',
                      }}}/>
            </Tabs>
            </Box>
          </AppBar>
        </div>
      </div>
      
      {/* Map View */}
      {selectedTabIndex === 0 &&
        <Grid container direction="column" spacing={2} alignItems="center" sx={{ minHeight: '100vh', marginTop:"20px" }}>
          <Grid item xs={12}>
            
            <MapboxMap/>
          </Grid>
        </Grid>
      }

      {/* List View */}
      {selectedTabIndex === 1 && <ListCards/>}
      </>
      )}
     </Box> 
    </div> 
  );
}

export default App;
