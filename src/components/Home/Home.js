import React, { useRef, useEffect } from "react";
import ReactPixel from 'react-facebook-pixel';
import { useNavigate } from "react-router-dom";
import MenuBar from "../UI/Menu/Menu";
import "./Home.css";
import { Grid } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AuthInput from "../UI/Input/AuthInputs";
import { ButtonSubmitBlack } from "../UI/Buttons/Buttons";
import Blob from "../UI/Blob/Blob";
import categoriesData from "./categories";
import { useSelector, useDispatch } from "react-redux";
import { setMessages, setUser, setError } from "../../redux/states";
import { checkAuthenticatedUser, errorAnimation } from "../../utils/client-functions";
import ChatwootWidget from "../../utils/chatwoot";
import axios from "axios";



const Home = () => {
  const { user, error } = useSelector((state) => state.stateData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isEffectExecuted = useRef(false);


  const errorSetter = (string) => {
    dispatch(setError(string))
    errorAnimation()
  }

  const isAuth = localStorage?.getItem("token");

  useEffect(() => {
    ReactPixel.init('1133510054551065');
    ReactPixel.pageView();
  }, []);

  //fetch messages for auth user
  useEffect(() => {
    const populateUser = async () => {
      if (isAuth) {
        //only try this if isAuth present in local Storage, meaning user had previously logged into browser
        try {
          //must await
          await checkAuthenticatedUser()
        } catch (error) {
          return navigate("/popin");      
        }

        try {
          const headers = {
            "x-access-token": isAuth,
          };
          const response = await axios.get("/user/user", { headers });
          if (response.data.status === "unauthenticated" || response.data.status === "Unauthorized") {
            localStorage?.removeItem("token");
            return navigate("/popin");
          }
          
          dispatch(setMessages(response.data.user.messages[response.data.user.messages.length - 1]));
          // dispatch(setAllMessagesArray(response.data.user.messages));
          dispatch(setUser(response.data.user));
        } catch (error) {
          errorSetter("Reload page to fetch data");
        }
      } else {
        //console.log("unauthenticated");
      }
    };

    if (!isEffectExecuted.current) {
      populateUser();
      isEffectExecuted.current = true;
    }
  }, [dispatch, user, navigate, isAuth]);



  const handleFocus = () => {
    localStorage.setItem('woot', true)
    navigate("/chat")
  };



  return (
    <div>

      <MenuBar />

      <section id="ask-me" className="container" style={{ marginTop: "100px" }}>
        <div className="container-inner">
          <h1 className="ask-me-h2">Ask me anything</h1>
          <div className="error">{error}</div>
          <form className="form-ask-anything">
            <Grid container onFocus={handleFocus}>

              <AuthInput
                name="askMe"
                label="Ask a Question..."
                multiline={true}
                inputGridSm={10}
                rows={2}
                maxRows={2}
                required={true}
              />
              <Grid
                item
                xs={2}
                sx={{ textAlign: "right", marginTop: '2px' }}
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
          <h2>I can also help you with:</h2>
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
      <div 
        style={{color: "#56A8AC", fontSize: ".7rem", fontWeight: '500', textAlign: "center", textDecoration: "underline", marginBottom: "20px"}}
      >
        <a style={{color: "#56A8AC"}} href="/privacy">privacy</a>
      </div>
      <ChatwootWidget />
    </div>
  );
};

export default Home;