import React from "react";
import { Link } from "@mui/material";
import "./Blob.css";
// import bubblesVid from "../../../vids/bubbles1.mp4";


const Blob = (props) => {
    return (
        <div className="circle">
            <Link className="welcome-links" href={props.link}>
                <img src={props.bgImage} alt={props.altText} title={'Enter ' + props.title} />
               {/* {props.bgImage ? 
                 <img src={props.bgImage} alt={props.altText} title={'Enter ' + props.title} />
                :
                <video autoPlay muted loop style={{ width: '100%', height: '100%', position: 'relative', top: '2px', bottom: '0' }}>
                    <source src={bubblesVid} type="video/mp4" />
                </video>
               } */}
                <p>{props.desc}</p>
            </Link>
        </div>
    )
}

export default React.memo(Blob);