// YourListComponent.js
import React, { useContext } from "react";

import { Typography, Grid, Link } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import StarIcon from "@mui/icons-material/Star";
import PlaceIcon from "@mui/icons-material/Place";
import Button from "@mui/material/Button";

import { CoffeeShopContext } from "../context/CoffeeShopContext";
import LoadingAnimation from "./loadingAnimation";

const ListCards = () => {
  const { coffeeShops, loading } = useContext(CoffeeShopContext);

  return (
    <div style={{marginTop:'20px'}}>
         {loading ? (
        <LoadingAnimation/>
      ) : (
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        
      {coffeeShops.map((shop, index) => (
       <Grid item xs={12} sm={12} md={12} key={index}>
        <Card
          key={index}
          sx={{
            maxWidth: 400,
            marginBottom: 4,
            borderRadius: "16px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <CardMedia
            component="img"
            alt={shop.name}
            height="200"
            image={shop.thumbnail}
            sx={{
              borderTopLeftRadius: "16px",
              borderTopRightRadius: "16px",
            }}
          />
          <CardContent sx={{ padding: "16px 24px" }}>
            <Typography gutterBottom variant="h5" component="div">
              {shop.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {shop.address}
            </Typography>
          </CardContent>
          <CardActions
            disableSpacing
            sx={{ justifyContent: "space-between", padding: "0 24px 16px" }}
          >
            <IconButton aria-label="add to favorites">
              <StarIcon />
            </IconButton>
            <IconButton aria-label="place">
              <PlaceIcon />
            </IconButton>
            <Button
              variant="contained"
              size="small"
              sx={{ backgroundColor: "#f4a261", color: "#ffffff" }}
            >
              <Link href={shop.gMapsLink} color="inherit" underline="none" target="_blank" rel="noopener noreferrer">
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
