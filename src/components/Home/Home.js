import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import MenuBar from "../UI/Menu/Menu";
import "./Home.css";
import { Grid } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import { Input } from "../UI/Input/Input";
import { ButtonSubmitBlack } from "../UI/Buttons/Buttons";
import Blob from "../UI/Blob/Blob";
import categoriesData from "./categories";
import { useSelector, useDispatch } from "react-redux";
import { setMessages, setMessage, setUser, deleteLastMessage } from "../../redux/states";
import { Assistant, User } from "../UI/ChatBoxes/ChatBoxes";
import { ThreeDots } from 'react-loader-spinner'
import axios from "axios";


const Home = () => {
  const [isFocused, setFocused] = useState(false);
  const [chatBgFocused, setChatBgFocused] = useState(false);
  const [error, setError] = useState("");
  const { messages, user } = useSelector((state) => state.stateData);
  const dispatch = useDispatch();
  const chatBoxRef = useRef(null);
  const navigate = useNavigate();
  const now = new Date().getTime();
  const countItemJson = localStorage?.getItem("oats_3297");
  const item = JSON.parse(countItemJson);
  const useCount = item ? item.cu78tgGgivhcountJVGIbGguguGhgh : 0;
  const expiration = item && item.UYiygc768FYexpUVIirationHi87f86DCCC;


  const askMeErrorObj = {
            role: 'assistant',
            content:  "I am currently throttling requests, try again in a moment"
          }

  const isAuth = localStorage?.getItem("token");

  
  useEffect(() => {
    // Scroll to bottom on new message
    chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  }, [messages]);

  //check and remove unauth user's expired use count for ask me anything
  useEffect(() => {
    if (expiration < now) {
      localStorage?.removeItem("oats_3297");
    }
  }, [expiration, now])

  useEffect(() => {
    const populateUser = async () => {
      if (isAuth) {
        //Check if user and messages set for authenticated user, if not, set
        if (Object.keys(user).length > 0) {
          dispatch(setMessages(user.messages));
        } else {
          try {
            const headers = {
              "x-access-token": isAuth,
            };
            const response = await axios.get("/user/user", { headers });
            if (response.data.status === "unauthenticated") {
              localStorage?.removeItem("token");
              return navigate("/popin");
            }
            dispatch(setMessages(response.data.user.messages));
            dispatch(setUser(response.data.user));
          } catch (error) {
            console.log(error);
            setError("Reload page to fetch data");
          }
        }
      } else {
        //console.log("unauthenticated");
      }
    };
    populateUser();
  }, [dispatch, user, navigate, isAuth]);


  //Chat Effect on ask me anything styling changes on input focus
  useEffect(() => {
    const chatBg = document.getElementById("chat-bg");
    const askMeContainer = document.getElementById("ask-me");
    const askMeContainerInner = askMeContainer.querySelector(".container-inner");
    const categories = document.getElementById("categories");

    if (isFocused) {
      chatBg.classList.add("chat-bg-in");
      chatBg.classList.remove("chat-bg-out");
      chatBg.style.height = window.innerHeight + "px";
      askMeContainer.classList.remove("container");
      askMeContainerInner.classList.add("container-inner-borderless");
      askMeContainerInner.style.position = "fixed";
      askMeContainerInner.style.top = window.innerHeight;
      askMeContainerInner.style.bottom = "30px";
      askMeContainer.querySelector(".ask-me-h2").style.display = "none";
      categories.classList.add("categories");
      //This if block will align the chat bg and input field on mobile when the keyboard pops in
      if (chatBgFocused) {
        chatBg.style.position = "absolute";
        chatBg.style.bottom = "0";
        askMeContainerInner.style.position = "fixed";
        askMeContainerInner.style.bottom = "20px";
      }
    } else {
      chatBg.classList.remove("chat-bg-in");
      chatBg.classList.add("chat-bg-out");
      chatBg.style.height = "80vh";
      askMeContainer.classList.add("container");
      askMeContainerInner.style.position = "static";
      askMeContainerInner.classList.remove("container-inner-borderless");
      askMeContainer.querySelector(".ask-me-h2").style.display = "block";
      categories.classList.remove("categories");
    }
  }, [isFocused, chatBgFocused]);

  const chatExchange = messages.map((message, index) => {
    const isAssistant = message.role === "assistant";
    const contentTrim = message.content.trim()
    const content = isAssistant? (
      <Assistant>{contentTrim === "" ?        
      <ThreeDots 
        height="25" 
        width="25" 
        radius="9"
        color="#000" 
        ariaLabel="three-dots-loading"
        visible={true}
      /> : message.content
    }
      </Assistant>
    ) : (
      <User>{message.content}</User>
    );
    return <div key={index}>{content}</div>;
  });

  const handleFocus = () => {
    setFocused(true);
    setChatBgFocused(false);
  };

  const handleAskMeAnything = async (e) => {
    e.preventDefault();

    const newMessage = {
      role: "user",
      content: e.target.elements[0].value,
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
      e.target.elements[0].value = "";
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
        console.log(error);
        dispatch(deleteLastMessage());
        dispatch(setMessage(askMeErrorObj));
      }
    } else {
      //prevent overuse when not registered/logged in
      const useIndicator = {
        cu78tgGgivhcountJVGIbGguguGhgh: useCount + 1,
        UYiygc768FYexpUVIirationHi87f86DCCC: now + 24 * 60 * 60 * 1000, //current time + 24hr in milliseconds
      };
      const useIndicatorJson = JSON.stringify(useIndicator);

      if (useCount > 1) {
        dispatch(setMessage(newMessage));
        dispatch(setMessage(emptyMessage));
        const overUseMessage = {
          role: "assistant",
          content:
            "You have used up your free interactions for the day, kindly register to enjoy more",
        };
        dispatch(deleteLastMessage());
        dispatch(setMessage(overUseMessage));
        e.target.elements[0].value = "";
      } else {
        //THIS BLOCK WORKS FOR unauthenticated users below 3 usage within the day
        dispatch(setMessage(newMessage));
        dispatch(setMessage(emptyMessage));
        e.target.elements[0].value = "";

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

  const handleChatBgFocus = () => {
    setChatBgFocused(true);
  };

  return (
    <div>
      {!isFocused ? <MenuBar /> : null}

      <section id="chat-bg" className="chat-bg" onClick={handleChatBgFocus}>
        <div
          className="close-icon"
          title="Close Chat"
          onClick={() => setFocused(false)}
        >
          <CloseIcon 
            sx={{ fontSize: "1.5rem" }} 
          />
        </div>
        <div className="chatbg-overlay" ref={chatBoxRef}>
          {chatExchange}
        </div>
      </section>

      <section id="ask-me" className="container" style={{ marginTop: "100px" }}>
        <div className="container-inner" onFocus={handleFocus}>
          <h1 className="ask-me-h2">Ask me anything</h1>
          <div className="error">{error}</div>
          <form onSubmit={handleAskMeAnything} className="form-ask-anything">
            <Grid container>
              <Input
                placeholder="Ask a Question..."
                inputType="text"
                name="askMe"
                inputGrid={10}
                inputGridSm={10}
              />
              <Grid
                item
                xs={2}
                sx={{ textAlign: isFocused ? "center" : "right" }}
              >
                <ButtonSubmitBlack>
                  <SendIcon />
                </ButtonSubmitBlack>
              </Grid>
            </Grid>
          </form>
        </div>
      </section>

      <section id="categories" className="container">
        <div className="container-inner">
          <h2>I can help you with:</h2>
          <Grid container>
            {categoriesData.map((data, index) => {
              return (
                <Grid item xs={12} md={6} lg={4} mb={5} key={index}>
                  <Blob
                    link={isAuth ? data.isAuthURL : data.unAuthURL}
                    bgImage={data.image}
                    altText={data.title}
                    desc={data.desc}
                    title={data.title}
                  />
                  <h3>{data.title}</h3>
                </Grid>
              );
            })}
          </Grid>
        </div>
      </section>
    </div>
  );
};

export default Home;