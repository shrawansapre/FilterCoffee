// CoffeeShopPopup.js
import React from "react";
import { Typography, Button, Link } from "@mui/material";
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
        <Typography variant="h6" style={{ margin: '0 10px' }}>{selectedShop.name}</Typography>
    </div>
    <div className="popup-content" style={{ padding: '10px' }}>
        <Typography variant="body2">
          <span className="icon-rating"></span> Rating: {selectedShop.rating}
        </Typography>
        <Typography variant="body2">
          <span className="icon-clock"></span> Open Now: {selectedShop.openingHours}
        </Typography>
        <Typography variant="body2">
          <span className="icon-location"></span> Address: {selectedShop.address}
        </Typography>
    </div>
    <div style={{ textAlign: 'center' }}>
    <Button variant="contained" size="small" sx={{backgroundColor: "#f4a261",color: "#ffffff",}}>
      <Link href={selectedShop.gMapsLink} color="inherit" underline="none" target="_blank" rel="noopener noreferrer" aria-label="Visit shop">
        Visit
      </Link>
    </Button>
    </div>
    </Popup>
);

export default ShopPopup;