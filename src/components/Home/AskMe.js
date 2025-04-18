import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import AuthSideMenu from "../UI/AuthSideMenu/AuthSideMenu";
import { Grid } from "@mui/material";
import StopIcon from "@mui/icons-material/Stop";
import MicIcon from '@mui/icons-material/Mic';
import CloseIcon from "@mui/icons-material/Close";
import CancelIcon from '@mui/icons-material/Cancel';
import AddIcon from '@mui/icons-material/Add';
import AuthInput from "../UI/Input/AuthInputs";
import { ButtonSubmitBlack, ButtonTransparentSquare } from "../UI/Buttons/Buttons"
import { useSelector, useDispatch } from "react-redux";
import { setMessage, deleteLastMessage, setError, setSuccessMini, setMessages, setAllMessagesArray, setFetching } from "../../redux/states";
import { Assistant, User, ScrollToBottom } from "../UI/ChatBoxes/ChatBoxes";
import { ThreeDots, Oval } from 'react-loader-spinner'
import { BiMenuAltLeft } from "react-icons/bi";
import { BiMenuAltRight } from "react-icons/bi";
import { FaArrowUp } from "react-icons/fa6";
import { LineWave } from 'react-loader-spinner'
import axios from "axios";
import { errorAnimation, successMiniAnimation, checkAuthenticatedUser, isIOSStandalonePWA } from "../../utils/client-functions";


const screenWidth = window.innerWidth




