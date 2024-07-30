import React, { useEffect, useState, useRef } from 'react'
import resumeCss from '../Resume/Resume.module.css'
import { useNavigate } from 'react-router-dom'
import AuthInput from '../UI/Input/AuthInputs'
import { Grid } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { ButtonSubmitGreen } from '../UI/Buttons/Buttons';
import { FaLongArrowAltRight } from "react-icons/fa";
import AuthHeader from '../UI/AuthHeader/AuthHeader';
import { errorAnimation, successMiniAnimation, getOrdinalDate } from "../../utils/client-functions";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import AuthSideMenu from '../UI/AuthSideMenu/AuthSideMenu';
import Feedback from '../Dashboard/Feedback';
import jwt_decode from "jwt-decode";
import { SuccessFailureModal } from '../UI/Modal/Modal';
import axios from 'axios';
import { setError, setFetching, setSuccessMini } from "../../redux/states";
import { checkAuthenticatedUser } from '../../utils/client-functions';
import Alert from '@mui/material/Alert';
import { useConfirm } from "material-ui-confirm";
const screenWidth = window.innerWidth



const CustomizeProposal = () => {
    const { error, successMini, user } = useSelector(state => state.stateData)
    const dispatch = useDispatch();
    const [authMenuOpen, setAuthMenuOpen] = useState(false)
    const [writerCountryid, setWriterCountryid] = useState(0);
    const [recipientCountryid, setRecipientCountryid] = useState(0);
    const [addyFaded, setAddyFaded] = useState(false);
    const [proposalDetailsFaded, setProposalDetailsFaded] = useState(true);

    const [addyInfo, setAddyInfo] = useState({
        writerBizName: "",
        writerSteetCity: "",
        writerCountry: "",
        writerState: "",
        recipientBizName: "",
        recipientSteetCity: "",
        recipientCountry: "",
        recipientState: "",
    });
    const { writerBizName, writerSteetCity, writerCountry, writerState, recipientBizName, recipientSteetCity, recipientCountry, recipientState } = addyInfo


    const errorSetter = (string) => {
        dispatch(setError(string))
        errorAnimation()
    }

    const toggleProposals = () => {
        setAuthMenuOpen(!authMenuOpen)
    }

    const handleAddyChange = () => {

    }

    const addyForwardOrBackward = (arg) => {
        if (writerBizName === "" 
            || writerSteetCity === "" 
            || writerCountry === "" 
            || writerCountry === "Country" 
            || writerState === "" 
            || writerState === "State/Region" 
            || recipientBizName === "" 
            || recipientSteetCity === "" 
            || recipientCountry === "" 
            || recipientCountry === "Country" 
            || recipientState === "State/Region" 
            || recipientState === ""
        ) {
          errorSetter("Complete required fields in this section to continue");
          return;
        }
        setAddyFaded(true)
        switch (arg) {
          case "forward":
            setProposalDetailsFaded(false)
            break;
        
          default:
            break;
        }
    }

    return (
        <div className="auth-container">
            {/* For SIDE MENU */}
            {/* <AuthSideMenu opened={authMenuOpen} seacrhBarPlaceholder="Search by resume name" hidden={!authMenuOpen} /> */}

            <div style={{ width: '100%', padding: '0' }}>
                <div className="auth-bg-blob">
                </div>
            </div>

            <div className="auth-container-inner">
                {/* for TOP MENU */}
                <AuthHeader 
                    authMenuOpen={authMenuOpen} 
                    onClick={toggleProposals} 
                    headerText="Create Proposal" 
                />

                <div className="BodyWrapper">
                    <div className="BuildNavigator">
                        <div className="ActiveNav"><span>1</span>Customise</div>
                        <div><span>2</span>Preview</div>
                        <div><span>3</span>Download</div>
                    </div>
                    <form>
                        <div className='error'>{error}</div>
                        <div className="success-mini">{successMini}</div>
                        {/* <div className='explanation-points'>
                            <Alert sx={{padding: '0 5px', fontSize: '.7rem'}} severity="info">Click Download only when you are sure to download as action is not reversible</Alert>
                            {screenWidth < 900 && <Alert sx={{padding: '0 5px', fontSize: '.7rem'}} severity="info">Flip screen orientation to landscape to display template properly on mobile</Alert>}
                        </div> */}

                        {/* ADDRESS DETAILS */}
                        <div id="addy" className={`Segment ${addyFaded ? "Faded" : "Faded-in"}`}>
                            <h4>Address Details</h4>
                            <div>
                                <Grid
                                    container
                                    sx={{ display: "flex", justifyContent: "space-around" }}
                                >
                                    <Grid
                                        item
                                        xs={12}
                                        md={5}
                                        mb={2}
                                        className="segment"
                                    >
                                        <AuthInput
                                            name="writerBizName"
                                            id="writerBizName"
                                            value={writerBizName}
                                            label="Your Business Name"
                                            inputGridSm={12}
                                            inputType="text"
                                            mb={2}
                                            required={true}
                                            onChange={handleAddyChange('')}
                                        />
                                        <AuthInput
                                            name="writerSteetCity"
                                            id="writerSteetCity"
                                            value={writerSteetCity}
                                            label="Your Office No., Street & City"
                                            inputGridSm={12}
                                            inputType="text"
                                            mb={2}
                                            required={true}
                                            onChange={handleAddyChange('')}
                                        />
                                        <AuthInput
                                            name="writerCountry"
                                            id="writerCountry"
                                            value={writerCountry}
                                            placeholder="Country"
                                            inputGridSm={12}
                                            inputType="country-select"
                                            mb={2}
                                            required={true}
                                            onChange={handleAddyChange('')}
                                        />
                                        <AuthInput
                                            name="writerState"
                                            id="writerState"
                                            value={writerState}
                                            countryid={writerCountryid}
                                            placeholder="State/Region"
                                            inputType="state-select"
                                            inputGridSm={12}
                                            mb={2}
                                            required={true}
                                            onChange={handleAddyChange("")}
                                        />
                                    </Grid>

                                    <Grid
                                        item
                                        xs={12}
                                        md={5}
                                        mb={2}
                                        className="segment"
                                    >
                                        <AuthInput
                                            name="recipientBizName"
                                            id="recipientBizName"
                                            value={recipientBizName}
                                            label="Recipient Business Name"
                                            inputGridSm={12}
                                            inputType="text"
                                            mb={2}
                                            required={true}
                                            onChange={handleAddyChange('')}
                                        />
                                        <AuthInput
                                            name="recipientSteetCity"
                                            id="recipientSteetCity"
                                            value={recipientSteetCity}
                                            label="Recipient Office No., Street & City"
                                            inputGridSm={12}
                                            inputType="text"
                                            mb={2}
                                            required={true}
                                            onChange={handleAddyChange('')}
                                        />
                                        <AuthInput
                                            name="recipientCountry"
                                            id="recipientCountry"
                                            value={recipientCountry}
                                            placeholder="Country"
                                            inputGridSm={12}
                                            inputType="country-select"
                                            mb={2}
                                            required={true}
                                            onChange={handleAddyChange('')}
                                        />
                                        <AuthInput
                                            name="recipientState"
                                            id="recipientState"
                                            value={recipientState}
                                            countryid={recipientCountryid}
                                            placeholder="State/Region"
                                            inputType="state-select"
                                            inputGridSm={12}
                                            mb={2}
                                            required={true}
                                            onChange={handleAddyChange("")}
                                        />
                                    </Grid>
                                </Grid>

                            </div>

                            {/* Visibility Buttons */}
                            <div
                                style={{
                                    width: "100%",
                                    display: 'flex',
                                    justifyContent: 'right',
                                    marginBottom: "20px",
                                }}
                            >

                                <div style={{ width: "200px"}}>
                                    <ButtonSubmitGreen type="button" onClick={() => {
                                        addyForwardOrBackward('forward')
                                    }}>
                                        Proposal Details &nbsp;&nbsp;<FaLongArrowAltRight />
                                    </ButtonSubmitGreen>
                                </div>
                            </div>
                        </div>


                        {/* PRODUCT/SERVICE DETAILS */}
                        <div id="addy" className={`Segment ${addyFaded ? "Faded" : "Faded-in"}`}>
                            <h4>Products/Services Details</h4>
                            <div>
                                <Grid
                                    container
                                    sx={{ display: "flex", justifyContent: "space-around" }}
                                >
                                    <AuthInput
                                        name="askMe"
                                        // value={askMeVal}
                                        label="Paste or type in your products/services here"
                                        placeholder="Paste or type in your products/services here"
                                        multiline={true}
                                        inputGridSm={12}
                                        mt={2}
                                        rows={6}
                                        maxRows={6}
                                        required={true}
                                        // onChange={handleValChange}
                                    />
                                </Grid>

                            </div>

                            {/* Visibility Buttons */}
                            <div
                                style={{
                                    width: "100%",
                                    display: 'flex',
                                    justifyContent: 'right',
                                    marginBottom: "20px",
                                }}
                            >

                                <div style={{ width: "200px"}}>
                                    <ButtonSubmitGreen type="button" onClick={() => {
                                        addyForwardOrBackward('forward')
                                    }}>
                                        Proposal Details &nbsp;&nbsp;<FaLongArrowAltRight />
                                    </ButtonSubmitGreen>
                                </div>
                            </div>
                        </div>


                        {/* GOALS DETAILS */}
                        <div id="addy" className={`Segment ${addyFaded ? "Faded" : "Faded-in"}`}>
                            <h4>Objectives</h4>
                            <div>
                                <Grid
                                    container
                                    sx={{ display: "flex", justifyContent: "space-around" }}
                                >
                                    <Grid
                                        item
                                        xs={12}
                                        md={5}
                                        mb={2}
                                        className="segment"
                                    >
                                        <AuthInput
                                            name="writerBizName"
                                            id="writerBizName"
                                            value={writerBizName}
                                            label="Your Business Name"
                                            inputGridSm={12}
                                            inputType="text"
                                            mb={2}
                                            required={true}
                                            onChange={handleAddyChange('')}
                                        />
                                        <AuthInput
                                            name="writerSteetCity"
                                            id="writerSteetCity"
                                            value={writerSteetCity}
                                            label="Your Office No., Street & City"
                                            inputGridSm={12}
                                            inputType="text"
                                            mb={2}
                                            required={true}
                                            onChange={handleAddyChange('')}
                                        />
                                        <AuthInput
                                            name="writerCountry"
                                            id="writerCountry"
                                            value={writerCountry}
                                            placeholder="Country"
                                            inputGridSm={12}
                                            inputType="country-select"
                                            mb={2}
                                            required={true}
                                            onChange={handleAddyChange('')}
                                        />
                                        <AuthInput
                                            name="writerState"
                                            id="writerState"
                                            value={writerState}
                                            countryid={writerCountryid}
                                            placeholder="State/Region"
                                            inputType="state-select"
                                            inputGridSm={12}
                                            mb={2}
                                            required={true}
                                            onChange={handleAddyChange("")}
                                        />
                                    </Grid>

                                    <Grid
                                        item
                                        xs={12}
                                        md={5}
                                        mb={2}
                                        className="segment"
                                    >
                                        <AuthInput
                                            name="recipientBizName"
                                            id="recipientBizName"
                                            value={recipientBizName}
                                            label="Recipient Business Name"
                                            inputGridSm={12}
                                            inputType="text"
                                            mb={2}
                                            required={true}
                                            onChange={handleAddyChange('')}
                                        />
                                        <AuthInput
                                            name="recipientSteetCity"
                                            id="recipientSteetCity"
                                            value={recipientSteetCity}
                                            label="Recipient Office No., Street & City"
                                            inputGridSm={12}
                                            inputType="text"
                                            mb={2}
                                            required={true}
                                            onChange={handleAddyChange('')}
                                        />
                                        <AuthInput
                                            name="recipientCountry"
                                            id="recipientCountry"
                                            value={recipientCountry}
                                            placeholder="Country"
                                            inputGridSm={12}
                                            inputType="country-select"
                                            mb={2}
                                            required={true}
                                            onChange={handleAddyChange('')}
                                        />
                                        <AuthInput
                                            name="recipientState"
                                            id="recipientState"
                                            value={recipientState}
                                            countryid={recipientCountryid}
                                            placeholder="State/Region"
                                            inputType="state-select"
                                            inputGridSm={12}
                                            mb={2}
                                            required={true}
                                            onChange={handleAddyChange("")}
                                        />
                                    </Grid>
                                </Grid>

                            </div>

                            {/* Visibility Buttons */}
                            <div
                                style={{
                                    width: "100%",
                                    display: 'flex',
                                    justifyContent: 'right',
                                    marginBottom: "20px",
                                }}
                            >

                                <div style={{ width: "200px"}}>
                                    <ButtonSubmitGreen type="button" onClick={() => {
                                        addyForwardOrBackward('forward')
                                    }}>
                                        Proposal Details &nbsp;&nbsp;<FaLongArrowAltRight />
                                    </ButtonSubmitGreen>
                                </div>
                            </div>
                        </div>

                    </form>

                </div>

            </div>
        </div>
    )
}



export default CustomizeProposal;