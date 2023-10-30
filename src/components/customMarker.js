import * as React from "react";
import coffeeIcon from "../assets/coffeeIcon.svg";

function CustomMarker({details}) {
  return (
    <div style={{ position: "relative", textAlign: "center", cursor:'pointer'}}>
      {/* Coffee Icon */}
      <img src={coffeeIcon} alt="Coffee marker" style={{ width: "24px", height: "24px" }}/>
      <div style={{position: "absolute", top: 0,left: "50%", transform: "translate(-50%, -100%)", backgroundColor: "#fff", borderRadius: "5px", paddingRight: "5px",display: "flex",alignItems: "center"}}>
        {/* Rating */}
        <div style={{ marginLeft: "5px",marginRight: "5px",padding: "2px 4px"}}>{details.rating ? details.rating : "N/A"}</div>
        {/* Open/Close Sign */}
        <div style={{ width: "10px",height: "10px",borderRadius: "50%",backgroundColor: details.open_now ? "green" : "red"}}></div>
    </div>
    </div>
  );
}

export default React.memo(CustomMarker);
