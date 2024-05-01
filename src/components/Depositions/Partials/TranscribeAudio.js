import React, { useState, useRef } from "react";
import depoCss from "../Depositions.module.css";
import resumeTemplateCss from "../../Resume/Templates/Standard/Standard.module.css";
import { useNavigate } from "react-router-dom";
import { Modal } from "../../UI/Modal/Modal";
import { ButtonSubmitGreen } from "../../UI/Buttons/Buttons";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Alert from "@mui/material/Alert";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useReactToPrint } from "react-to-print";
import { useConfirm } from "material-ui-confirm";
import { useSelector, useDispatch } from "react-redux";
import { setError } from "../../../redux/states";
import { errorAnimation } from "../../../utils/client-functions";

const TranscribeAudio = (props) => {
  const confirm = useConfirm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error } = useSelector(state => state.stateData)
  const isAuth = localStorage?.getItem("token");
  const inputRef = useRef();
  const printRef = useRef();
  const [audioTranscriptionDone, setAudioTranscriptionDone] = useState(false);
  const [transcripts, setTranscripts] = useState([]);
  const [transcribing, setTranscribing] = useState(false);
  const [file, setFile] = useState(null);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [progressStatus, setProgressStatus] = useState('Starting...');
  
  const errorSetter = (string) => {
    dispatch(setError(string))
    errorAnimation()
}

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file.type.startsWith("audio/") && !file.type.startsWith("video/")) {
      alert("Please drop only audio or video file.");
      return;
    }
    setFile(file);
  };

  const handleUploadFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleAfterPrint = () => {
    confirm({
      title: "Done Transcribing?",
      description: `If you are finished transcribing click OK`,
    })
      .then(() => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    onAfterPrint: () => handleAfterPrint(),
  });

  const handleAudioTranscription = async () => {
    const now = new Date().getTime();
    const authUser = jwt_decode(isAuth);
    if (isAuth && now < authUser.expiration) {
      if (!file) {
        errorSetter("No file/audio selected");
        return;
      }
      //get event progress
      const eventSource = new EventSource('/transcript/progress');
      //listen for SSE
      eventSource.onmessage = (event) =>  {
          const progressUpdate = JSON.parse(event.data)
          setProgressPercentage(progressUpdate.percent);
          setProgressStatus(progressUpdate.status)
          // Handle the event data as needed
      };
      try {
        setTranscribing(true);

        const formData = new FormData();
        formData.append("audio", file, file.name);

        const response = await axios.post(
          "/transcript/transcribe-file",
          formData,
          {
            headers: {
              "x-access-token": isAuth,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 500) {
          throw new Error("Something went wrong, Try again");
        }

        if (response.data.length < 1) {
          throw new Error(
            "Empty audio or Something went wrong. Reload & Try again"
          );
        }
        setTranscripts(response.data);
        setTranscribing(false);
        setAudioTranscriptionDone(true);
        eventSource.close();
      } catch (error) {
        setTranscribing(false);
        errorSetter(error.response.data.error);
        eventSource.close();
      }
    } else {
      localStorage?.removeItem("token");
      navigate("/popin");
    }
  };

  const dragDropAudio = (
    <div className="content">
      <div className="explanation-points">
        <Alert sx={{ padding: "0 5px", fontSize: ".8rem" }} severity="info">
          Within this bubble, I can convert your audio & video files to text
        </Alert>
        <Alert sx={{ padding: "0 5px", fontSize: ".8rem" }} severity="info">
          Click the panel below to upload
        </Alert>
        <Alert sx={{ padding: "0 5px", fontSize: ".8rem" }} severity="info">
          Alternatively, drag and drop your file from a folder
        </Alert>
        <Alert sx={{ padding: "0 5px", fontSize: ".8rem" }} severity="info">
          I accept only audio & video files here
        </Alert>
      </div>

      <div className="error">{error}</div>

      <div className="Segment">
        {!file ? (
          <div
            className={depoCss.DragnDrop}
            style={{ border: "4px dashed #c0d1d4" }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => inputRef.current.click()}
          >
            <h1>Drag & Drop File</h1>
            <h4>or</h4>
            <input
              type="file"
              accept="audio/*,video/*"
              onChange={handleUploadFile}
              hidden
              ref={inputRef}
            />
            <h2>click to select</h2>
          </div>
        ) : (
          <div
            className={depoCss.DragnDrop}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => inputRef.current.click()}
            style={{ border: error && "4px dashed rgb(216, 7, 7)" }}
          >
            <h1>{file.name}</h1>
            <h4 style={{ color: error && "rgb(216, 7, 7)" }}>selected</h4>
            <input
              type="file"
              accept="audio/*"
              onChange={handleUploadFile}
              hidden
              ref={inputRef}
            />
            <h2>click to change</h2>
          </div>
        )}
      </div>

      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "right",
          marginBottom: "20px",
        }}
      >
        <div style={{ width: "150px" }}>
          <ButtonSubmitGreen onClick={handleAudioTranscription}>
            <span style={{ marginRight: "5px", paddingTop: "1px" }}>
              Transcribe{" "}
            </span>{" "}
            <ArrowForwardIosIcon fontSize="inherit" />
          </ButtonSubmitGreen>
        </div>
      </div>
    </div>
  );

  const transcriptionDone = (
    <div className="content">
      <div className="error">{error}</div>

      <div className="Segment">
        <div
          ref={printRef}
          className={resumeTemplateCss.StandardContainer}
          style={{ padding: "10px" }}
        >
          {transcripts.map((transcript, index) => {
            return <p key={index}>{transcript}</p>;
          })}
        </div>
      </div>

      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "right",
          marginBottom: "20px",
        }}
      >
        <div style={{ width: "150px" }}>
          <ButtonSubmitGreen type="button" onClick={handlePrint}>
            <span style={{ marginRight: "5px", paddingTop: "1px" }}>
              Save Document
            </span>{" "}
            <ArrowForwardIosIcon fontSize="inherit" />
          </ButtonSubmitGreen>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="BodyWrapper">
        {/* ALL MEETINGS HEADER */}
        <div className="BuildNavigator">
          <div className={!audioTranscriptionDone ? "ActiveNav" : undefined}>
            <span>1</span>Upload File
          </div>
          <div className={audioTranscriptionDone ? "ActiveNav" : undefined}>
            <span>2</span>Transcribed
          </div>
        </div>

        {!audioTranscriptionDone ? dragDropAudio : transcriptionDone}
      </div>
      {transcribing && (
        <Modal
          header4='Just a moment'
          header3={progressStatus}
          progress={progressPercentage}
        />
      )}
    </div>
  );
};

export default TranscribeAudio;
