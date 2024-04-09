import React from "react";
import nodata_icon from "assets/images/picture/no-data.png";
function noData() {
  return (
    <div style={{ textAlign: "center" }}>
      <img src={nodata_icon} />
      <br />
      нет данных
    </div>
  );
}

export default noData;
