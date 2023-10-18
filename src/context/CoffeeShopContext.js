import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import testCoffeeShopData from "../coffeeShops.json"

export const CoffeeShopContext = createContext();

export const CoffeeShopProvider = ({ children }) => {

  const [userLocation, setUserLocation] = useState(null);
  // Client-side code
  // const latitude = 40.7128; // Replace with actual latitude
  // const longitude = -74.0060; // Replace with actual longitude

  const [coffeeShops, setCoffeeShops] = useState([testCoffeeShopData]);
  const [loading, setLoading] = useState(true);

  const updateUserLocation = (newLocation) => {
    setUserLocation(newLocation);
  };

  useEffect(() => {
    const fetchData = async () => {
    setLoading(true)
    try {
      if (userLocation) {
        const url = `http://localhost:3001/coffee-shops?latitude=${userLocation.latitude}&longitude=${userLocation.longitude}`;
        const response = await axios.get(url);
        
        setCoffeeShops(response.data);
      }
      else{
        // const url = `http://localhost:3001/coffee-shops?latitude=${userLocation.latitude}&longitude=${userLocation.longitude}`;
        // const response = await axios.get(url);
        
        setCoffeeShops(testCoffeeShopData);
      }
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [userLocation]);

  const value = {
    coffeeShops,
    loading,
    userLocation,
    updateUserLocation
  };

  return <CoffeeShopContext.Provider value={value}>{children}</CoffeeShopContext.Provider>;
};
