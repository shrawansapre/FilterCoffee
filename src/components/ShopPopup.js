// CoffeeShopPopup.js
import React from "react";
import { Typography, Button, Link } from "@mui/material";
import { Popup } from "react-map-gl";
import styled from "@emotion/styled";
import StarIcon from "@mui/icons-material/Star";
import InfoIcon from "@mui/icons-material/Info";

const PopupImage = styled.img`
  maxWidth: 100px;
  Height: 100px;
  width: 100%;
  object-fit: cover;
  border-radius: 12px;
`;


const ShopPopup = ({ selectedShop, onClose, scrollToCard}) => {
  const handleClick = () => {
    scrollToCard(selectedShop.id);
  };

  // console.log(selectedShop.open_now)
  return(
  <Popup latitude={selectedShop.lat} longitude={selectedShop.lng} onClose={onClose} tipSize={1}>
    <div className="popup-header">
      <PopupImage src={selectedShop.thumbnail} alt={selectedShop.name}/>
    </div>
    <div  style={{ padding: '10px', overflow:'hidden'}}>
    <Typography variant="body2" sx={{ fontSize:'1rem'}}>{selectedShop.name}</Typography>
        <Typography variant="body2" sx={{ fontSize:'0.8rem'}}>
          Rating: {selectedShop.rating}
        </Typography>
        <Typography variant="body2" sx={{ fontSize:'0.8rem'}}>
           Open Now: {selectedShop.open_now ? 'Yes' : 'No'}
        </Typography>
        {/* <Typography variant="body2" sx={{ fontSize:'0.8rem'}}>
          Address: {selectedShop.address}
        </Typography> */}
    </div>

    <div onClick={handleClick} style={{ paddingBottom:"10px", display: 'flex', justifyContent:'center', alignItems: 'center', cursor: 'pointer', color: "#f4a261"}}>
      <InfoIcon fontSize="small" sx={{ marginRight: '5px' }} />
      <Typography variant="body2" sx={{ fontSize:'0.8rem'}}> View Details</Typography>
    </div>
  </Popup>
)
  };

export default ShopPopup;