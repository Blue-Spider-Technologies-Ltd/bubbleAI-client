import React from "react";
import { Link } from "@mui/material";
import "./Blob.css"


const Blob = (props) => {
    return (
        <div className="circle">
            <Link className="welcome-links" href={props.link}>
                <img src={props.bgImage} alt={props.altText} title={'Enter ' + props.title} />
                <p>{props.desc}</p>
            </Link>
        </div>
    )
}

export default Blob;