import React, { useEffect, useState, useRef } from 'react'
import resumeCss from '../Resume/Resume.module.css'
import { useNavigate } from 'react-router-dom'
import AuthInput from '../UI/Input/AuthInputs'
import { Grid } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { ButtonSubmitGreen } from '../UI/Buttons/Buttons';
import { FaLongArrowAltRight } from "react-icons/fa";
import AuthHeader from '../UI/AuthHeader/AuthHeader';
import { Button, ButtonGroup } from '@mui/material';
import { errorAnimation, successMiniAnimation, getOrdinalDate } from "../../utils/client-functions";
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// // import AuthSideMenu from '../UI/AuthSideMenu/AuthSideMenu';
// import Feedback from '../Dashboard/Feedback';
// import jwt_decode from "jwt-decode";
// import { SuccessFailureModal } from '../UI/Modal/Modal';
// import axios from 'axios';
import { setError, setFetching, setSuccessMini } from "../../redux/states";
// import { checkAuthenticatedUser } from '../../utils/client-functions';
import Alert from '@mui/material/Alert';
import { useConfirm } from "material-ui-confirm";
const screenWidth = window.innerWidth



const CustomizeProposal = () => {
    const { error, successMini, user } = useSelector(state => state.stateData)
    const confirm = useConfirm();
    const dispatch = useDispatch();
    const [authMenuOpen, setAuthMenuOpen] = useState(false)
    const [writerCountryid, setWriterCountryid] = useState(0);
    const [recipientCountryid, setRecipientCountryid] = useState(0);
    const [addyFaded, setAddyFaded] = useState(false);
    const [proposalDetailsFaded, setProposalDetailsFaded] = useState(true);
    const [selectedIndex, setSelectedIndex] = useState(1);
    const [suggestedObj, setSuggestedObj] = useState([])
    const [objInput, setObjInput] = useState("")
    const [isObjInputDelimited, setIsObjInputDelimited] = useState(false);

    const errorSetter = (string) => {
        dispatch(setError(string))
        errorAnimation()
    }

    useEffect(() => {
        setIsObjInputDelimited(false)
        setObjInput("")
    }, [isObjInputDelimited])

    const [addyInfo, setAddyInfo] = useState({
        writerBizName: "",
        writerIndustry: "",
        writerSteetCity: "",
        writerCountry: "",
        writerState: "",
        recipientBizName: "",
        recipientIndustry: "",
        recipientSteetCity: "",
        recipientCountry: "",
        recipientState: "",
    });
    const { writerBizName, writerIndustry, writerSteetCity, writerCountry, writerState, recipientBizName, recipientIndustry, recipientSteetCity, recipientCountry, recipientState } = addyInfo

    const [productArray, addProductArray] = useState([
        {
          productName: "",
          productDesc: "",
        }
    ]);

      /////AWARD HANDLERS
    const handleAddProduct = () => {
        const newProduct =         {
            productName: "",
            productDesc: "",
        }
        if (productArray.length < 10) {
            return addProductArray([...productArray, newProduct]);
        }
        errorSetter("Only add 10 Products");
    };
    const handleDeleteProduct = () => {
        if (productArray.length > 1) {
            const prevProduct = [...productArray];
            prevProduct.pop();
            return addProductArray([...prevProduct]);
        }
        errorSetter("You must add a product");
    };
    const handleProductChange = (event, index) => {
        const prevProducts = [...productArray];
        switch (event.target.name) {
            case "productName":
                prevProducts[index].productName = event.target.value;
                addProductArray(prevProducts);
                break;
            case "productDesc":
                prevProducts[index].productDesc = event.target.value;
                addProductArray(prevProducts);
                break;
            default:
                addProductArray(prevProducts);
                break;
        }
    };

    const toggleProposals = () => {
        setAuthMenuOpen(!authMenuOpen)
    }

    const handleDeleteObj = (index) => {
        confirm({ description: `Proceed to delete objective? ${suggestedObj[index]}` })
          .then(() => {
            const prevObj = [...suggestedObj];
            prevObj.splice(index, 1);
            setSuggestedObj(prevObj);
          })
          .catch(() => errorSetter("Not Deleted"));
    };

    const companyInfoHandler = (prop) => (event) => {
        if (prop === "writerCountry") {
            setWriterCountryid(event.id)
            setAddyInfo({
              ...addyInfo,
              [prop]: event.name,
            });
            return
        }
        if (prop === "recipientCountry") {
            setRecipientCountryid(event.id)
            setAddyInfo({
                ...addyInfo,
                [prop]: event.name,
            });
            return
        }
        if (prop === "writerState" || prop === "recipientState") {
            setAddyInfo({
                ...addyInfo,
                [prop]: event.name,
            });
            return
        }
        setAddyInfo({
            ...addyInfo,
            [prop]: event.target.value,
        });
    }

    const handleButtonClick = (index) => {
        setSelectedIndex(index);
    };

    const addyForwardOrBackward = (arg) => {
        if (writerBizName === "" 
            || writerIndustry === "" 
            || writerSteetCity === "" 
            || writerCountry === "" 
            || writerCountry === "Country" 
            || writerState === "" 
            || writerState === "State/Region" 
            || recipientBizName === "" 
            || recipientIndustry === "" 
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

    const handleObjInputChange = (e) => {
        const { value } = e.target;
        const delimiters = [',', ';', '.'];

        if (delimiters.includes(e.key)) {
            const newSuggestions = [...suggestedObj, value.trim()];
            setIsObjInputDelimited(true)
            setSuggestedObj(newSuggestions);
        } else {
            setObjInput(value);
        }
    };

    
    
    

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
                            <h4>Company Details</h4>
                            <p></p>
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
                                            onChange={companyInfoHandler('writerBizName')}
                                        />                                        
                                        <AuthInput
                                            name="writerIndustry"
                                            id="writerIndustry"
                                            value={writerIndustry}
                                            label="Your Industry e.g Engineering"
                                            inputGridSm={12}
                                            inputType="text"
                                            mb={2}
                                            required={true}
                                            onChange={companyInfoHandler('writerIndustry')}
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
                                            onChange={companyInfoHandler('writerSteetCity')}
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
                                            onChange={companyInfoHandler('writerCountry')}
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
                                            onChange={companyInfoHandler("writerState")}
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
                                            onChange={companyInfoHandler('recipientBizName')}
                                        />
                                        <AuthInput
                                            name="recipientIndustry"
                                            id="recipientIndustry"
                                            value={recipientIndustry}
                                            label="Recipient Industry e.g Manufacturing"
                                            inputGridSm={12}
                                            inputType="text"
                                            mb={2}
                                            required={true}
                                            onChange={companyInfoHandler('recipientIndustry')}
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
                                            onChange={companyInfoHandler('recipientSteetCity')}
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
                                            onChange={companyInfoHandler('recipientCountry')}
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
                                            onChange={companyInfoHandler("recipientState")}
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


                        {/* PROPOSAL DETAILS */}
                        <div id="prop-deets" className={`Segment ${addyFaded ? "Faded" : "Faded-in"}`}>
                            <h4>Proposal Details</h4>
                            <div style={{width: '100%', textAlign: 'center'}}>       
                                <Alert 
                                    sx={{padding: '0 5px', display: 'flex', justifyContent: "center", fontSize: '.8rem', width: '300px', margin: "5px auto"}} 
                                    severity="info"
                                >
                                    Select proposal type
                                </Alert>             
                                <ButtonGroup
                                    sx={{
                                        '& .MuiButton-root': {
                                        backgroundColor: '#3E8F93',
                                            '&:hover': {
                                                backgroundColor: '#56A8AC',
                                            },
                                            '&.Mui-selected': {
                                                backgroundColor: '#56A8AC',
                                            },
                                        },
                                    }}
                                    color="success"
                                    variant="contained"
                                    aria-label="Basic button group"
                                >
                                    <Button
                                        onClick={() => handleButtonClick(1)}
                                        className={selectedIndex === 1 ? 'Mui-selected' : ''}
                                    >
                                        Product
                                    </Button>
                                    <Button
                                        onClick={() => handleButtonClick(2)}
                                        className={selectedIndex === 2 ? 'Mui-selected' : ''}
                                    >
                                        Service
                                    </Button>
                                    <Button
                                        onClick={() => handleButtonClick(3)}
                                        className={selectedIndex === 3 ? 'Mui-selected' : ''}
                                    >
                                        Project
                                    </Button>
                                    <Button
                                        onClick={() => handleButtonClick(4)}
                                        className={selectedIndex === 4 ? 'Mui-selected' : ''}
                                    >
                                        Partnership
                                    </Button>
                                </ButtonGroup>
                            </div>

                            <div>
                                <Grid
                                    container
                                    sx={{ display: "flex", justifyContent: "space-around" }}
                                    mt={3}
                                >
                                    {productArray.map((item, index) => {
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
                                                    name="productName"
                                                    id={item.productName}
                                                    value={item.productName}
                                                    label={`Product ${index + 1}`}
                                                    inputGridSm={12}
                                                    inputType="text"
                                                    mb={2}
                                                    required={true}
                                                    onChange={(event) => handleProductChange(event, index)}
                                                />
                                                <AuthInput
                                                    name="productDesc"
                                                    id={item.productDesc}
                                                    value={item.productDesc}
                                                    label="[If available] What is this product used for?"
                                                    placeholder="[If available] What is this product used for?"
                                                    multiline={true}
                                                    inputGridSm={12}
                                                    mt={2}
                                                    rows={4}
                                                    maxRows={6}
                                                    onChange={(event) => handleProductChange(event, index)}
                                                />
                                            </Grid>
                                        );
                                    })}

                                </Grid>

                                <div className={resumeCss.CenteredElem}>
                                    <div
                                        style={{ marginRight: "10px" }}
                                        className="delete"
                                        title="Delete Product"
                                        onClick={handleDeleteProduct}
                                    >
                                        -
                                    </div>
                                    <div
                                        className="add"
                                        title="Add Product"
                                        onClick={handleAddProduct}
                                    >
                                        +
                                    </div>
                                </div>
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
                                        Objectives &nbsp;&nbsp;<FaLongArrowAltRight />
                                    </ButtonSubmitGreen>
                                </div>
                            </div>
                        </div>


                        {/* OBJECTIVES */}
                        <div id="obj" className={`Segment ${addyFaded ? "Faded" : "Faded-in"}`}>
                        
                            <h4>Objectives</h4>
                            <Alert 
                                sx={{padding: '0 5px', display: 'flex', justifyContent: "center", fontSize: '.8rem', width: '300px', margin: "5px auto"}} 
                                severity="info"
                            >
                                What need does your product solve?
                            </Alert>

                            <div style={styles.container}>
                                {suggestedObj.length === 0 ? (
                                    <div 
                                        style={{width: "100%", margin: "auto", fontSize: ".8rem"}}
                                    >
                                        Input objectives below to diplay here
                                    </div>
                                ) : (
                                suggestedObj.map((obj, index) => (
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
                                ))
                                )}
                            </div>
                            

                            <Grid container px={screenWidth < 900 ? 1 : 3} mb={2}>
                                <AuthInput
                                    name="objInput"
                                    value={objInput}
                                    placeholder="Enter some objectives (Objectives are details of what your product will solve. separate each sentence/word with a comma, semi-colon or full-stop)"
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
                                    justifyContent: 'right',
                                    marginBottom: "20px",
                                }}
                            >

                                <div style={{ width: "200px"}}>
                                    <ButtonSubmitGreen type="button" onClick={() => {
                                        addyForwardOrBackward('forward')
                                    }}>
                                        Other Details &nbsp;&nbsp;<FaLongArrowAltRight />
                                    </ButtonSubmitGreen>
                                </div>
                            </div>
                        </div>

                        {/* PARTNERS */}
                        <div id="obj" className={`Segment ${addyFaded ? "Faded" : "Faded-in"}`}>
                        
                            <h4>Partners</h4>
                            <Alert 
                                sx={{padding: '0 5px', display: 'flex', justifyContent: "center", fontSize: '.8rem', width: '300px', margin: "5px auto"}} 
                                severity="info"
                            >
                                Enter previous or current <strong>customers/partners</strong> who your products have helped. This will strengthen your conversion by 40%
                            </Alert>

                            <div style={styles.container}>
                                {suggestedObj.length === 0 ? (
                                    <div 
                                        style={{width: "100%", margin: "auto", fontSize: ".8rem"}}
                                    >
                                        Input partners below to diplay here
                                    </div>
                                ) : (
                                suggestedObj.map((obj, index) => (
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
                                ))
                                )}
                            </div>
                            

                            <Grid container px={screenWidth < 900 ? 1 : 3} mb={2}>
                                <AuthInput
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
                                        Other Details &nbsp;&nbsp;<FaLongArrowAltRight />
                                    </ButtonSubmitGreen>
                                </div>
                            </div>
                        </div>

                        {/* GOALS DETAILS */}
                        <div id="addy" className={`Segment ${addyFaded ? "Faded" : "Faded-in"}`}>
                            <h4>Other Details</h4>
                            <Alert 
                                sx={{padding: '0 5px', display: 'flex', justifyContent: "center", fontSize: '.8rem', width: '300px', margin: "5px auto"}} 
                                severity="info"
                            >
                                What need does your product solve?
                            </Alert>
                            <div>

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



export default CustomizeProposal;