import * as React from "react";
import coffeeIcon from "../assets/coffeeIcon.svg";

function CustomMarker() {
  return (
    <img
      src={coffeeIcon}
      alt="Custom marker"
      style={{ width: "24px", height: "24px" }}
    />
  );
}

export default React.memo(CustomMarker);
