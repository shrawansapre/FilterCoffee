import React, { useState, useContext } from "react";
import axios from "axios";

import {TextField, Paper, IconButton, InputAdornment, MenuItem} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Downshift from "downshift";

import { CoffeeShopContext } from "../context/CoffeeShopContext";

const SearchBar = ({ onPlaceSelected }) => {
  const [inputValue, setInputValue] = useState("");
  const { updateUserLocation } = useContext(CoffeeShopContext);
  const [places, setPlaces] = useState([]);

  const fetchPlaces = async (query) => {

    // TODO: Move the API call to back-end server
    // const response = await fetch(`http://localhost:3001/geocode?query=${query}`);
    // // setPlaces(response.data.features);
    // console.log(response.data)

    const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json`,{params:{access_token: process.env.REACT_APP_MAPBOX_TOKEN}});
    setPlaces(response.data.features)
    console.log("rendering Search");
    
  };

  return (
    <Downshift
      onChange={(selection) => {
        onPlaceSelected(selection.center);
        updateUserLocation({
          latitude: selection.center[1],
          longitude: selection.center[0],
        });
      }}
      itemToString={item => (item ? item.place_name : "")}
    >
      {({getRootProps, getInputProps, getItemProps, getMenuProps, highlightedIndex, isOpen, selectedItem}) => (

        <div {...getRootProps({}, {suppressRefError: true})}>
          <Paper sx={{ display: "flex", alignItems: "center", width: 300, margin: "0 auto", borderRadius: "12px", position: "relative"}}>
            <TextField 
              {...getInputProps({
                onChange: (e) => {
                  setInputValue(e.target.value);
                  fetchPlaces(e.target.value);
                },
                placeholder: "Enter Zip Code",
              })}
              sx={{flex: 1, "& input::placeholder": {color: "#8B4513"}, borderRadius: "12px"}}
              InputProps={{ 
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton aria-label="search" sx={{color: "#6B4F2E"}}>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
              )}}
            />
            <Paper {...getMenuProps()} sx={{ position: "absolute", top: "100%", left: 0, width: "auto", minWidth: "100%", zIndex: 1, overflow: "hidden"}}>
              {isOpen
                ? places.map((place, index) => (
                    <MenuItem {...getItemProps({ item: place })} key={place.id} selected={highlightedIndex === index} component="div">
                      {place.place_name}
                    </MenuItem>
                  ))
              : null}
            </Paper>
          </Paper>
        </div>
      )}
    </Downshift>
  );
};

export default SearchBar;
