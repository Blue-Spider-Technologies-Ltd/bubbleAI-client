import React from "react"
import { Grid, TextField } from "@mui/material"
import { makeStyles } from "@mui/styles";


const useStyles = makeStyles({
    root: {
        width: '100%',
        margin: '0 auto',
        "& .MuiOutlinedInput-input": {
            backgroundColor: "#F5F5F5",
            borderRadius: "10px",
            height: "1rem",
        },
        "& .MuiInputLabel-root": {
            color: "#14225188",
            fontSize: '.8rem'
        },
        "& .MuiOutlinedInput-root": {
            borderRadius: "10px",
            backgroundColor: "#F5F5F5",
        },
        "&:hover .MuiOutlinedInput-input": {
            // color: "rgb(240, 240, 240)"
        },
        "&:hover .MuiInputLabel-root": {
            color: "#142251"
        },
        "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            border: "none"
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
            color: "#142251",
        },
        "& .MuiInputLabel-root.Mui-focused": {
            //Edits the Form Label when cusor is focused
            color: "#FFFFFF",
            borderRadius: '4px',
            padding: '2px 10px',
            backgroundColor: "#6FCBD1"
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "none",
            color: "white"
        }
    },

});


export const Input = props => {
    const classes = useStyles();
    return (
        <Grid item xs={props.inputGrid} sm={props.inputGridSm} px={1} mb={3} sx={{boxSizing: "border-box"}}>
            {props.multiline ? 
                <TextField
                    id="outlined-multiline-static"
                    label={props.label}
                    multiline
                    rows={4}
                    className={classes.root} 
                    autoComplete="off"
                    required
                />
            :
                <TextField 
                    id={"outlined-basic" + props.label}
                    placeholder={props.placeholder} 
                    variant="outlined" 
                    className={classes.root} 
                    type={props.inputType}
                    width={props.width}
                    autoComplete="off"
                    required
                    // value={props.value}
                />
            }
        </Grid>
    )
}
