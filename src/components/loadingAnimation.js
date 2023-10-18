import React from "react";
import { Box, CircularProgress } from "@mui/material";
// import '../coffeeLoader.css';


export default function LoadingAnimation() {

  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress sx={{color:"#8B4513"}} />
    </Box>
  );
}
