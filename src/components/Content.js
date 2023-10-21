import React, { useState, useEffect, useContext } from "react";
import { Tab, Tabs, AppBar, Typography, Box, Grid } from "@mui/material";

import MapboxMap from "./MapboxMap";
import ListCards from './listCards';
import SearchBar from './searchBar';

import { CoffeeShopContext } from "../context/CoffeeShopContext";

const Content = () => {
    console.log("rendering Content")
    const [isSearchActivated, setIsSearchActivated] = useState(null);
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);
    const [selectedLatLng, setSelectedLatLng] = useState(null);
    const { updateUserLocation } = useContext(CoffeeShopContext);
    // const [userLocMessage, setUserLocMessage] = useState(null)

    const handlePlaceSelected = (latLng) => {
        setIsSearchActivated(true);
        // setUserLocMessage(null)
        setSelectedLatLng(latLng);
    };
    
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
                    console.log(error)
                    console.log('Location is not enabled.')
                // setUserLocMessage('Location is not enabled. Please try search.')
                }
            );
        } else {
            console.log('GeoLocation is not supported by this browser. Please try search.')
            // setUserLocMessage('GeoLocation is not supported by this browser. Please try search.')
        }
    }, []);
    
    useEffect(() => {
        if (selectedLatLng) {
            typeof window !== 'undefined' && localStorage.setItem('LatLng', JSON.stringify(selectedLatLng)); // Store the value in local storage whenever it changes
        }
    }, [selectedLatLng]);

    return (
    <> 
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: isSearchActivated ? 'auto' : 'calc(100vh - 64px)', transition: 'top 1s ease-in-out', position: 'relative'}}>
        <Grid container justifyContent="center" sx={{textAlign:"center"}}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
                <Typography variant="body1" sx={{ color: '#8B4513',  fontSize: {xs: '0.75rem',sm: '0.875rem',md: '1rem'}}}>Enable your location or</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
                <SearchBar onPlaceSelected={handlePlaceSelected}/>
            </Grid>
        </Grid>
    </Box> 

    {isSearchActivated && (
    <> 
        <div style={{ display: "flex",  justifyContent: 'center',marginTop: '20px', backgroundColor: '#FFFFFF'}}>
            <div style ={{display: 'inline-flex', backgroundColor: '#FFF8DC', borderRadius: 12,border: '2px solid #8B4513'}}>
                <AppBar position="static" sx={{ backgroundColor: "transparent", boxShadow: "none" }}>
                    <Box sx={{ borderRadius: '8px', overflow: 'hidden' }}>
                        <Tabs value={selectedTabIndex} onChange={handleChange}  TabIndicatorProps={{style: {backgroundColor: "transparent"}}}>
                            <Tab 
                            label="Map" 
                            sx={{
                                backgroundColor: selectedTabIndex === 0 ?  '#8B4513':'#FFF8DC',
                                color: selectedTabIndex === 0 ? '#ffffff':'#8B4513',
                                '&.Mui-selected': {color: '#ffffff'}
                            }}/>
                            <Tab 
                            label="List"
                            sx={{
                                backgroundColor: selectedTabIndex === 1 ?  '#8B4513':'#FFF8DC',
                                color: selectedTabIndex === 1 ? '#ffffff':'#8B4513',
                                '&.Mui-selected': {color: '#ffffff'}
                                }}/>
                        </Tabs>
                    </Box>
                </AppBar>
            </div>
        </div>

        {/* Map View */}
        {selectedTabIndex === 0 && <MapboxMap/>}

        {/* List View */}
        {selectedTabIndex === 1 && <ListCards/>}
    </>
    )}
    </>
    );
};

export default Content;
