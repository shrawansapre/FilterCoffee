import React from "react";
import { Typography } from "@mui/material";
import theme from "./theme";
import Content from "./components/Content";

function App() {
  console.log("rendering App");
  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Typography variant="h3" align="center"
        sx={{
          fontFamily: "'Pacifico', cursive",
          margin: theme.spacing(2), // 16px
          [theme.breakpoints.up("md")]: {
            marginTop: theme.spacing(4), // 32px
          },
          [theme.breakpoints.up("lg")]: {
            marginTop: theme.spacing(6), // 48px
          }}}>
        Coffee Shops in the Neighborhood
      </Typography>
      <Content style={{ flex: '1 1 auto', overflow: 'hidden' }}/>
    </div>
  );
}

export default App;
