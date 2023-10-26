  import React, { useContext, useState } from "react";

  import { Typography, Grid, Link } from "@mui/material";
  import Card from "@mui/material/Card";
  import CardContent from "@mui/material/CardContent";
  import CardMedia from "@mui/material/CardMedia";
  import CardActions from "@mui/material/CardActions";
  import IconButton from "@mui/material/IconButton";
  import StarIcon from "@mui/icons-material/Star";
  import Button from "@mui/material/Button";
  import Rating from '@mui/material/Rating';
  import LanguageIcon from '@mui/icons-material/Language'
  import OpenInNewIcon from '@mui/icons-material/OpenInNew';


  import coffeePlaceholder from "../assets/coffee_thumbnail_placeholder.svg";
  import LoadingAnimation from "./loadingAnimation";

  import { useNavigate } from 'react-router-dom';

  import { CoffeeShopContext } from "../context/CoffeeShopContext";

  const ListCards = () => {
    const { coffeeShops, loading } = useContext(CoffeeShopContext);
    const [expandedCardId, setExpandedCardId] = useState(null);
    const navigate = useNavigate();
    console.log("rendering List");

    const goToDetailPage = (id) => {
      navigate(`/shop/${id}`, {state: { scrollToTop: true }});
    };

    return (
    <div >
      {loading ? <LoadingAnimation/> : (
      <Grid container spacing={{ xs: 2, md: 3 }} justifyContent="center" alignItems="center" style={{ padding: "30px"}}>
        {coffeeShops.map((shop, index) => (
          <Grid item xs={12} sm={6} md={4} lg={4} key={index} >
            
            <Card key={index} sx={{maxWidth:'400px', maxHeight: '500px', margin: 'auto', borderRadius: "16px", boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)"}}  onClick={() => goToDetailPage(shop.id)}>
            {/* <Card key={index} sx={{maxWidth:'400px', maxHeight: expandedCardId === shop.id ? '1000px' : '500px', margin: 'auto', borderRadius: "16px", boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)"}}  onClick={() => expandedCardId === shop.id ? setExpandedCardId(null) : setExpandedCardId(shop.id)}> */}
             
              <CardMedia component="img" alt={shop.name} height="200" image={shop.thumbnail || coffeePlaceholder} sx={{ borderTopLeftRadius: "16px", borderTopRightRadius: "16px", objectFit: shop.thumbnail ? "none":"contain"}}/>
              <CardContent sx={{ padding: ["8px 16px", "16px 24px"] }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {/* Name */}
                  <Typography gutterBottom variant="h5" component="div">{shop.name}</Typography>
                  {/* Open/Close */}
                  <div style={{ border: '1px solid', borderColor: shop.open_now ? 'green' : 'red', color: shop.open_now ? 'green' : 'red', borderRadius: '4px', padding: '2px 8px',fontWeight: 'bold',fontSize: '0.8em'}}>
                    {shop.open_now ? 'Open' : 'Closed'}
                  </div>
                </div>
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
                    <Link href={shop.website} color="text.secondary" underline="none" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', marginRight: '8px' }}>
                      <LanguageIcon fontSize="small" sx={{marginRight:"5px"}}/>
                      <Typography variant="body2" color="text.secondary">Website</Typography>
                      {/* <OpenInNewIcon fontSize="small"/> */}
                    </Link>
                  ):
                  <Typography variant="body2" color="text.secondary">Website not available</Typography>
                  }
                </div>         
              </CardContent>
              <CardActions disableSpacing sx={{ justifyContent: "space-between", padding: "0 24px 16px",'& button': {'&:hover': {backgroundColor: '#f4a261'}}}}>
                <IconButton aria-label="add to favorites">
                  <StarIcon />
                </IconButton>
                <Button variant="contained" size="small" sx={{ backgroundColor: "#f4a261",color: "#ffffff"}}>
                  <Link href={shop.google_maps_url} color="inherit" underline="none" target="_blank" rel="noopener noreferrer" aria-label="Visit shop">Visit</Link>
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
