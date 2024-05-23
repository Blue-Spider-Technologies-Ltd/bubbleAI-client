import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import AuthSideMenu from "../UI/AuthSideMenu/AuthSideMenu";
import { Grid } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import AuthInput from "../UI/Input/AuthInputs";
import { ButtonSubmitBlack } from "../UI/Buttons/Buttons"
import { useSelector, useDispatch } from "react-redux";
import { setMessage, deleteLastMessage } from "../../redux/states";
import { Assistant, User } from "../UI/ChatBoxes/ChatBoxes";
import { ThreeDots } from 'react-loader-spinner'
import  ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import axios from "axios";
import { setError } from "../../redux/states";
import { errorAnimation } from "../../utils/client-functions";

const screenWidth = window.innerWidth

const suggestions = [
    {
        title: "Write professional email",
        description: "Write a sample professional follow up email to a prospective client listing out why our products [mention products] are the best for them"
    },
    {
        title: "Quicken monotonous tasks",
        description: "How can Bubble AI's Resume Builder streamline and display my skills and profile more efficiently?"
    },
    {
      title: "Create video content",
      description: "You are an expert content creator at a business development firm, create a social media video script of 1 minute 30 seconds on the importance of digital marketing with catchy illustrations"
    },
]


const AskMe = () => {
  const { messages } = useSelector((state) => state.stateData);
  const dispatch = useDispatch();
  const chatBoxRef = useRef(null);
  const inputRef = useRef();
  const navigate = useNavigate();
  const now = new Date().getTime();
  const countItemJson = localStorage?.getItem("oats_3297");
  const item = JSON.parse(countItemJson);
  const useCount = item ? item.cu78tgGgivhcountJVGIbGguguGhgh : 0;
  const expiration = item?.UYiygc768FYexpUVIirationHi87f86DCCC;

  const [authMenuOpen, setAuthMenuOpen] = useState(false)
  const [askMeVal, setAskMeVal] = useState("")
  const [suggestionDisplay, setSuggestionDisplay] = useState(true)

  const errorSetter = (string) => {
    dispatch(setError(string))
    errorAnimation()
  }



  const askMeErrorObj = {
            role: 'assistant',
            content:  "I am currently throttling requests, try again in a moment"
          }

  const isAuth = localStorage?.getItem("token");

  // Scroll to bottom on new message
  useEffect(() => {
    chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  }, [messages]);

  //check and remove unauth user's expired use count for ask me anything
  useEffect(() => {
    if (expiration < now) {
      localStorage?.removeItem("oats_3297");
    }
  }, [expiration, now])

  


  const chatExchange = messages.map((message, index) => {
    const OverUseMessage = () => {
      const overUseMessage = {
        content:
          `You have used up your unregistered user interactions for the day, kindly <a href="/join-bubble" >Register here</a> or <a href="/popin" >Log in</a> to enjoy more for FREE`,
      };
    
      return (
        <div>
          <span dangerouslySetInnerHTML={{ __html: overUseMessage.content }} />
        </div>
      );
    };
    const isAssistant = message.role === "assistant";
    let contentTrim = message.content.trim()
    const assistantMessage = useCount > 2 && !isAuth ? <OverUseMessage /> : message.content.split("\n").map(paragraph => {
        return <p>{paragraph}</p>
    })

    const content = isAssistant? (
      <Assistant contentTrim={contentTrim === ""}>{contentTrim === "" ?        
        <ThreeDots 
            height="25" 
            width="25" 
            radius="9"
            color="#000" 
            ariaLabel="three-dots-loading"
            visible={true}
        /> : assistantMessage
    }
      </Assistant>
    ) : (
      <User>{message.content}</User>
    );
    return <div key={index}>{content}</div>;
  });




  const handleAskMeAnything = async (e) => {

    if (askMeVal === "") {
      return errorSetter("Empty question detected")
    }
    const newMessage = {
      role: "user",
      content: askMeVal,
    };

    //Dispatch with empty content to enable thinking algo
    const emptyMessage = {
      role: "assistant",
      content: "",
    };
    if (isAuth) {
      //save authenticated user message
      dispatch(setMessage(newMessage));
      dispatch(setMessage(emptyMessage));
      setAskMeVal("");
      try {
        let response = await axios.post("/askme", newMessage, {
          headers: {
            "x-access-token": isAuth,
          },
        });
        //save ai response for auth user
        dispatch(deleteLastMessage());
        dispatch(setMessage(response.data));
      } catch (error) {
        dispatch(deleteLastMessage());
        dispatch(setMessage(askMeErrorObj));
      }
    } else {
      //prevent overuse when not logged in
      const useIndicator = {
        cu78tgGgivhcountJVGIbGguguGhgh: useCount + 1,
        UYiygc768FYexpUVIirationHi87f86DCCC: now + 24 * 60 * 60 * 1000, //current time + 24hr in milliseconds
      };
      const useIndicatorJson = JSON.stringify(useIndicator);

      if (useCount > 2) {
        //set user message
        dispatch(setMessage(newMessage));
        dispatch(setMessage(emptyMessage));

        const overUseMessage = {
          role: "assistant",
          content: "OverUse",
        };
        dispatch(deleteLastMessage());
        dispatch(setMessage(overUseMessage));
        e.target.elements[0].value = "";
        return
      } else {
        //THIS BLOCK WORKS FOR unauthenticated users below 3 usage within the day
        dispatch(setMessage(newMessage));
        dispatch(setMessage(emptyMessage));
        setAskMeVal("");

        try {
          let response = await axios.post("/askme", newMessage);
          dispatch(deleteLastMessage());
          dispatch(setMessage(response.data));
          localStorage.setItem("oats_3297", useIndicatorJson);
        } catch (error) {
          console.log(error);
          dispatch(deleteLastMessage());
          dispatch(setMessage(askMeErrorObj));
        }
      }
    }
  };


  const handleKeyPress = (e) => {
    if (screenWidth > 900 ) {
      if (e.key === "Enter" && !e.shiftKey) { 
        e.preventDefault();
        handleAskMeAnything();
      }
    }
  };


  const handleValChange = (e) => {
    setAskMeVal(e.target.value)
  }

  const toHomePage = () => {
    navigate("/")
  }

  const handleMenuToggle = () => {
    setAuthMenuOpen(!authMenuOpen)
  }

  const handleFocus = () => {
    setSuggestionDisplay(false)
  }


  return (
    <div id="askme-bg" className="askme-bg">
        <AuthSideMenu
            opened={authMenuOpen}
            seacrhBarPlaceholder=""
            hidden={!authMenuOpen}
            // resumeSubDuration={subDuration}
            // arrayDetails={userResumesAll}
        />

        <div className="chat-header">
            <div className="chat-menu-icon" onClick={handleMenuToggle}>
              
                {!authMenuOpen ? 
                    <ArrowCircleRightIcon fontSize='large' sx={{transform: "rotate(45deg)", color: "white"}} />
                :
                    <ArrowCircleLeftIcon fontSize='large' sx={{transform: "rotate(45deg)", color: "white"}} />}
                
            </div>
            <div
                className="close-icon"
                title="Close Chat"
                onClick={toHomePage}
            >
                <CloseIcon 
                    fontSize='medium'
                />
            </div>
        </div>
       


        <div className="chatbg-overlay" onClick={() => setAuthMenuOpen(false)}>


            <div className="chat-ex" ref={chatBoxRef}>
              <div style={{ padding: "0", width: "92vw", margin: "auto" }}>
                <div className={suggestionDisplay ? "suggestion-container" : "suggestion-out"}>
                  <h5>How to?</h5>
                  {suggestions.map(suggestion => {
                    return (
                      <button 
                        className="suggestion-buttons" 
                        onClick={() => {
                          setSuggestionDisplay(false)
                          setAskMeVal(suggestion.description)}
                        }
                      >
                        {suggestion.title}
                      </button>
                    )
                  })}

                </div>
              </div>

              {chatExchange}
            </div>

            <div className="ask-me-form">
                <Grid container>
                <AuthInput
                    name="askMe"
                    value={askMeVal}
                    label="Ask a Question..."
                    placeholder="Ask a Question..."
                    multiline={true}
                    inputGridSm={10}
                    mt={1}
                    rows={2}
                    maxRows={6}
                    required={true}
                    inputRef={inputRef}
                    onKeyDown={handleKeyPress}
                    onChange={handleValChange}
                    onFocus={handleFocus}
                />
                <Grid
                    item
                    xs={2}
                    sx={{ textAlign: "right", marginTop: "5px" }}
                >
                    <ButtonSubmitBlack type="button" onClick={handleAskMeAnything}>
                        <SendIcon />
                    </ButtonSubmitBlack>
                </Grid>
                </Grid>
            </div>
        </div>

    </div>
  );
};

export default AskMe;