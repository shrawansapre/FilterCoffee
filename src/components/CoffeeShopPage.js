import React, { useContext, useEffect } from "react";
import { useLocation } from 'react-router-dom';

import { Card, CardContent, CardMedia, Typography, Paper, Box, Button, SvgIcon } from '@mui/material';
import Rating from '@mui/material/Rating';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import StarIcon from '@mui/icons-material/Star';

import LoadingAnimation from "./loadingAnimation";
import coffeePlaceholder from "../assets/coffee_thumbnail_placeholder.svg";
import GoogleMapsIcon from "../assets/google_maps_icon.svg"
import AppleMapsIcon from "../assets/apple_maps_icon.png"


import { useParams } from "react-router-dom";
import { CoffeeShopContext } from "../context/CoffeeShopContext";

const CoffeeShopPage = () => {
  let { id } = useParams();
  console.log(id)
  const location = useLocation();
  const { coffeeShops } = useContext(CoffeeShopContext);
  console.log(coffeeShops)

  const shop = coffeeShops.find((shop) => String(shop.id) === String(id));
  console.log(shop)

  useEffect(() => {
    if (location.state?.scrollToTop) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, [location]);

  useEffect(() => {
    if (!shop) {
      const savedShop = JSON.parse(localStorage.getItem(`shop_${id}`));
      if (savedShop) {
        // setShop or some other action to populate data
      } else {
        // // Fetch data from API and then store in local storage
        // // fetchShopData() is a placeholder for whatever logic you use
        // const fetchedShop = fetchShopData(id); 
        // localStorage.setItem(`shop_${id}`, JSON.stringify(fetchedShop));
      }
    } else {
      localStorage.setItem(`shop_${id}`, JSON.stringify(shop));
    }
  }, [id, shop]);


  return (
    <>
      {shop ? (
        <Box sx={{ p: 4, minHeight: '100vh'}}>
      {/* Header */}
      <Card sx={{ borderRadius: '12px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
        <CardMedia component="img" alt={shop.name} height="400" image={shop.thumbnail || coffeePlaceholder} />
        <CardContent>
          {/* Name */}
          <Typography variant="h3" component="div">{shop.name}</Typography>
          {/* Open/Close */}
          <Typography variant="body2" color= {shop.open_now ? 'green' : 'red'} sx={{ my: 1, }}>
            {shop.open_now ? 'Open' : 'Closed'}
          </Typography>
          {/* Rating */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Rating name="read-only" value={shop.rating || 0} readOnly precision={0.1}/>
            {shop.rating ? (
              <Typography variant="body2" color="text.secondary" style={{ marginLeft: '5px' }}>{shop.rating} ({shop.user_ratings_total} reviews)</Typography>) 
              :  <Typography variant="body2" color="text.secondary" style={{ marginLeft: '5px' }}>Rating not available</Typography>
            }
            </div>
        </CardContent>
      </Card>

      {/* Directions */}
      <Box sx={{ my: 4, display: 'flex', alignItems: 'center' }}>
        <a href={shop.google_maps_url} style={{ marginRight: '10px' }}>
          <img src={AppleMapsIcon} alt="Apple Maps" style={{ width: '24px', height: '24px' }} />
        </a>
        <a href={shop.apple_maps_url}>
          <img src={GoogleMapsIcon} alt="Google Maps link" style={{ width: "24px", height: "24px" }}/>
        </a>
      </Box>


      {/* About */}
      <Paper elevation={0} sx={{ my: 4, p: 3, borderRadius: '12px', backgroundColor: '#ffffff'}}>
        <Typography variant="h6" component="div" color="text.secondary">About Us</Typography>
        <Typography variant="body2">{shop.description || "Come enjoy the finest coffee in the city."}</Typography>
      </Paper>

       {/* Coffee Details */}
       <Paper elevation={0} sx={{ my: 4, p: 3, borderRadius: '12px', backgroundColor: '#ffffff' }}>
          <Typography variant="h6" component="div" color="text.secondary">Coffee</Typography>
          <Typography variant="body2">{`Types: ${shop.coffee_types || 'N/A'}`}</Typography>
          <Typography variant="body2">{`Roaster: ${shop.roaster || 'N/A'}`}</Typography>
          {/* ... add more coffee details here */}
        </Paper>

      {/* Reviews */}
      <Paper elevation={0} sx={{ my: 4, p: 3, borderRadius: '12px', backgroundColor: '#ffffff' }}>
        <Typography variant="h6" component="div" color="text.secondary">Reviews</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
          <Typography variant="body2">"Great coffee!"</Typography>
          <Rating name="read-only" value={5} readOnly size="small" sx={{ ml: 2 }} />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
          <Typography variant="body2">"Okay-ish."</Typography>
          <Rating name="read-only" value={3} readOnly size="small" sx={{ ml: 2 }} />
        </Box>
      </Paper>

      {/* Merchandise Shop */}
      <Paper elevation={0} sx={{ my: 4, p: 3, borderRadius: '12px', backgroundColor: '#ffffff' }}>
          <Typography variant="h6" component="div" color="text.secondary">Online Merchandise Shop</Typography>
          <Button variant="contained" color="primary" href={shop.merchandise_shop_url}>Visit Shop</Button>
        </Paper>
    </Box>
      ) : (
        <LoadingAnimation />
      )}
    </>
  );
};

export default CoffeeShopPage;
