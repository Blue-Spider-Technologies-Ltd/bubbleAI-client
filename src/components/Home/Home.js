import React, { useState, useEffect } from "react";
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
import axios from "axios";


const Home = () => {
  const { user, error } = useSelector((state) => state.stateData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const errorSetter = (string) => {
    dispatch(setError(string))
    errorAnimation()
  }



  const isAuth = localStorage?.getItem("token");



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
        //Check if user and messages set for authenticated user, if not, set
        if (Object.keys(user).length > 0) {
          dispatch(setMessages(user?.messages));
        } else {
          try {
            const headers = {
              "x-access-token": isAuth,
            };
            const response = await axios.get("/user/user", { headers });
            if (response.data.status === "unauthenticated" || response.data.status === "Unauthorized") {
              localStorage?.removeItem("token");
              return navigate("/popin");
            }
            
            dispatch(setMessages(response.data.user.messages));
            dispatch(setUser(response.data.user));
          } catch (error) {
            errorSetter("Reload page to fetch data");
          }
        }
      } else {
        //console.log("unauthenticated");
      }
    };
    populateUser();
  }, [dispatch, user, navigate, isAuth]);



  const handleFocus = () => {
    navigate("/chat")
  };



  return (
    <div>
      <MenuBar />



      <section id="ask-me" className="container" style={{ marginTop: "100px" }}>
        <div className="container-inner" onFocus={handleFocus}>
          <h1 className="ask-me-h2">Ask me anything</h1>
          <div className="error">{error}</div>
          <form className="form-ask-anything">
            <Grid container>

              <AuthInput
                name="askMe"
                // value={info.industry}
                label="Ask a Question..."
                placeholder="Ask a Question..."
                multiline={true}
                inputGridSm={10}
                // mt={1}
                rows={2}
                maxRows={2}
                required={true}
              />
              <Grid
                item
                xs={2}
                sx={{ textAlign: "right" }}
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
    </div>
  );
};

export default Home;