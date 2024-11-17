import React, { useState, memo } from "react"
import { 
    Grid, 
    TextField, 
    TextareaAutosize, 
    OutlinedInput, 
    InputAdornment, 
    IconButton, 
    FormControl, 
    InputLabel, 
    MenuItem, 
    Checkbox, 
    FormControlLabel 
} from "@mui/material"
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Select from '@mui/material/Select';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import allInputCss from "./Allinputs.module.css"
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import {
    CountrySelect,
    StateSelect
  } from "react-country-state-city";
  
import "react-country-state-city/dist/react-country-state-city.css";
const screenWidth = window.innerWidth




const AuthInput = props => {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    const textFieldStyles = {
        width: '100% !important',
        margin: '0 auto',
        borderRadius: "50px",
        fontSize: "16px",
        "& .MuiOutlinedInput-input": {
            backgroundColor: "#F5F5F5",
            borderRadius: "50px",
            paddingTop: ".35rem",
            paddingBottom: ".35rem",
            fontSize: "16px"
        },
        "& .MuiInputLabel-root": {
            color: "#14225188",
            fontSize: '16px',   
            marginTop: "-.4rem"
        },
        "& .MuiOutlinedInput-root": {
            borderRadius: "50px",
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
            color: "#000",
            borderRadius: '4px',
            padding: '2px 10px',
            backgroundColor: "#6FCBD1",
            fontSize: '16px',
            fontWeight: '600',
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "none",
            color: "white"
        }
    };

    const textareaStyles = {
        width: '100%',
        margin: '0 auto',
        borderRadius: screenWidth > 900 ? "50px" : '20px',
        fontSize: "16px",
        backgroundColor: "#F5F5F5",
        padding: ".35rem",
        "&:hover": {
            border: "none"
        },
        "&:focus": {
            color: "#142251",
            border: "none",
            backgroundColor: "white",
            outline: "none",
        }
    };
    
    const checkboxStyles = {
        width: "25px",
        height: "25px",
        '&.MuiCheckbox-colorSecondary.Mui-checked': {
            color: '#56A8AC'
        },
        '& .MuiTypography-root': {
          fontSize: '.85rem', // Example: Change label font weight
          lineHeight: '.85'
        },
    };
    

    return (
        <Grid item md={props.inputGrid} inputref={props.inputRef} onKeyDown={props.onKeyDown} xs={props.inputGridSm} px={1} mt={props.mt} mb={props.mb} sx={{boxSizing: "border-box"}}>
            {props.multiline ? 
                <TextareaAutosize 
                    id={props.id}
                    label={props.label}
                    placeholder={props.placeholder}
                    // rows={props.rows}
                    minRows={props.rows}
                    maxRows={props.maxRows}
                    style={textareaStyles} 
                    onChange={props.onChange}
                    autoComplete="off"
                    required={props.required}
                    disabled={props.disabled}
                    value={props.value}
                    name={props.name}
                    onFocus={props.onFocus}
                />
            :
            props.inputType === "checkbox" ? 
                <FormControlLabel
                    value="end"
                    sx={checkboxStyles} 
                    control={<Checkbox 
                                name={props.name}
                                checked={props.value}
                                onChange={props.onChange}
                                sx={checkboxStyles} 
                                inputProps={{ 'aria-label': 'controlled' }}
                                color="secondary"
                                disabled={props.disabled}
                            />}
                    label={props.label}
                    labelPlacement="end"
                />
            :
            props.inputType === "password" ?
                <FormControl variant="outlined" sx={textFieldStyles} required={props.required}>
                    <OutlinedInput
                        id={props.id}
                        type={showPassword ? 'text' : 'password'}
                        label={props.label}
                        placeholder={props.label}
                        onChange={props.onChange}
                        value={props.value}
                        onFocus={props.onFocus}
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
                    />
                </FormControl>
            :
            props.inputType === "country-select" ?
                <CountrySelect
                    name={props.name}
                    onChange={props.onChange}
                    placeHolder={props.placeholder}
                    inputClassName={allInputCss.stateCountryCss}
                    containerClassName={allInputCss.stateCountryCont}
                    value={props.value}
                    required={props.required}
                />
            :
            props.inputType === "state-select" ?
                <StateSelect
                    name={props.name}
                    countryid={props.countryid}
                    onChange={props.onChange}
                    placeHolder={props.placeholder}
                    inputClassName={allInputCss.stateCountryCss}
                    containerClassName={allInputCss.stateCountryCont}
                    value={props.value}
                    required={props.required}
                />
            :
            props.inputType === "select" ?
                <FormControl sx={textFieldStyles} required={props.required}>
                    <InputLabel id="demo-simple-select-helper-label">{props.label}</InputLabel>
                    <Select
                        id={props.id}
                        onChange={props.onChange}
                        name={props.name}
                        value={props.value}
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
                <FormControl sx={textFieldStyles} required={props.required}>
                    <InputLabel id="demo-simple-select-helper-label">{props.label}</InputLabel>
                    <Select
                        id={props.id}
                        onChange={props.onChange}
                        name={props.name}
                        value={props.value}
                        MenuProps={{
                            style: {
                                zIndex: 1000000, // Increase the zIndex value to make it appear above all modals
                            }
                        }}
                    >
                        <MenuItem>
                            <em>{props.label}</em>
                        </MenuItem>
                        {props.list.length !== 0 ? props.list.map((option, index) => {
                            return <MenuItem key={index} value={option.name}>{option.name}</MenuItem>
                        }) : [{name: ''}].map((option, index) => {
                            return <MenuItem key={index} value={option.name}>{option.name}</MenuItem>
                        })}
                    </Select>
                </FormControl> 
            :
            props.inputType === "mobile" ?
                <PhoneInput 
                    country='ng' 
                    inputClass={allInputCss.Mobile}
                    onChange={props.onChange}
                    required={props.required}
                    value={props.value}
                    disabled={props.disabled}
                    enableSearch={true}
                />
            :
            props.inputType === "search" ?
                <Paper
                    component="form"
                    sx={{display: props.hidden ? 'none' : 'flex', alignItems: 'center', borderRadius: '50px', padding: '0 10px'}}
                >
                    <InputBase
                        // sx={{ ml: 1, flex: 1 }}
                        placeholder={props.placeholder}
                        inputProps={{ 'aria-label': props.placeholder }}
                        sx={textFieldStyles}
                        value={props.value}
                        onChange={props.onChange}
                    />
                    <IconButton type="button" aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper>
            :
                <TextField 
                    id={props.id}
                    placeholder={props.placeholder} 
                    label={props.label}
                    variant="outlined" 
                    sx={textFieldStyles}
                    type={props.inputType}
                    width={props.width}
                    onChange={props.onChange}
                    required={props.required}
                    disabled={props.disabled}
                    value={props.value}
                    name={props.name}
                    onBlur={props.onBlur}
                />                                                          
                
            }
        </Grid>
    )
}

export default memo(AuthInput)