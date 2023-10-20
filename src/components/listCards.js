// YourListComponent.js
import React, { useContext } from "react";

import { Typography, Grid, Link } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import StarIcon from "@mui/icons-material/Star";
import Button from "@mui/material/Button";

import coffeePlaceholder from "../assets/coffee_thumbnail_placeholder.svg";

import { CoffeeShopContext } from "../context/CoffeeShopContext";
import LoadingAnimation from "./loadingAnimation";

const ListCards = () => {
  const { coffeeShops, loading } = useContext(CoffeeShopContext);
  console.log("rendering List");

  return (
    <div >
         {loading ? (
        <LoadingAnimation/>
      ) : (
      <Grid container spacing={{ xs: 2, md: 3 }} justifyContent="center" alignItems="center" style={{marginTop:"30px"}}>
      {coffeeShops.map((shop, index) => (
       <Grid item xs={12} sm={12} md={4} lg={4} key={index}>
    <Card
  key={index}
  sx={{
    maxWidth:'400px',
    maxHeight: '500px',
    margin: 'auto',
    borderRadius: "16px",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)"
  }}
>
  <CardMedia
    component="img"
    alt={shop.name}
    height="200"
    image={shop.thumbnail || coffeePlaceholder}  // Fallback image
    sx={{
      borderTopLeftRadius: "16px",
      borderTopRightRadius: "16px",
      objectFit: shop.thumbnail ? "none":"contain" 
    }}
  />
  <CardContent sx={{ padding: ["8px 16px", "16px 24px"] }}>
    <Typography gutterBottom variant="h5" component="div" sx={{fontFamily: "'Patrick Hand', serif"}}>
      {shop.name}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      {shop.address}
    </Typography>
  </CardContent>
  <CardActions
    disableSpacing
    sx={{
      justifyContent: "space-between",
      padding: "0 24px 16px",
      '& button': {
        '&:hover': {
          backgroundColor: '#f4a261',
        }
      }
    }}
  >
    <IconButton aria-label="add to favorites">
      <StarIcon />
    </IconButton>
    <Button
      variant="contained"
      size="small"
      sx={{
        backgroundColor: "#f4a261",
        color: "#ffffff",
      }}
    >
      <Link
        href={shop.gMapsLink}
        color="inherit"
        underline="none"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visit shop"
      >
        Visit
      </Link>
    </Button>
  </CardActions>
</Card>
      </Grid>
      
      ))}
      </Grid>
      )}
    </div>
  );
};

export default ListCards;
