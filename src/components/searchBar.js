import React, { useState, useContext } from "react";
import {
  TextField,
  Paper,
  IconButton,
  InputAdornment,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import Downshift from "downshift";
import { CoffeeShopContext } from "../context/CoffeeShopContext";

const SearchBar = ({ onPlaceSelected }) => {
  const [inputValue, setInputValue] = useState("");
  const { updateUserLocation } = useContext(CoffeeShopContext);

  const [places, setPlaces] = useState([]);

  const fetchPlaces = async (query) => {
    //   const accessToken = "YOUR_MAPBOX_ACCESS_TOKEN";
    const response = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json`,
      {
        params: {
          access_token: process.env.REACT_APP_MAPBOX_TOKEN,
        },
      }
    );
    setPlaces(response.data.features);
  };

  return (
    <Downshift
      onChange={(selection) => {
        console.log("Selected Item:", selection);
        console.log(
          "Latitude:",
          selection.center[1],
          "Longitude:",
          selection.center[0]
        );
        onPlaceSelected(selection.center);
        updateUserLocation({
          latitude: selection.center[1],
          longitude: selection.center[0],
        });
      }}
      itemToString={(item) => (item ? item.place_name : "")}
    >
      {({
        getRootProps,
        getInputProps,
        getItemProps,
        getMenuProps,
        highlightedIndex,
        isOpen,
        selectedItem,
      }) => (
        <div {...getRootProps}>
          <Paper
            sx={{
              display: "flex",
              alignItems: "center",
              width: 300,
              margin: "0 auto",
              borderRadius: "12px",
              position: "relative",
            }}
          >
            <TextField
              {...getInputProps({
                onChange: (e) => {
                  setInputValue(e.target.value);
                  fetchPlaces(e.target.value);
                },
                placeholder: "Enter Zip Code",
              })}
              sx={{
                flex: 1,
                "& input::placeholder": {
                  color: "#8B4513",
                },
                borderRadius: "12px",
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="search"
                      sx={{
                        color: "#6B4F2E",
                      }}
                    >
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Paper
              {...getMenuProps()}
              sx={{
                position: "absolute",
                top: "100%",
                left: 0,
                width: "auto",
                minWidth: "100%",
                zIndex: 1,
                overflow: "hidden",
              }}
            >
              {isOpen
                ? places.map((place, index) => (
                    <MenuItem
                      {...getItemProps({ item: place })}
                      key={place.id}
                      selected={highlightedIndex === index}
                      component="div"
                    >
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
