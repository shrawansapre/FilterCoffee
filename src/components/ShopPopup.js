// CoffeeShopPopup.js
import React from "react";
import { Typography } from "@mui/material";
import { Popup } from "react-map-gl";
import styled from "@emotion/styled";

const PopupImage = styled.img`
  maxWidth: 150px;
  Height: 150px;
`;


const ShopPopup = ({ selectedShop, onClose }) => (
    <Popup latitude={selectedShop.lat} longitude={selectedShop.lng} onClose={onClose} tipSize={1} anchor="top">
        <div className="popup-header">
            <PopupImage src={selectedShop.thumbnail} alt={selectedShop.name}/>
            <Typography variant="h6">{selectedShop.name}</Typography>
        </div>
        <div className="popup-content">
            <Typography variant="body">Rating: {selectedShop.rating}</Typography>
            <Typography variant="body">Open Now: {selectedShop.openingHours} </Typography>
            <Typography variant="body">Address: {selectedShop.address}</Typography>
        </div>
        <div className="popup-footer">
            <a href={selectedShop.website} target="_blank" rel="noopener noreferrer">Learn More</a>
        </div>
    </Popup>
);

export default ShopPopup;