import React, { useState } from 'react';
import { Grid } from "@mui/material";
import AuthInput from '../../UI/Input/AuthInputs';

const Meeting = (props) => {

    const [error, setError] = useState(false);
    const [participants, addParticipants] = useState([""]);
    const [meetingTitle, setMeetingTitle] = useState("");
    
    //////Participants HANDLERS
    const handleAddParticipant = () => {
        setError("")
        const newPartcipant = ""
        if(participants.length < 10) {
            return addParticipants([...participants, newPartcipant])
        }
        setError("You can add a maximum of 10 participants")
    }
    const handleDeleteParticipant = () => {
        setError("")
        if(participants.length > 1) {
            const prevParticipants = [...participants]
            prevParticipants.pop()
            return addParticipants([...prevParticipants])
        }
        setError("Leave blank, don't delete")
    }
    const handleParticipantChange = (event, index) => {
        const prevParticipants = [...participants];
        prevParticipants[index] = event.target.value
        addParticipants(prevParticipants)
    };
    

    const handleMeetingChange = event => {
        setMeetingTitle(event.target.value)
    }
    
    return (
        <div className="BodyWrapper">
            <div className="BuildNavigator">
                <div className="ActiveNav"><span>1</span>Add Participants</div>
                <div><span>2</span>Transcribe</div>
            </div>
            <form>
                <div className='error'>{error}</div>
            
                <div className="Segment">
                    <h4>Meeting Details</h4>
                    <div>
                        <Grid container>
                            <AuthInput 
                                name="meetingTitle" 
                                value={meetingTitle} 
                                label="Meeting Title" 
                                inputType="text" 
                                inputGridSm={12} 
                                inputGrid={12} 
                                mb={2} 
                                required={true} 
                                onChange={handleMeetingChange} 
                            />
                        </Grid>
                    </div>
                </div>

                <div className="Segment">
                    <h4>Participants</h4>
                    <Grid container>
                    {participants.map((participant, index) => {
                            return <AuthInput 
                                        key={index} 
                                        label="Participant Full Name" 
                                        value={participant} 
                                        inputType="text" 
                                        inputGridSm={8} 
                                        inputGrid={8}
                                        mb={2} 
                                        required={true} 
                                        onChange={(event) => handleParticipantChange(event, index)}
                                    />
                        })}
                        <Grid item xs={4} sx={{display: "flex", justifyContent: "center"}}>
                            <div style={{marginRight: "10px"}} className='delete' title='Delete Link' onClick={handleDeleteParticipant}>-</div>
                            <div className='add' title='Add More Links' onClick={handleAddParticipant}>+</div>
                        </Grid>
                    </Grid>
                </div>

            </form>

        </div>
    )
}

export default Meeting;