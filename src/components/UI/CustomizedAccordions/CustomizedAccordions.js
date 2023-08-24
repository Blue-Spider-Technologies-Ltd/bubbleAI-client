import * as React from 'react';
import accordCss from './CustomizedAccordions.module.css';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Grid } from "@mui/material";
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { useAudioRecorder, AudioRecorder } from 'react-audio-voice-recorder';
import axios from 'axios'
import { setMeeting } from '../../../redux/states';
import { useDispatch } from "react-redux";



const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: '5px',
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : '#7CC9CC',
  flexDirection: 'row-reverse',
  borderRadius: '5px', 
  color: 'white',    
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
    color: 'white',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}))


export default React.memo(function CustomizedAccordions(props) {
  const dispatch = useDispatch()
  const [expanded, setExpanded] = React.useState(null);
  const [expandedInner, setExpandedInner] = React.useState(null);
  const [errorRec, setErrorRec] = React.useState('');
  const [error, setError] = React.useState('');
  const [selectedParticipant, setSelectedParticipant] = React.useState(null);

  const getParticipantFirstName = (str) => {
    const index = str.indexOf(" ");
    const result = str.slice(0, index);
    return result;
  }

  const recorderControls = useAudioRecorder(
    {
      noiseSuppression: true,
      echoCancellation: true,
    },
    (err) => {
      console.error(err)
      setErrorRec(err.message)
    } // onNotAllowedOrFound
  );

  const addAudioElement = React.useCallback(async (blob, index) => {

    try {
      setErrorRec('')

      const formData = new FormData();
      formData.append('audio', blob, 'audio.mp3');
      formData.append('participantName', props.participants[index].name);

      const response = await axios.post('/transcript/transcribe-meeting', formData, {
          headers: {
              'x-access-token': localStorage?.getItem('token'),
              'Content-Type': 'multipart/form-data'
          }
      })

      console.log(response.data)
      dispatch(setMeeting(response.data))
      
      if(response.status === 500) {
        throw new Error("We are being throttled, try again after a while")
      }

    } catch (error) {
        console.error(error)
        setError("We are being throttled, try again after a while")
    }

  }, [props.participants, dispatch]);



//   const [audioSrc, setAudioSrc] = useState('');

const handlePlay = (index) => {
//
};

// return (
//   <div>
//     <audio src={audioSrc} onPlay={handlePlay} />
//   </div>
// );

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
    setSelectedParticipant(panel)
  };

  const handleChangeInner = (panel) => (event, newExpanded) => {
    setExpandedInner(newExpanded ? panel : false);
  };

  return (
    <div>
      {props.participants.length > 0 ? props.participants.map((participant, index) => {
        return (

          <Accordion key={index} expanded={expanded === index} onChange={handleChange(index)}>
            <AccordionSummary aria-controls="panel1d-content" >
              <Typography>{participant.name}</Typography>
            </AccordionSummary>
            <div className='error'>{errorRec}</div>
            <AccordionDetails>
              <div className={accordCss.NewTranscript}>
                <Grid container>
                  <Grid item xs={!recorderControls.isRecording && 10} sx={{display: !recorderControls.isRecording ? 'flex' : 'none', alignItems: 'center'}}>
                    Start New Transcription for {getParticipantFirstName(participant.name)}
                  </Grid>
                  <Grid item xs={recorderControls.isRecording ? 12 : 2}>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                      <AudioRecorder
                        onRecordingComplete={(blob) => {
                          if(index === selectedParticipant) {
                            addAudioElement(blob, index)
                          }
                        }}
                        recorderControls={recorderControls}
                        showVisualizer={true}
                      />
                    </div>
                  </Grid>
                </Grid>
              </div>

                {participant.transcripts.length > 0 ? (
                  participant.transcripts.map((transcript, index) => {
                    return (
                      <Accordion key={index} expanded={expandedInner === index} sx={{padding: '0 !important'}} onChange={handleChangeInner(index)}>
                        <AccordionSummary aria-controls="panel1d-content" expandIcon={null} sx={{padding: '0 !important', backgroundColor: 'black'}}>
                          <div className={accordCss.Transcript} style={{margin: '0 !important'}}>
                            <Grid container>
                              <Grid item xs={10} sx={{display: 'flex', alignItems: 'center'}}>
                                View Transcript {index}
                              </Grid>
                              <Grid item xs={2} sx={{display: 'flex', justifyContent: 'space-around'}}>
                                <div title="Play Audio" onClick={handlePlay(index)}>
                                  <PlayCircleIcon className={accordCss.Icon} />
                                </div>
                                <div title="View Transcript">
                                  <TextSnippetIcon className={accordCss.Icon} />
                                </div>
                                
                              </Grid>
                            </Grid>
                          </div>
                        </AccordionSummary>
                          
                        <AccordionDetails>
                          <Typography>
                            {transcript.text}
                          </Typography>
                        </AccordionDetails>
                        
                      </Accordion>
                    )
                  })

                ) : undefined}


            </AccordionDetails>
          </Accordion>
        )
      }) : undefined}


    </div>
  );
})
