// CoffeeShopPopup.js
import React from "react";
import { Typography } from "@mui/material";
import { Popup } from "react-map-gl";

const ShopPopup = ({ selectedShop, onClose }) => (
    <Popup latitude={selectedShop.lat} longitude={selectedShop.lng} onClose={onClose} tipSize={1} anchor="top">
        <div className="popup-header">
            <img src={selectedShop.thumbnail} alt={selectedShop.name} />
            <Typography variant="h6">{selectedShop.name}</Typography>
        </div>
        <div className="popup-content">
            <Typography>Rating: {selectedShop.rating}</Typography>
            <Typography>Open Now: {selectedShop.openingHours} </Typography>
            <Typography>Address: {selectedShop.address}</Typography>
        </div>
        <div className="popup-footer">
            <a href={selectedShop.website} target="_blank" rel="noopener noreferrer">Learn More</a>
        </div>
    </Popup>
);

export default ShopPopup;