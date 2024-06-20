import React from "react";
import { Link } from "@mui/material";
import "./Blob.css";
// import bubblesVid from "../../../vids/bubbles1.mp4";



const Blob = (props) => {
    const { bgImage, link, altText, title, desc } = props;

    return (
        <div className="circle" style={{backgroundImage: `url(${bgImage})`, backgroundSize: "200%"}}>
            <a className="welcome-links" href={link}>
                <img src={bgImage} alt={altText} title={`Enter ${title}`} />
                <p>{desc}</p>
            </a>
        </div>
    );
}

export default Blob;