import React from 'react'
import resumeCss from '../../Resume/Resume.module.css'
import { ButtonSubmitGreen } from '../../UI/Buttons/Buttons';
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaLongArrowAltLeft } from "react-icons/fa";
import Alert from '@mui/material/Alert';
import AuthInput from '../../UI/Input/AuthInputs';
import { Grid } from "@mui/material";
const screenWidth = window.innerWidth;

const PartnershipPartial = ({
    partnershipFaded, 
    objFaded, 
    customersFaded, 
    otherDeetsFaded, 
    suggestedObj, 
    handleDeleteObj,
    objInput, 
    handleObjInputChange, 
    objForwardOrBackward, 
    customersForwardOrBackward, 
    otherDeetsForwardOrBackward,
    partnershipArray,
    handlePartnershipChange,
    handleDeletePartnership,
    handleAddPartnership,
    partnershipForwardOrBackward 
}) => {

    return (
        <div>
            {/* PARTNERSHIP DETAILS */}
            <div id="partnership-deets" className={`Segment ${partnershipFaded ? "Faded" : "Faded-in"}`}>
                <h4>Partnership Details</h4>

                <div>
                    <Grid
                        container
                        sx={{ display: "flex", justifyContent: "space-around" }}
                        mt={3}
                    >
                        {partnershipArray.map((item, index) => {
                            return (
                                <Grid
                                    item
                                    xs={12}
                                    md={5}
                                    mb={2}
                                    className="segment"
                                    key={index}
                                >
                                    <AuthInput
                                        name="partnershipName"
                                        id="partnershipName"
                                        value={item?.partnershipName}
                                        label={`Partner ${index + 1}`}
                                        inputGridSm={12}
                                        inputType="text"
                                        mb={2}
                                        required={true}
                                        onChange={(event) => handlePartnershipChange(event, index)}
                                    />
                                    <AuthInput
                                        name="price"
                                        id="price"
                                        value={item.price}
                                        label="Per Partnership Price (Only If applicable)"
                                        inputGridSm={12}
                                        inputType="text"
                                        mb={2}
                                        onChange={(event) => handlePartnershipChange(event, index)}
                                    />
                                    <AuthInput
                                        name="partnershipDesc"
                                        id="partnershipDesc"
                                        value={item?.partnershipDesc}
                                        label="[If available] Describe partnership"
                                        placeholder="[If available] Describe partnership"
                                        multiline={true}
                                        inputGridSm={12}
                                        mt={2}
                                        rows={4}
                                        maxRows={6}
                                        onChange={(event) => handlePartnershipChange(event, index)}
                                    />
                                </Grid>
                            );
                        })}

                    </Grid>

                    <div className={resumeCss.CenteredElem}>
                        <div
                            style={{ marginRight: "10px" }}
                            className="delete"
                            title="Delete Partnership"
                            onClick={handleDeletePartnership}
                        >
                            -
                        </div>
                        <div
                            className="add"
                            title="Add Partnership"
                            onClick={handleAddPartnership}
                        >
                            +
                        </div>
                    </div>
                </div>

        
                {/* Partnership Visibility Buttons */}
                <div
                    style={{
                        width: "100%",
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: "20px",
                    }}
                >
                    <div className='prev-page' onClick={() => {partnershipForwardOrBackward('backward')}}>
                        <FaLongArrowAltLeft />
                    </div>
                    <div style={{ width: "200px"}}>
                        <ButtonSubmitGreen type="button" onClick={() => {
                            partnershipForwardOrBackward('forward')
                        }}>
                            Objectives &nbsp;&nbsp;<FaLongArrowAltRight />
                        </ButtonSubmitGreen>
                    </div>
                </div>
            </div>


            {/* OBJECTIVES */}
            <div id="obj" className={`Segment ${objFaded ? "Faded" : "Faded-in"}`}>
            
                <h4>Objectives</h4>
                <Alert 
                    sx={{padding: '0 5px', display: 'flex', justifyContent: "center", fontSize: '.8rem', width: '300px', margin: "5px auto"}} 
                    severity="info"
                >
                    What need does your Partnership solve?
                </Alert>

                <div>
                    {suggestedObj.length > 0 && (
                        <div style={styles.container}>
                            {suggestedObj.map((obj, index) => (
                                <div key={index} className="array-item">
                                    {obj}
                                    <span
                                        className="itemDelete"
                                        title="Delete Objective"
                                        onClick={() => handleDeleteObj(index)}
                                    >
                                        X
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                

                <Grid container px={screenWidth < 900 ? 1 : 3} mb={2}>
                    <AuthInput
                        id="objInput"
                        name="objInput"
                        value={objInput}
                        placeholder="Enter some objectives (Objectives are details of what your partnership will solve. Separate each sentence/word with a comma, semi-colon or full-stop)"
                        multiline={true}
                        inputGridSm={12}
                        mt={2}
                        rows={4}
                        maxRows={6}
                        onChange={(e) => handleObjInputChange(e)}
                        onKeyDown={(e) => handleObjInputChange(e)}
                    />
                </Grid>

                {/* Visibility Buttons */}
                <div
                    style={{
                        width: "100%",
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: "20px",
                    }}
                >
                    <div className='prev-page' onClick={() => {objForwardOrBackward('backward')}}>
                        <FaLongArrowAltLeft />
                    </div>
                    <div style={{ width: "200px"}}>
                        <ButtonSubmitGreen type="button" onClick={() => {
                            objForwardOrBackward('forward')
                        }}>
                            Customers &nbsp;&nbsp;<FaLongArrowAltRight />
                        </ButtonSubmitGreen>
                    </div>
                </div>
            </div>

            {/* CUSTOMERS/PARTNERS */}
            <div id="obj" className={`Segment ${customersFaded ? "Faded" : "Faded-in"}`}>
            
                <h4>Customers/Partners</h4>
                <Alert 
                    sx={{padding: '0 5px', display: 'flex', justifyContent: "center", fontSize: '.8rem', width: '300px', margin: "5px auto"}} 
                    severity="info"
                >
                    Enter previous or current <strong>customers/partners</strong> who your have worked with/for. This will strengthen your conversion by 40%
                </Alert>

                <div>
                    {suggestedObj.length > 0 && (
                        <div style={styles.container}>
                            {suggestedObj.map((obj, index) => (
                                <div key={index} className="array-item">
                                    {obj}
                                    <span
                                        className="itemDelete"
                                        title="Delete Objective"
                                        onClick={() => handleDeleteObj(index)}
                                    >
                                        X
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                
                

                <Grid container px={screenWidth < 900 ? 1 : 3} mb={2}>
                    <AuthInput
                        id="objInput"
                        name="objInput"
                        value={objInput}
                        placeholder="Enter partners (separate each partner with a comma, semi-colon or full-stop)"
                        multiline={true}
                        inputGridSm={12}
                        mt={2}
                        rows={4}
                        maxRows={6}
                        onChange={(e) => handleObjInputChange(e)}
                        onKeyDown={(e) => handleObjInputChange(e)}
                    />
                </Grid>

                {/* CUSTOMERS Visibility Buttons */}
                <div
                    style={{
                        width: "100%",
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: "20px",
                    }}
                >
                    <div className='prev-page' onClick={() => {customersForwardOrBackward('backward')}}>
                        <FaLongArrowAltLeft />
                    </div>
                    <div style={{ width: "200px"}}>
                        <ButtonSubmitGreen type="button" onClick={() => {
                            customersForwardOrBackward('forward')
                        }}>
                            Other Details &nbsp;&nbsp;<FaLongArrowAltRight />
                        </ButtonSubmitGreen>
                    </div>
                </div>
            </div>

            {/* OTHER DETAILS */}
            <div id="addy" className={`Segment ${otherDeetsFaded ? "Faded" : "Faded-in"}`}>
                <h4>Other Details</h4>
                <Alert 
                    sx={{padding: '0 5px', display: 'flex', justifyContent: "center", fontSize: '.8rem', width: '300px', margin: "5px auto"}} 
                    severity="info"
                >
                    What need does your partnership solve?
                </Alert>
                <div>

                </div>

                {/* Visibility Buttons */}
                <div
                    style={{
                        width: "100%",
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: "20px",
                    }}
                >
                    <div className='prev-page' onClick={() => {otherDeetsForwardOrBackward('backward')}}>
                        <FaLongArrowAltLeft />
                    </div>
                    {/* <div style={{ width: "200px"}}>
                        <ButtonSubmitGreen type="button" onClick={() => {
                            otherDeetsForwardOrBackward('forward')
                        }}>
                            Proposal Details &nbsp;&nbsp;<FaLongArrowAltRight />
                        </ButtonSubmitGreen>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

const styles = {
    container: {
        width: "95%",
        margin: "20px auto 10px",
        display: "flex",
        padding: "10px 5px",
        backgroundColor: "#c0d1d457",
        borderRadius: "10px",
        lineHeight: "1",
        boxShadow: "inset 10px 10px 10px rgba(0, 0, 0, 0.1)",
        flexWrap: "wrap",
    }
}

export default PartnershipPartial;