const AskMe = () => {
  const { messages, error, successMini, allMessagesArray, user } = useSelector((state) => state.stateData);
  const dispatch = useDispatch();
  const chatBoxRef = useRef(null);
  const prevScrollHeight = useRef(null);
  const navigate = useNavigate();
  const isAuth = localStorage?.getItem("token");
  const now = new Date().getTime();
  const countItemJson = localStorage?.getItem("oats_3297");
  const item = JSON.parse(countItemJson);
  const useCount = item ? item.cu78tgGgivhcountJVGIbGguguGhgh : 0;
  const expiration = item?.UYiygc768FYexpUVIirationHi87f86DCCC;
  const woot = localStorage?.getItem('woot')

  const [authMenuOpen, setAuthMenuOpen] = useState(false)
  const [askMeVal, setAskMeVal] = useState("")
  const [suggestionDisplay, setSuggestionDisplay] = useState(false)
  const [aiSuggestions, setAiSuggestions] = useState([])
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioTranscribed, setAudioTranscribed] = useState(false)
  const [transcribing, setTranscribing] = useState(false)
  const [prepCalled, setPrepCalled] = useState(false)
  const [isTyping, setIsTyping] = useState(false);
    // State for batch loading and scroll button
  const [displayedMessages, setDisplayedMessages] = useState([]);
  const [batchSize] = useState(10); // Number of messages to load at once
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const createVidContent = () => {
    setSuggestionDisplay(false)
    setAskMeVal("You are an expert content creator at a business development firm, create a social media video script of 1 minute 30 seconds on the importance of digital marketing with catchy illustrations")
  }

  const suggestionOne = {
    title: "I want a Job",
    click: () => navigate("/user/dashboard/job-hub"),
  }
  
  const suggestionTwo = {
    title: "Create Resume",
    click: () => navigate("/user/dashboard/resume"),
  }
  
  const suggestionThree = {
    title: "Create Video Content",
    click: createVidContent
  }


  const isEffectExecuted = useRef(false);
  let coverLetterPrompt = localStorage.getItem("UF76rOUFfVA6A87AJjhaf6bvaIYI9GHJFJHfgag0HFHJFAfgaHGA")

  const errorSetter = (string) => {
    dispatch(setError(string))
    errorAnimation()
  }

  const successSetter = (string) => {
    dispatch(setSuccessMini(string))
    successMiniAnimation()
  }

  const askMeErrorObj = {
    role: 'assistant',
    content:  "I am currently throttling requests, try again in a moment"
  }

  useEffect(() => {
    if (woot) {
      localStorage?.removeItem('woot')
      window.location.reload()
    }
  }, []);

  //fetch messages, interview prep, follow up email, etc for auth user
  useEffect(() => {

    const prepInStorage = localStorage?.getItem("HFLHASIGFWFIVQJKVKJJBJKVSHDVHVIVIVIVHVhvhjavcdhuchch_Int_Prep-fu-em_aghgxtdRWYRDWY") 

    const populateMessages = async () => {
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
          const response = await axios.get("/user/user/messages", { headers });
          const messagesArrayofArray = response.data.messages

          dispatch(setAllMessagesArray(messagesArrayofArray));
          dispatch(setMessages(messagesArrayofArray[messagesArrayofArray.length - 1]));
        } catch (error) {
          errorSetter("Reload page to fetch data");
        }
      } 
    };
    

    const prepFunc = async (params) => {
      const newMsg = {
        content: params
      };
      //Dispatch with empty content to enable thinking algo
      const emptyMsg = {
        role: "assistant",
        content: "",
      };
      // dispatch(setMessage(newMsg));
      dispatch(setMessage(emptyMsg));
      try {
        let response = await axios.post("/int-em", newMsg, {
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
    }


    const handleTailoredInterviewPrep = async (param) => {
      if (prepInStorage) {
        setSuggestionDisplay(false)
        successSetter("Starting, Please wait...")
        //START NEW SESSION IF OLD SESSION
        if(messages.length !== 0) {
          //push a new empty array to backend and frontend
          const emptyArr = []
          try {
            let response = await axios.post("/create-new-askme-session", emptyArr, {
              headers: {
                "x-access-token": isAuth,
              },
            });
            
            const messagesArrayofArray = response.data
            dispatch(setAllMessagesArray(messagesArrayofArray));
            dispatch(setMessages(messagesArrayofArray[messagesArrayofArray.length - 1]));
            successSetter("Generating...")
            await prepFunc(param)
          } catch (error) {
            dispatch(setFetching(false))
            errorSetter("Please try again");
            return
          }
        }
      }

    } 

    if (!prepCalled) {
      dispatch(setFetching(true))
      populateMessages()
      .then(async () => {
        setPrepCalled(true)
        await handleTailoredInterviewPrep(prepInStorage)
        dispatch(setFetching(false))
        localStorage.removeItem("HFLHASIGFWFIVQJKVKJJBJKVSHDVHVIVIVIVHVhvhjavcdhuchch_Int_Prep-fu-em_aghgxtdRWYRDWY")
      })
      .catch((error) => {
        dispatch(setFetching(false))
        errorSetter("Try again")
        localStorage.removeItem("HFLHASIGFWFIVQJKVKJJBJKVSHDVHVIVIVIVHVhvhjavcdhuchch_Int_Prep-fu-em_aghgxtdRWYRDWY")
      })
      
    }

  }, [messages.length, prepCalled]);

  // Scroll and message display logic
  const scrollToBottom = () => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  };

  const handleScroll = () => {
    if (chatBoxRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatBoxRef.current;
      const isScrolledUp = scrollHeight - scrollTop - clientHeight > 300;
      setShowScrollButton(isScrolledUp);
      
      if (scrollTop < 100 && messages.length > displayedMessages.length && !isLoadingMore) {
        loadMoreMessages();
      }
    }
  };

  const loadMoreMessages = () => {
    if (chatBoxRef.current) {
      prevScrollHeight.current = chatBoxRef.current.scrollHeight - chatBoxRef.current.scrollTop;
    }
    
    setIsLoadingMore(true);
    
    setTimeout(() => {
      const currentLength = displayedMessages.length;
      const remainingMessages = messages.length - currentLength;
      
      if (remainingMessages > 0) {
        const loadCount = Math.min(batchSize, remainingMessages);
        const startIndex = Math.max(0, messages.length - currentLength - loadCount);
        const endIndex = startIndex + loadCount;
        
        const newBatch = messages.slice(startIndex, endIndex);
        setDisplayedMessages(prev => [...newBatch, ...prev]);
      }
      
      setIsLoadingMore(false);
    }, 300);
  };

  // Initialize displayed messages
  useEffect(() => {
    if (messages.length > 0) {
      const initialCount = Math.min(batchSize, messages.length);
      const initialMessages = messages.slice(messages.length - initialCount);
      setDisplayedMessages(initialMessages);
    } else {
      setDisplayedMessages([]);
    }
  }, [messages, batchSize]);

  // Scroll event listener
  useEffect(() => {
    const chatBoxElement = chatBoxRef.current;
    if (chatBoxElement) {
      chatBoxElement.addEventListener('scroll', handleScroll);
      return () => chatBoxElement.removeEventListener('scroll', handleScroll);
    }
  }, [messages, displayedMessages.length]);
  
  // Scroll position management
  useEffect(() => {
    if (chatBoxRef.current && prevScrollHeight.current && !isLoadingMore) {
      const newScrollHeight = chatBoxRef.current.scrollHeight;
      chatBoxRef.current.scrollTop = newScrollHeight - prevScrollHeight.current;
      prevScrollHeight.current = null;
    }
  }, [displayedMessages, isLoadingMore]);

  // Auto-scroll for new messages
  useEffect(() => {
    if (messages.length > displayedMessages.length && !isLoadingMore) {
      scrollToBottom();
    }
  }, [messages.length, displayedMessages.length, isLoadingMore]);

  // Initial scroll
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      scrollToBottom();
    }, 100);
    return () => clearTimeout(timeoutId);
  }, []);

  //check and remove unauth user's expired use count for ask me anything
  useEffect(() => {
    if (expiration < now) {
      localStorage?.removeItem("oats_3297");
    }
  }, [expiration, now])


  useEffect(() => {
    if (audioTranscribed) {
      handleAskMeAnything();
      setAudioTranscribed(false)
      setTranscribing(false)
    }
  }, [audioTranscribed]);

  //Cover letter and Ai suggestions useeffect
 useEffect(() => {
    localStorage.removeItem("prevPath")
  
    const generateSuggestions = async () => {
      try {
        // const data = {
        //   suggestions: suggestionOne
        // }
        setSuggestionDisplay(true)
        // let response = await axios.post("/suggestions", data);
        // const objectData = response.data
        setAiSuggestions([suggestionOne, suggestionTwo, suggestionThree])
      } catch (error) {
        console.error(error);
      }
    }
  
    if (!isEffectExecuted.current) {
      generateSuggestions()
      isEffectExecuted.current = true;
    }
  
  }, [])
  

  const renderLineWaves = () => {
    const lineWaves = [];
    const count = screenWidth > 900 ? 10 : 8
    for (let i = 0; i < count; i++) {
      lineWaves.push(
        <LineWave
          key={i}
          visible={true}
          height="40"
          width="100%"
          color="#3E8F93"
          ariaLabel="line-wave-loading"
        />
      );
    }
    return lineWaves;
  };

  // Message rendering
  const chatExchange = displayedMessages.map((message, index) => {
    const OverUseMessage = () => (
      <div>
        <span dangerouslySetInnerHTML={{ __html: 
          `You have used up your unregistered user interactions for the day, kindly <a href="/join-bubble">Register here</a> or <a href="/popin">Log in</a> to enjoy more for FREE` 
        }} />
      </div>
    );
    
    const isAssistant = message.role === "assistant";
    let contentTrim = message.content.trim();
    const assistantMessage = useCount > 2 && !isAuth ? <OverUseMessage /> : message.content;
    
    const showTyping = index === displayedMessages.length - 1 && 
                      isAssistant && 
                      contentTrim === "" && 
                      isTyping;

    const content = isAssistant ? (
      <Assistant contentTrim={contentTrim === ""}>
        {showTyping ?        
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


  const handleAskMeAnything = async () => {

    if (askMeVal === "") {
      errorSetter("Empty question detected")
      return
    }
    setIsTyping(true);

    const newMessage = {
      role: "user",
      content: askMeVal,
    };

    //Dispatch with empty content to enable thinking algo
    const emptyMessage = {
      role: "assistant",
      content: "",
    };
    dispatch(setMessage(newMessage));
    dispatch(setMessage(emptyMessage));
    const lastFiveMessages = [...messages.slice(-4), newMessage]; 
    const promptForBackend = {
      lastFiveMessages
    }
    if (isAuth) {
      //save authenticated user message

      setAskMeVal("");
      try {
        let response = await axios.post("/askme", promptForBackend, {
          headers: {
            "x-access-token": isAuth,
          },
        });
        //save ai response for auth user
        dispatch(deleteLastMessage());
        dispatch(setMessage(response.data));
        setIsTyping(false);
        localStorage?.removeItem("UF76rOUFfVA6A87AJjhaf6bvaIYI9GHJFJHfgag0HFHJFAfgaHGA")
      } catch (error) {
        dispatch(deleteLastMessage());
        setIsTyping(false);
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

        const overUseMessage = {
          role: "assistant",
          content: "OverUse",
        };
        dispatch(deleteLastMessage());
        dispatch(setMessage(overUseMessage));
        setAskMeVal("");
        setIsTyping(false);
        return
      } else {
        //THIS BLOCK WORKS FOR unauthenticated users below 3 usage within the day
        setAskMeVal("");

        try {
          let response = await axios.post("/askme", promptForBackend);
          dispatch(deleteLastMessage());
          dispatch(setMessage(response.data));
          localStorage.setItem("oats_3297", useIndicatorJson);
          setIsTyping(false);
        } catch (error) {
          dispatch(deleteLastMessage());
          dispatch(setMessage(askMeErrorObj));
        }
      }
    }
  };

  
  const handleRecordAudio = () => {
    setSuggestionDisplay(false);
    if (!recording) {
      if (navigator.mediaDevices?.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ audio: true })
          .then(stream => {
            const mediaRecorder = new MediaRecorder(stream);
            const audioChunks = [];
            
            mediaRecorder.ondataavailable = (event) => {
              audioChunks.push(event.data);
            };
            
            mediaRecorder.onstop = () => {
              const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
              // iOS typically records in AAC (m4a), others default to webm/mp3
              const blobType = isIOS ? 'audio/mp4' : 'audio/webm'; // Use 'audio/mp4' for AAC

              const audioBlob = new Blob(audioChunks, { type: blobType });
              setAudioBlob(audioBlob);
            };
            
            mediaRecorder.start();
            setRecording(true);
            setMediaRecorder(mediaRecorder);
          })
          .catch(error => {
            errorSetter('Microphone access denied');
          });
      } else {
        errorSetter('Audio recording not supported');
      }
    } else {
      if (mediaRecorder) mediaRecorder.stop();
      setRecording(false);
    }
  };
  

  const handleSendAudio = async () => {
    if (!audioBlob || !mediaRecorder || mediaRecorder.state !== 'inactive') {
      return errorSetter('No audio to send');
    }
  
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const fileName = isIOS ? 'audio.m4a' : 'audio.webm'; // .m4a for iOS, .webm for others

    const formData = new FormData();
    formData.append('audio', audioBlob, fileName);
  
    setAudioBlob(null);
    setTranscribing(true);
    setIsTyping(true);
  
    try {
      const response = await axios.post('/transcript/transcribe-askme', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Required for file uploads
        },
      });
      
      setAskMeVal(response.data);
      setAudioTranscribed(true);
      setMediaRecorder(null);
    } catch (error) {
      setTranscribing(false);
      setIsTyping(false);
      errorSetter(`Transcription failed: ${error.response?.data?.error || 'Try again'}`);
    }
  };

  const handleNewSession = async () => {
    if(!isAuth) {
      return errorSetter("Log in to access this feature")
    }
    if (messages.length === 0) {
      errorSetter("Already a new session")
    } else {
      dispatch(setFetching(true))
      //push a new empty array to backend and frontend
      const emptyArr = []
      try {
        let response = await axios.post("/create-new-askme-session", emptyArr, {
          headers: {
            "x-access-token": isAuth,
          },
        });
        
        const messagesArrayofArray = response.data
        dispatch(setAllMessagesArray(messagesArrayofArray));
        dispatch(setMessages(messagesArrayofArray[messagesArrayofArray.length - 1]));
        dispatch(setFetching(false))
        successSetter("New Chat Session Started")
        return
      } catch (error) {
        dispatch(setFetching(false))
        errorSetter(error?.response?.data?.error);
      }
    }
  }

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
    <div id="askme-bg" className="askme-bg" onClick={handleFocus}>
        <AuthSideMenu
            opened={authMenuOpen}
            seacrhBarPlaceholder=""
            hidden={!authMenuOpen}
            firstName={user.firstName}
            arrayDetails={allMessagesArray}
        />
        <div className="error">{error}</div>
        <div className="success-mini">{successMini}</div>

        <div className="chat-header" style={{paddingTop: isIOSStandalonePWA() && "50px"}}>
          <div className="chat-menu-icon" title="Menu">
            
              {!authMenuOpen ? 
                <BiMenuAltLeft size='2.1em' onClick={handleMenuToggle} />
              :
                <BiMenuAltRight size='2.1em' onClick={handleMenuToggle} />}
          </div>
          <div 
            title="Start New Session"
            style={{ marginLeft: "-65%", height: "2rem" }}
          >
            <AddIcon 
              fontSize='large'
              sx={{color: "#3E8F93", cursor: "pointer"}}
              onClick={handleNewSession}
            />
          </div>
          {/* <AddCircleIcon fontSize='large' sx={{color: "white"}} /> */}
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
            <div className="chat-ex" ref={chatBoxRef} onScroll={handleScroll}>
              {isLoadingMore && (
                <div className="loading-more-messages">
                  <ThreeDots 
                    height="25" 
                    width="25" 
                    radius="9"
                    color="#3E8F93" 
                    ariaLabel="loading-more-messages"
                    visible={true}
                  />
                </div>
              )}
              <div style={{ padding: "0", width: "92vw", margin: "auto" }}>
                <div className={suggestionDisplay ? "suggestion-container" : "suggestion-out"}>
                  {coverLetterPrompt ? (
                    <span style={{color: "white"}}>Read the query in the input field (edit if necessary) and click the send icon to generate Cover Letter</span>
                  ) : (
                    <div>
                      <p style={{color: "white"}}>Hi, I am <strong>Bubble Ai</strong>. How can I assist you today?</p>

                      {aiSuggestions.map((suggestion, index) => {
                        return (
                          <button 
                            key={index}
                            className="suggestion-buttons" 
                            onClick={suggestion.click}
                          >
                            {suggestion.title}
                          </button>
                        )
                      })}
                    </div>
                  )}
                  
                </div>
              </div>

              {chatExchange}
              
              <ScrollToBottom 
                onClick={scrollToBottom} 
                visible={showScrollButton} 
              />
            </div>

            <div className="ask-me-form">

              <Grid container sx={{ position: 'relative' }}>
                {recording ? (
                  <Grid container>
                    <Grid item xs={10} sx={{ display: 'flex', justifyContent: 'center', height: "100px" }}>
                      {renderLineWaves()} 
                    </Grid>
                    <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                      <StopIcon sx={{ color: 'rgb(216, 7, 7)', fontSize: '2.2em', cursor: 'pointer'}} onClick={handleRecordAudio} />
                    </Grid>
                  </Grid>

                ) : audioBlob ? (
                  <Grid container>
                    <Grid item xs={10}>
                      <audio controls style={{ width: "100%", marginTop: screenWidth > 900 ? '15px' : "5px", marginLeft: '10px' }}>
                        <source src={URL.createObjectURL(audioBlob)} type="audio/mp3" style={{ height: "50px" }} />
                      </audio>
                    </Grid>
                    <Grid item xs={2}>
                      <ButtonSubmitBlack onClick={handleSendAudio}>
                        <FaArrowUp style={{ color: "#3E8F93", fontSize: '2.2em', cursor: 'pointer' }} />
                      </ButtonSubmitBlack>
                      <ButtonSubmitBlack onClick={() => setAudioBlob(null)}>
                        <CancelIcon sx={{ color: "rgb(216, 7, 7)", fontSize: '1.8em', cursor: 'pointer' }} />
                      </ButtonSubmitBlack>
                    </Grid>
                  </Grid>
                ) : (
                  <>
                    <AuthInput
                      name="askMe"
                      value={askMeVal}
                      label="Ask a Question..."
                      placeholder="Ask a Question..."
                      multiline={true}
                      inputGridSm={12}
                      askMe={true}
                      mt={1}
                      rows={4}
                      mb={5}
                      maxRows={5}
                      required={true}
                      onKeyDown={handleKeyPress}
                      onChange={handleValChange}
                      onFocus={handleFocus}
                    />
                    <div style={{
                      position: 'absolute',
                      right: '10px',
                      bottom: '3rem',
                      zIndex: 1
                    }}>
                      {(() => {
                        if (askMeVal) {
                          return (
                            <ButtonTransparentSquare 
                              type="button" 
                              onClick={handleAskMeAnything}
                              color=""
                              width="50px"
                              height="50px"
                              bgColor="#f3f0f15c"
                              borderRadius="50%"
                            >
                              <FaArrowUp style={{ color: "#3E8F93", fontSize: '2.2em' }} />
                            </ButtonTransparentSquare>
                          );
                        }
                    
                        
                        return (
                          <ButtonTransparentSquare 
                            type="button" 
                            onClick={handleRecordAudio}
                            color=""
                            width="50px"
                            height="50px"
                            bgColor="#f3f0f15c"
                            borderRadius="50%"
                          >
                            {transcribing ? (
                              <Oval
                                visible={true}
                                height="30"
                                width="30"
                                color="#3E8F93"
                                ariaLabel="oval-loading"
                              />
                            ) : (
                              <MicIcon sx={{ fontSize: '2.2em', color: '#3E8F93' }} />
                            )}
                          </ButtonTransparentSquare>
                        );
                      })()}
                    </div>
                  </>
                )}
              </Grid>
            </div>
        </div>
    </div>
  );
};

export default AskMe;
