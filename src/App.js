import React from "react";
import { Typography} from "@mui/material";

import {Route, Routes, useNavigate } from "react-router-dom";

import theme from "./theme";
import Content from "./components/Content";
import CoffeeShopPage from "./components/CoffeeShopPage";

function App() {
  console.log("rendering App");
  const navigate = useNavigate();
  
  return (
    
    <div className="App">
    <div 
          onClick={() => navigate('/')}
          style={{ cursor: 'pointer' }}
        >
        <Typography variant="h3" align="center"
        sx={{
          fontFamily: "'Pacifico', cursive",
          margin: theme.spacing(2), // 16px
          [theme.breakpoints.up("md")]: {marginTop: theme.spacing(4)},
          [theme.breakpoints.up("lg")]: {marginTop: theme.spacing(6)}
        }}
      >
        Coffee Shops in the Neighborhood
      </Typography>
      </div>
      <Routes>
          <Route path="/shop/:id" element={<CoffeeShopPage />} />
          <Route path="/" element={<Content />} />
        </Routes>
    </div>
    
  );
}

export default App;
