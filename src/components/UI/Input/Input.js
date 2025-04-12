import React, { useState } from "react"
import { Grid, TextField, OutlinedInput, InputAdornment, IconButton, FormControl } from "@mui/material"
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


const rootStyles = {
    width: '100%',
    margin: '0 auto',
    "& .MuiOutlinedInput-input": {
        backgroundColor: "#F5F5F5",
        borderRadius: "50px",
        height: ".7rem",
        border: "none",
        outline: "none",
    },
    "& .MuiInputLabel-root": {
        color: "#14225188",
        fontSize: '.8rem'
    },
    "& .MuiOutlinedInput-root": {
        borderRadius: "50px",
        border: "none",
        outline: "none",
    },
    "&:hover .MuiOutlinedInput-input": {
        // color: "rgb(240, 240, 240)"
    },
    "&:hover .MuiInputLabel-root": {
        color: "#142251"
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        border: "none",
        outline: "none",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
        color: "#142251",
        border: "none",
        outline: "none",
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
        outline: "none",
        color: "white"
    }
};

export const Input = props => {
    const [showPassword, setShowPassword] = useState(false);
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
                    sx={{
                        ...rootStyles,
                        "& .MuiOutlinedInput-notchedOutline": {
                            border: "none",
                            outline: "none",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                            border: "none",
                            outline: "none",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            border: "none",
                            outline: "none",
                        }
                    }}
                    onChange={props.onChange}
                    value={props.value}
                    autoComplete="off"
                    required
                />
            :
                props.inputType === "password" ?
                    <FormControl variant="outlined" sx={rootStyles} required>
                        <OutlinedInput
                            id={props.placeholder}
                            type={showPassword ? 'text' : 'password'}
                            onChange={props.onChange}
                            onFocus={props.onFocus}
                            onBlur={props.onBlur}
                            sx={{
                                ...rootStyles,
                                "& .MuiOutlinedInput-notchedOutline": {
                                    border: "none",
                                    outline: "none",
                                },
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                    border: "none",
                                    outline: "none",
                                },
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                    border: "none",
                                    outline: "none",
                                }
                            }}
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
                        sx={{
                            ...rootStyles,
                            "& .MuiOutlinedInput-notchedOutline": {
                                border: "none",
                                outline: "none",
                            },
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                                border: "none",
                                outline: "none",
                            },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                border: "none",
                                outline: "none",
                            }
                        }}
                        type={props.inputType}
                        width={props.width}
                        onChange={props.onChange}
                        required
                        value={props.value}
                        disabled={props.disabled}
                    />
            }
        </Grid>
    )
}