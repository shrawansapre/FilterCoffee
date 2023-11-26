import React, { useContext, useState, useEffect } from "react";

import { Typography, Grid, Link, Tooltip } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import StarIcon from "@mui/icons-material/Star";
import Button from "@mui/material/Button";
import Rating from '@mui/material/Rating';
import LanguageIcon from '@mui/icons-material/Language';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import ShareOptions from "./ShareOptions";

import coffeePlaceholder from "../assets/coffee_thumbnail_placeholder.svg";

import { CoffeeShopContext } from "../context/CoffeeShopContext";



const ListCards = ({cardRefs, activeCardId, resetActiveCard}) => {
  const { coffeeShops, loading } = useContext(CoffeeShopContext);
  console.log("rendering List");
  const [showFull, setShowFull] = useState(false);

  const [expandedCard, setExpandedCard] = useState(null);

  const handleExpandClick = (shopId) => {
    setExpandedCard(expandedCard === shopId ? null : shopId);
  };

  const isExpanded = (shopId) => expandedCard === shopId;

  // Style for the fade effect
  const fadeStyle = {
    position: 'absolute',
    bottom: 0, // Height of the expand section
    left: 0,
    right: 0,
    height: '3em',
    backgroundImage: 'linear-gradient(to bottom, transparent, white)',
    pointerEvents: 'none',
  };

  // Style for the expand section
  const expandSectionStyle = {
    textAlign: 'center',
    cursor: 'pointer',
    padding: '5px 0',
    position: 'relative', // Positioned relative to the card content
  };


  const activeCardStyle = {
    transform: 'scale(1.05)',
    transition: 'transform 0.3s ease',
    boxShadow: '0px 0px 20px 5px #f4a261' 
  };

  const toggleShowFull = () => {
    setShowFull(!showFull);
  };

  useEffect(() => {
    // console.log(activeCardId)
    if (activeCardId !== null) {
      const timer = setTimeout(() => {
        resetActiveCard();
        // You could emit an event or call a callback function here to reset the activeCardId in the parent.
      }, 1000); // Reset after 1 second
  
      return () => clearTimeout(timer); // Clear the timer if the component is unmounted or if activeCardId changes before the timer completes.
    }
  }, [activeCardId, resetActiveCard]);

  return (
  < >
    {loading ? <div style={{display:"flex", justifyContent:"center", alignContent:"center"}}> </div>
    : (
    <Grid container spacing={{ xs: 2, md: 2, lg:3 }} style={{ paddingLeft: "30px", paddingRight: "30px"}}>
      {coffeeShops && coffeeShops.map((shop, index) => (
        <Grid item xs={12} sm={12} md={12} lg={12} key={shop.id} ref={el => cardRefs.current[shop.id] = el} >
          <Card key={index} sx={{maxWidth:'400px', margin: 'auto', borderRadius: "20px", boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", ...(shop.id === activeCardId ? activeCardStyle : {})}} >
            <CardMedia component="img" loading="lazy" alt={shop.name} height="200" image={shop.thumbnail || coffeePlaceholder} sx={{ borderTopLeftRadius: "16px", borderTopRightRadius: "16px", objectFit: shop.thumbnail ? "none":"contain"}}/>
            <CardContent sx={{ padding: ["8px 16px", "16px 24px"] ,  position: 'relative', maxHeight: isExpanded(shop.id) ? 'none' : '150px', overflow: 'hidden' }}>
            
              <div style={{ display: 'inline-flex' }}>
                <div style={{ border: '1px solid', borderColor: shop.open_now ? 'green' : 'red', color: shop.open_now ? 'green' : 'red', borderRadius: '4px', padding: '2px 8px',fontWeight: 'bold',fontSize: '0.6em'}}>
                    {shop.open_now ? 'Open Now' : 'Closed'}
                </div>
              </div>
              {/* Name of shop */}
              <Typography gutterBottom component="div"  sx={{fontSize:'20px', fontWeight:'bold'}} onClick={toggleShowFull}>{shop.name}</Typography>
          
              <div style={{ display: 'flex', alignItems: 'center' }}>
              {/* Rating */}
              <Rating name="read-only" value={shop.rating} size="medium" readOnly precision={0.1} />
              {shop.rating ? (
              <Typography variant="body2" color="text.secondary" style={{ marginLeft: '5px' }}>{shop.rating} ({shop.user_ratings_total} reviews)</Typography>) 
              :  <Typography variant="body2" color="text.secondary" style={{ marginLeft: '5px' }}>Rating not available</Typography>}
              </div>
              {/* Website */}
              <div style={{ marginTop: '6px', display: 'flex', alignItems: 'center',  }}>
               {shop.website ? (
                  <Link href={shop.website} color="text.secondary" underline="hover" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', marginRight: '8px' }}>
                    <LanguageIcon fontSize="small" sx={{marginRight:"5px", color: "text.secondary"}}/>
                    <Tooltip title={shop.website}>
                      <Typography variant="body2" color="text.secondary">Website</Typography>
                      </Tooltip>

                  </Link>
                ):
                <>
                <LanguageIcon fontSize="small" sx={{marginRight:"5px"}}/>
                <Typography variant="body2" color="text.secondary">Website not available</Typography>
                </>
                }
              </div> 
              <div style={{ marginTop: '6px', display: 'flex', alignItems: 'center'}}>
                <AccessTimeIcon fontSize="small" sx={{ marginRight: "5px", color: "text.secondary" }} />
                <Typography key={index} variant="body2" color="text.secondary">Hours:</Typography>
              </div>
              <div style={{ marginTop: '6px', marginLeft:"24px", display: 'flex', flexDirection: 'column' }}>
                {shop.opening_hours ? (
                  shop.opening_hours.map((hours, index) => (
                    <Typography key={index} variant="body2" color="text.secondary">
                      {hours}
                    </Typography>
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary">Opening hours not available</Typography>
                )}
              </div> 
              <div style={{ marginTop: '6px', display: 'flex', alignItems: 'center'}}>
              <LocationOnIcon fontSize="small" sx={{marginRight: '5px', color: "text.secondary" }} />
                <Typography key={index} variant="body2" color="text.secondary">{shop.address}</Typography>
              </div>

              {!isExpanded(shop.id) && <div style={fadeStyle}></div>}
             
                         
            </CardContent>
            <div style={expandSectionStyle} onClick={() => handleExpandClick(shop.id)}>
            <ExpandMoreIcon sx={{ verticalAlign: 'middle', transform: isExpanded(shop.id) ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
            <Typography variant="body2" sx={{ display: 'inline', verticalAlign: 'middle' }}>
              {isExpanded(shop.id) ? 'Show less' : 'Show more'}
            </Typography>
          </div>
            <CardActions disableSpacing sx={{ justifyContent: "space-between", padding: "0 24px 16px",'& button': {'&:hover': {backgroundColor: '#f4a261'}}}}>
            <Tooltip title={"Add to Favorites"}>
              <IconButton aria-label="add to favorites">
                <StarIcon />
              </IconButton> 
              </Tooltip>
              <Tooltip title="Share">
             
              <ShareOptions url={shop.google_maps_url} title="Check out this local coffee shop: " />
    
            </Tooltip>
              <Button variant="contained" size="small" sx={{ backgroundColor: "#f4a261",color: "#ffffff"}}>
                <Link href={shop.google_maps_url} color="inherit" underline="none" target="_blank" rel="noopener noreferrer" aria-label="Directions">Directions</Link>
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
    )}
  </>
  );
};

export default ListCards;
