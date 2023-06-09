import React, { useState } from "react"
import { Grid, TextField, OutlinedInput, InputAdornment, IconButton, FormControl, InputLabel, MenuItem } from "@mui/material"
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { makeStyles } from "@mui/styles";
import Select from '@mui/material/Select';


const useStyles = makeStyles({
    root: {
        width: '100%',
        margin: '0 auto',
        borderRadius: "5px",
        "& .MuiOutlinedInput-input": {
            backgroundColor: "#F5F5F5",
            borderRadius: "5px",
            paddingTop: ".35rem",
            paddingBottom: ".35rem",
            fontSize: ".8rem"
        },
        "& .MuiInputLabel-root": {
            color: "#14225188",
            fontSize: '.7rem',   
            marginTop: "-.4rem"
        },
        "& .MuiOutlinedInput-root": {
            borderRadius: "5px",
            border: "1px solid #F5F5F5"
            
        },
        "&:hover .MuiOutlinedInput-input": {
            // color: "rgb(240, 240, 240)"
        },
        "&:hover .MuiInputLabel-root": {
            //color: "#142251",
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


export const AuthInput = props => {
    const [showPassword, setShowPassword] = useState(false);
    const classes = useStyles();
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    return (
        <Grid item md={props.inputGrid} xs={props.inputGridSm} px={1} mb={props.mb} sx={{boxSizing: "border-box"}}>
            {props.multiline ? 
                <TextField
                    id="outlined-multiline-static"
                    label={props.label}
                    placeholder={props.placeholder}
                    multiline
                    rows={props.rows}
                    className={classes.root} 
                    onChange={props.onChange}
                    autoComplete="off"
                    required={props.required}
                />
            :

            props.inputType === "password" ?
                <FormControl variant="outlined" className={classes.root} autoComplete="off" required={props.required}>
                    
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
            props.inputType === "select" ?
                <FormControl className={classes.root} autoComplete="off" required={props.required}>
                    <InputLabel id="demo-simple-select-helper-label">{props.label}</InputLabel>
                    <Select
                    id={props.label}
                    onChange={props.changed}
                    name={props.name}
                    >
                    <MenuItem >
                        <em>{props.label}</em>
                    </MenuItem>
                    {props.list.length !== 0 ? props.list.map((option, index) => {
                        return <MenuItem key={index} value={option.mobileCode}>{option.mobileCode} {option.name}</MenuItem>
                    }) : [{mobileCode: "Country code"}].map((option, index) => {
                        return <MenuItem key={index} value={option.mobileCode}>{option.mobileCode}</MenuItem>
                    })}
                    </Select>
                </FormControl>
            :
            props.inputType === "select2" ?
                <FormControl className={classes.root} autoComplete="off" required={props.required}>
                    <InputLabel id="demo-simple-select-helper-label">{props.label}</InputLabel>
                    <Select
                    id={props.label}
                    onChange={props.changed}
                    name={props.name}
                    >
                    <MenuItem>
                        <em>{props.label}</em>
                    </MenuItem>
                    {props.list.length !== 0 ? props.list.map((option, index) => {
                        return <MenuItem key={index} value={option.name}>{option.name}</MenuItem>
                    }) : [{name: "Country code"}].map((option, index) => {
                        return <MenuItem key={index} value={option.name}>{option.name}</MenuItem>
                    })}
                    </Select>
                </FormControl>
            :
                <TextField 
                    id={"outlined-basic" + props.label + props.placeholder}
                    placeholder={props.placeholder} 
                    label={props.label}
                    variant="outlined" 
                    className={classes.root}
                    type={props.inputType}
                    width={props.width}
                    onChange={props.onChange}
                    autoComplete="off"
                    required={props.required}
                    disabled={props.disabled}
                    // value={props.value}
                />                                                          
                
            }
        </Grid>
    )
}
