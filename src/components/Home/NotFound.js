import React from "react";
import MenuBar from "../UI/Menu/Menu";
import "./Home.css";
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';



const NotFound = () => {
 

  return (
    <div>
      <MenuBar />

      <section id="not-found" className="container">
        <div className="container-inner">
          <div className="not-found">
            <PrecisionManufacturingIcon sx={{fontSize: '3rem'}} />
            <div style={{fontSize: '5rem', fontWeight: '800'}}>404</div>
            <div style={{fontSize: '2.5rem', fontWeight: '700'}}>NOT FOUND</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NotFound;

