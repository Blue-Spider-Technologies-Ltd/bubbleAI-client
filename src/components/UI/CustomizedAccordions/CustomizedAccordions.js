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
}));




export default React.memo(function CustomizedAccordions(props) {
  const [expanded, setExpanded] = React.useState('panel1');
  const [errorRec, setErrorRec] = React.useState('');
  const [error, setError] = React.useState('');
  const [audioFile, setAudioFile] = React.useState(null);

  const recorderControls = useAudioRecorder(
    {
      noiseSuppression: true,
      echoCancellation: true,
    },
    (err) => setErrorRec(err.message) // onNotAllowedOrFound
  );


  const addAudioElement = React.useCallback(async (blob) => {
    setErrorRec('')
    const url = URL.createObjectURL(blob);
    try {
      const formData = new FormData();
      //Append Audio to form
      formData.append('audio', blob, 'audio.mp3');

      const response = await axios.post('/transcript/transcribe-meeting', formData, {
          headers: {
              'x-access-token': localStorage?.getItem('token'),
              'Content-Type': 'multipart/form-data'
          }
      })
      if(response.status === 500) {
          return setError("We are being throttled, try again after a while")
      }
      const audio = document.createElement('audio');
      audio.src = url;
      audio.controls = true;
      document.body.appendChild(audio);
    } catch (error) {
        console.log(error)
        setError("We are being throttled, try again after a while")
    }

  }, []);

//   const [audioSrc, setAudioSrc] = useState('');

// const handlePlay = () => {
//   const audio = new Audio(audioSrc);
//   audio.controls = false; // hide default controls
//   audio.play();
// };

// return (
//   <div>
//     <audio src={audioSrc} onPlay={handlePlay} />
//   </div>
// );

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Tamir Thoro #1</Typography>
        </AccordionSummary>
        <div className='error'>{errorRec}</div>
        <AccordionDetails>
          <div className={accordCss.NewTranscript}>
            <Grid container>
              <Grid item xs={!recorderControls.isRecording && 10} sx={{display: !recorderControls.isRecording ? 'flex' : 'none', alignItems: 'center'}}>
                Start New Transcription for Tamir
              </Grid>
              <Grid item xs={recorderControls.isRecording ? 12 : 2}>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                  <AudioRecorder
                    onRecordingComplete={(blob) => addAudioElement(blob)}
                    recorderControls={recorderControls}
                    showVisualizer={true}
                  />
                </div>
              </Grid>
            </Grid>
          </div>

          <div className={accordCss.Transcript}>
            <Grid container>
              <Grid item xs={10} sx={{display: 'flex', alignItems: 'center'}}>
                View Transcript 1
              </Grid>
              <Grid item xs={2} sx={{display: 'flex', justifyContent: 'space-around'}}>
                <PlayCircleIcon className={accordCss.Icon} title="Play Audio" />
                <TextSnippetIcon className={accordCss.Icon} title="View Transcript" />
              </Grid>
            </Grid>
          </div>

          <div className={accordCss.Transcript}>
            <Grid container>
              <Grid item xs={10} sx={{display: 'flex', alignItems: 'center'}}>
                View Transcript 2
              </Grid>
              <Grid item xs={2} sx={{display: 'flex', justifyContent: 'space-around'}}>
                <PlayCircleIcon className={accordCss.Icon} title="Play Audio" />
                <TextSnippetIcon className={accordCss.Icon} title="View Transcript" />
              </Grid>
            </Grid>
          </div>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
            sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>

    </div>
  );
})
