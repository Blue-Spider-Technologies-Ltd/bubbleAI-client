import React from "react";
import chatBoxCss from "./ChatBoxes.module.css"
import SmartToyIcon from '@mui/icons-material/SmartToy';
import Person4Icon from '@mui/icons-material/Person4';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useSelector, useDispatch } from "react-redux";
import { setError, setSuccessMini } from "../../../redux/states";
import { errorAnimation, successMiniAnimation } from "../../../utils/client-functions";




export const Assistant = (props) => {
    const { error, successMini } = useSelector((state) => state.stateData);
    const dispatch = useDispatch();
    
    const errorSetter = (string) => {
        dispatch(setError(string))
        errorAnimation()
    }

    const successSetter = (string) => {
        dispatch(setSuccessMini(string))
        successMiniAnimation()
    }
    const handleCopy = () => {
        // Convert React nodes to a string or handle differently if needed
        const textToCopy = React.Children.map(props.children, child => 
            typeof child === "string" ? child : React.isValidElement(child) ? child.props.children : ""
        ).join('');

        if (navigator.clipboard) {
            navigator.clipboard.writeText(textToCopy)
                .then(() => {
                    successSetter('Text copied to clipboard');
                })
                .catch(err => {
                    errorSetter('Failed to copy text: ', err);
                });
        } else {
            //For older browsers
            const tempTextArea = document.createElement('textarea');
            tempTextArea.value = textToCopy;
            document.body.appendChild(tempTextArea);
            tempTextArea.select();
            document.execCommand('copy');
            document.body.removeChild(tempTextArea);

            successSetter('Text copied to clipboard');
        }
    };

    return (
        <div className={chatBoxCss.assistantOuter}>
            <SmartToyIcon />
            <div className={chatBoxCss.Assistant}>
                <div className="error">{error}</div>
                <div className="success-mini">{successMini}</div>
                {props.children}

                <span className={chatBoxCss.AssistantCopyIcon} onClick={handleCopy}>
                    {props.contentTrim ? "" : <ContentCopyIcon fontSize="small" />}
                </span>

            </div>
        </div>
    )
}

export const User = (props) => {
    const { error, successMini } = useSelector((state) => state.stateData);
    const dispatch = useDispatch();
    
    
    const errorSetter = (string) => {
        dispatch(setError(string))
        errorAnimation()
    }

    const successSetter = (string) => {
        dispatch(setSuccessMini(string))
        successMiniAnimation()
    }

    const handleCopy = () => {
        // Convert React nodes to a string or handle differently if needed
        const textToCopy = React.Children.map(props.children, child => 
            typeof child === "string" ? child : React.isValidElement(child) ? child.props.children : ""
        ).join('');

        if (navigator.clipboard) {
            navigator.clipboard.writeText(textToCopy)
                .then(() => {
                    successSetter('Text copied to clipboard');
                })
                .catch(err => {
                    errorSetter('Failed to copy text: ', err);
                });
        } else {
            //For older browsers
            const tempTextArea = document.createElement('textarea');
            tempTextArea.value = textToCopy;
            document.body.appendChild(tempTextArea);
            tempTextArea.select();
            document.execCommand('copy');
            document.body.removeChild(tempTextArea);

            successSetter('Text copied to clipboard');
        }
    };
    return (
        <div className={chatBoxCss.userOutter}>
            <div className={chatBoxCss.User}>
                <div className="error">{error}</div>
                <div className="success-mini">{successMini}</div>
                <div>
                    {props.children}
                </div>
                <span className={chatBoxCss.UserCopyIcon} onClick={handleCopy}>
                    <ContentCopyIcon fontSize="small" />
                </span>

            </div>
            <Person4Icon />
        </div>
    )
}