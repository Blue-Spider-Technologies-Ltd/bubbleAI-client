import React from "react";
import chatBoxCss from "./ChatBoxes.module.css"
import SmartToyIcon from '@mui/icons-material/SmartToy';
import Person4Icon from '@mui/icons-material/Person4';


export const Assistant = (props) => {
    return (
        <div className={chatBoxCss.assistantOuter}>
            <SmartToyIcon /><div className={chatBoxCss.Assistant}>{props.children}</div>
        </div>
    )
}

export const User = (props) => {
    return (
        <div className={chatBoxCss.userOutter}>
            <div className={chatBoxCss.User}>{props.children}</div><Person4Icon />
        </div>
    )
}