import React, { useState } from "react"
import { Grid, TextField, OutlinedInput, InputAdornment, IconButton, FormControl } from "@mui/material"
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { makeStyles } from "@mui/styles";


const useStyles = makeStyles({
    root: {
        width: '100%',
        margin: '0 auto',
        "& .MuiOutlinedInput-input": {
            backgroundColor: "#F5F5F5",
            borderRadius: "10px",
            height: ".7rem",
        },
        "& .MuiInputLabel-root": {
            color: "#14225188",
            fontSize: '.8rem'
        },
        "& .MuiOutlinedInput-root": {
            borderRadius: "10px",
            border: "1px solid #F5F5F5"
            
        },
        "&:hover .MuiOutlinedInput-input": {
            // color: "rgb(240, 240, 240)"
        },
        "&:hover .MuiInputLabel-root": {
            color: "#142251"
        },
        "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            border: ".6px solid #c3c3c3"
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
            color: "#142251",
            border: ".6px solid #c3c3c3"
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
    const [showPassword, setShowPassword] = useState(false);
    const classes = useStyles();
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    return (
        <Grid item md={props.inputGrid} xs={props.inputGridSm} px={1} mb={3} sx={{boxSizing: "border-box"}}>
            {props.multiline ? 
                <TextField
                    id="outlined-multiline-static"
                    label={props.label}
                    multiline
                    rows={4}
                    className={classes.root} 
                    onChange={props.onChange}
                    value={props.value}
                    autoComplete="off"
                    required
                />
            :

                props.inputType === "password" ?
                    <FormControl variant="outlined" className={classes.root} required>
                        
                        <OutlinedInput
                            id={props.placeholder}
                            type={showPassword ? 'text' : 'password'}
                            onChange={props.onChange}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    value={props.value}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    >
                                    {showPassword ? <VisibilityOff /> : <Visibility sx={{color: "#6FCBD1"}} />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            placeholder={props.placeholder}
                        />
                    </FormControl>
                :
                    <TextField 
                        id={"outlined-basic" + props.label + props.placeholder}
                        placeholder={props.placeholder} 
                        variant="outlined" 
                        className={classes.root}
                        type={props.inputType}
                        width={props.width}
                        onChange={props.onChange}
                        required
                        // value={props.value}
                    />
                
            }
        </Grid>
    )
}
