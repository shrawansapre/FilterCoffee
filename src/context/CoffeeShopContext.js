import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import testCoffeeShopData from "../coffeeShops.json"

export const CoffeeShopContext = createContext();

export const CoffeeShopProvider = ({ children }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [coffeeShops, setCoffeeShops] = useState([testCoffeeShopData]);
  const [loading, setLoading] = useState(true);
  const baseURL = process.env.REACT_APP_SERVER_BASE_URL || "http://localhost:3001/";

  const updateUserLocation = (newLocation) => {
    setUserLocation(newLocation);
  };

  // Read from localStorage when the component is mounted
  // useEffect(() => {
  //   const storedLocation =  typeof window !== 'undefined' && localStorage.getItem('LatLng');
  //   if (storedLocation) {
  //     // setUserLocation(JSON.parse(storedLocation));
  //   }
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        if (userLocation) {
          console.log(userLocation)
          const url = `${baseURL}places?latitude=${userLocation.latitude}&longitude=${userLocation.longitude}`;
          const response = await axios.get(url);
          setCoffeeShops(response.data);
        }
        else{
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
