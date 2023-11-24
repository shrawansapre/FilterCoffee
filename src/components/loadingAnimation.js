import React from "react";
import { Box, CircularProgress } from "@mui/material";
import coffeeBean from '../assets/coffee-bean.png'; // Replace with your actual path


export default function LoadingAnimation() {
  return (
    <Box sx={{ display: 'flex', marginTop:'20px' }}>
      <CircularProgress
        size={30}
        variant="indeterminate"
        sx={{
          opacity: 0.7,  // Added transparency
          color: 'transparent',
          '& .MuiCircularProgress-svg': {
            backgroundImage: `url(${coffeeBean})`,
            backgroundSize: 'cover',
          },
        }}
      />
    </Box>
  );
}
