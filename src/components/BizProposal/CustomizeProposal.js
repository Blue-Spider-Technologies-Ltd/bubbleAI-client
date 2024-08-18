import React, { useEffect, useState, useRef } from 'react'
// import resumeCss from '../Resume/Resume.module.css'
// import { useNavigate } from 'react-router-dom'
import AuthInput from '../UI/Input/AuthInputs'
import { Grid } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { ButtonSubmitGreen } from '../UI/Buttons/Buttons';
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaLongArrowAltLeft } from "react-icons/fa";
import AuthHeader from '../UI/AuthHeader/AuthHeader';
//PARTIALS
import ProductsPartial from './Partials/ProductsPartial';
import ProjectPartial from './Partials/ProjectPartial';
import ServicesPartial from './Partials/ServicesPartial';
import PartnershipPartial from './Partials/PartnershipPartial';
import { Button, ButtonGroup } from '@mui/material';
import { errorAnimation, checkEmptyStringsInObj, checkEmptyStrings, successMiniAnimation, getOrdinalDate } from "../../utils/client-functions";
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
    const [propTypeFaded, setPropTypeFaded] = useState(true)
    const [objInput, setObjInput] = useState("")
    const [productFaded, setProductFaded] = useState(true)
    const [serviceFaded, setServiceFaded] = useState(true)
    const [projectFaded, setProjectFaded] = useState(true)
    const [partnershipFaded, setPartnershipFaded] = useState(true)
    const [proposalType, setProposalType] = useState("")
    const [objFaded, setObjFaded] = useState(true)
    const [customersFaded, setCustomersFaded] = useState(true)
    const [otherDeetsFaded, setOtherDeetsFaded] = useState(true)
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [isObjInputDelimited, setIsObjInputDelimited] = useState(false);
    const [suggestedObj, setSuggestedObj] = useState([])

    const [productArray, addProductArray] = useState([
        {
          productName: "",
          price: "",
          productDesc: "",
        }
    ]);

    const [serviceArray, addServiceArray] = useState([
        {
          serviceName: "",
          price: "",
          serviceDesc: "",
        }
    ]);

    const [projectArray, addProjectArray] = useState([
        {
          projectName: "",
          price: "",
          projectDesc: "",
        }
    ]);

    const [partnershipArray, addPartnershipArray] = useState([
        {
          partnershipName: "",
          price: "",
          partnershipDesc: "",
        }
    ]);

    const errorSetter = (string) => {
        dispatch(setError(string))
        errorAnimation()
    }
    //TO CLEAR INOUT FIELD AFTER DELIMITING OBJECTIVE
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


    const toggleProposals = () => {
        setAuthMenuOpen(!authMenuOpen)
    }

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

    const addyForwardOrBackward = (arg) => {
        // if (writerBizName === "" 
        //     || writerIndustry === "" 
        //     || writerSteetCity === "" 
        //     || writerCountry === "" 
        //     || writerCountry === "Country" 
        //     || writerState === "" 
        //     || writerState === "State/Region" 
        //     || recipientBizName === "" 
        //     || recipientIndustry === "" 
        //     || recipientSteetCity === "" 
        //     || recipientCountry === "" 
        //     || recipientCountry === "Country" 
        //     || recipientState === "State/Region" 
        //     || recipientState === ""
        // ) {
        //   errorSetter("Complete required fields in this section to continue");
        //   return;
        // }
        setAddyFaded(true)
        switch (arg) {
          case "forward":
            setPropTypeFaded(false)
            break;
        
          default:
            break;
        }
    }

    const handleProposalTypeForward = (prop) => {
        setPropTypeFaded(true)
        switch (prop) {
            case "product":
                setSelectedIndex(1);
                setProposalType("product")
                setProductFaded(false)
                break;
            case "service":
                setSelectedIndex(2);
                setProposalType("service")
                setServiceFaded(false)
                break;
            case "project":
                setSelectedIndex(3);
                setProposalType("project")
                setProjectFaded(false)
                break;
            case "partnership":
                setSelectedIndex(4);
                setProposalType("partnership")
                setPartnershipFaded(false)
                break;
            default:
                setPropTypeFaded(false)
                setProductFaded(true)
                break;
        }
    }

    const handleProposalTypeBackward = () => {
        setPropTypeFaded(true)
        setAddyFaded(false)
    }

    //PRODUCT FUNCTIONS
    const handleAddProduct = () => {
        const newProduct =         {
            productName: "",
            price: "",
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
            case "price":
                prevProducts[index].price = event.target.value;
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

    //SERVICE FUNCTIONS
    const handleAddService = () => {
        const newService =         {
            serviceName: "",
            price: "",
            ServiceDesc: "",
        }
        if (serviceArray.length < 10) {
            return addServiceArray([...serviceArray, newService]);
        }
        errorSetter("Only add 10 Services");
    };
    const handleDeleteService = () => {
        if (serviceArray.length > 1) {
            const prevService = [...serviceArray];
            prevService.pop();
            return addServiceArray([...prevService]);
        }
        errorSetter("You must add a Service");
    };
    const handleServiceChange = (event, index) => {
        const prevServices = [...serviceArray];
        switch (event.target.name) {
            case "serviceName":
                prevServices[index].serviceName = event.target.value;
                addServiceArray(prevServices);
                break;            
            case "price":
                prevServices[index].price = event.target.value;
                addServiceArray(prevServices);
                break;
            case "serviceDesc":
                prevServices[index].serviceDesc = event.target.value;
                addServiceArray(prevServices);
                break;
            default:
                addServiceArray(prevServices);
                break;
        }
    };

    //PRODUCT FUNCTIONS
    const handleAddProject = () => {
        const newProdject =         {
            projectName: "",
            price: "",
            projectDesc: "",
        }
        if (projectArray.length < 10) {
            return addProjectArray([...projectArray, newProdject]);
        }
        errorSetter("Only add 10 Projects");
    };
    const handleDeleteProject = () => {
        if (projectArray.length > 1) {
            const prevProjects = [...projectArray];
            prevProjects.pop();
            return addProjectArray([...prevProjects]);
        }
        errorSetter("You must add a Project");
    };
    const handleProjectChange = (event, index) => {
        const prevProjects = [...projectArray];
        switch (event.target.name) {
            case "projectName":
                prevProjects[index].projectName = event.target.value;
                addProjectArray(prevProjects);
                break;            
            case "price":
                prevProjects[index].price = event.target.value;
                addProjectArray(prevProjects);
                break;
            case "productDesc":
                prevProjects[index].projectDesc = event.target.value;
                addProjectArray(prevProjects);
                break;
            default:
                addProjectArray(prevProjects);
                break;
        }
    };

    const handleDeleteObj = (index) => {
        confirm({ description: `Proceed to delete objective? ${suggestedObj[index]}` })
          .then(() => {
            const prevObj = [...suggestedObj];
            prevObj.splice(index, 1);
            setSuggestedObj(prevObj);
          })
          .catch(() => errorSetter("Not Deleted"));
    };

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

    const productForwardOrBackward = (arg) => {  

        switch (arg) {
          case "forward":
            //check if required fields are filled
            // if (checkEmptyStringsInObj(productArray, "price", "productDesc") === false ) {
            //   return errorSetter("Complete required fields in this section to continue");    
            // }
            setProductFaded(true)
            setObjFaded(false)
            break;
          case "backward":
            setProductFaded(true)
            setPropTypeFaded(false);
            break;
        
          default:
            setProductFaded(false)
            break;
        }
    }

    const serviceForwardOrBackward = (arg) => {  

        switch (arg) {
          case "forward":
            //check if required fields are filled
            // if (checkEmptyStringsInObj(productArray, "price", "productDesc") === false ) {
            //   return errorSetter("Complete required fields in this section to continue");    
            // }
            setServiceFaded(true)
            setObjFaded(false)
            break;
          case "backward":
            setServiceFaded(true)
            setPropTypeFaded(false);
            break;
        
          default:
            setServiceFaded(false)
            break;
        }
    }

    const projectForwardOrBackward = (arg) => {  

        switch (arg) {
          case "forward":
            //check if required fields are filled
            // if (checkEmptyStringsInObj(productArray, "price", "productDesc") === false ) {
            //   return errorSetter("Complete required fields in this section to continue");    
            // }
            setProjectFaded(true)
            setObjFaded(false)
            break;
          case "backward":
            setProjectFaded(true)
            setPropTypeFaded(false);
            break;
        
          default:
            setProjectFaded(false)
            break;
        }
    }

    const objForwardOrBackward = (arg) => {

        switch (arg) {
          case "forward":
            //check if required fields are filled, exempting two keys
            // if (checkEmptyStrings(suggestedObj) === false ) {
            //     return errorSetter("Complete required fields in this section to continue");
            // }
            setObjFaded(true)
            setCustomersFaded(false)
            break;
          case "backward":
            setObjFaded(true)
            setProductFaded(false)
            setServiceFaded(false)
            setProjectFaded(false)
            break;
        
          default:
            setObjFaded(false)
            break;
        }
    }

    const customersForwardOrBackward = (arg) => {

        switch (arg) {
          case "forward":
            //check if required fields are filled, exempting two keys
            // if (checkEmptyStrings(suggestedObj) === false ) {
            //     return errorSetter("Complete required fields in this section to continue");
            // }
            setCustomersFaded(true)
            setOtherDeetsFaded(false)
            break;
          case "backward":
            setCustomersFaded(true)
            setObjFaded(false)
            break;
        
          default:
            setCustomersFaded(false)
            break;
        }
    }

    const otherDeetsForwardOrBackward = (arg) => {

        switch (arg) {
          case "forward":
            //check if required fields are filled, exempting two keys
            // if (checkEmptyStrings(suggestedObj) === false ) {
            //     return errorSetter("Complete required fields in this section to continue");
            // }
            setOtherDeetsFaded(true)
            // setOtherDeetsFaded(false)
            break;
          case "backward":
            setOtherDeetsFaded(true)
            setCustomersFaded(false)
            break;
        
          default:
            setOtherDeetsFaded(false)
            break;
        }
    }

    const ProposalPartialToDisplay = () => {
        let template;
   
        switch (proposalType) {
            case "product":
                template = <ProductsPartial 
                                productFaded={productFaded}
                                objFaded={objFaded}
                                customersFaded={customersFaded}
                                otherDeetsFaded={otherDeetsFaded}
                                suggestedObj={suggestedObj}
                                handleDeleteObj={handleDeleteObj}
                                objInput={objInput}
                                handleObjInputChange={handleObjInputChange}
                                objForwardOrBackward={objForwardOrBackward}
                                customersForwardOrBackward={customersForwardOrBackward}
                                otherDeetsForwardOrBackward={otherDeetsForwardOrBackward}
                                productArray={productArray}
                                handleProductChange={handleProductChange}
                                handleDeleteProduct={handleDeleteProduct}
                                handleAddProduct={handleAddProduct}
                                productForwardOrBackward={productForwardOrBackward}
                            />
                break;
            case "service":
                template = <ServicesPartial 
                                serviceFaded={serviceFaded}
                                objFaded={objFaded}
                                customersFaded={customersFaded}
                                otherDeetsFaded={otherDeetsFaded}
                                suggestedObj={suggestedObj}
                                handleDeleteObj={handleDeleteObj}
                                objInput={objInput}
                                handleObjInputChange={handleObjInputChange}
                                objForwardOrBackward={objForwardOrBackward}
                                customersForwardOrBackward={customersForwardOrBackward}
                                otherDeetsForwardOrBackward={otherDeetsForwardOrBackward}
                                serviceArray={serviceArray}
                                handleServiceChange={handleServiceChange}
                                handleDeleteService={handleDeleteService}
                                handleAddService={handleAddService}
                                serviceForwardOrBackward={serviceForwardOrBackward}
                            />
                break;
            case "project":
                template = <ProjectPartial 
                                projectFaded={projectFaded}
                                objFaded={objFaded}
                                customersFaded={customersFaded}
                                otherDeetsFaded={otherDeetsFaded}
                                suggestedObj={suggestedObj}
                                handleDeleteObj={handleDeleteObj}
                                objInput={objInput}
                                handleObjInputChange={handleObjInputChange}
                                objForwardOrBackward={objForwardOrBackward}
                                customersForwardOrBackward={customersForwardOrBackward}
                                otherDeetsForwardOrBackward={otherDeetsForwardOrBackward}
                                projectArray={projectArray}
                                handleProjectChange={handleProjectChange}
                                handleDeleteProject={handleDeleteProject}
                                handleAddProject={handleAddProject}
                                projectForwardOrBackward={projectForwardOrBackward}
                            />
                break;
            case "partnership":
            case "research":
            case "grant":
                template  = <h5 style={{textAlign: "center", padding: "30px 0 !important"}}>Coming Soon</h5>
                break;
        
            default:
                template = <ProductsPartial 
                                productFaded={productFaded}
                                objFaded={objFaded}
                                customersFaded={customersFaded}
                                otherDeetsFaded={otherDeetsFaded}
                                suggestedObj={suggestedObj}
                                handleDeleteObj={handleDeleteObj}
                                objInput={objInput}
                                handleObjInputChange={handleObjInputChange}
                                objForwardOrBackward={objForwardOrBackward}
                                customersForwardOrBackward={customersForwardOrBackward}
                                otherDeetsForwardOrBackward={otherDeetsForwardOrBackward}
                                productArray={productArray}
                                handleProductChange={handleProductChange}
                                handleDeleteProduct={handleDeleteProduct}
                                handleAddProduct={handleAddProduct}
                                productForwardOrBackward={productForwardOrBackward}
                            />
                break;
        }

        return template
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

                        {/* COMPANY DETAILS */}
                        <div id="addy" className={`Segment ${addyFaded ? "Faded" : "Faded-in"}`}>
                            <h4>Answer a few questions to get a Customized Proposal</h4>
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
                                        Proposal Type &nbsp;&nbsp;<FaLongArrowAltRight />
                                    </ButtonSubmitGreen>
                                </div>
                            </div>
                        </div>


                        {/* PROPOSAL TYPE */}
                        <div id="prop-type" className={`Segment ${propTypeFaded ? "Faded" : "Faded-in"}`}>
                            <h4>Proposal Type</h4>
                            <div style={{width: '100%', textAlign: 'center', marginBottom: "20px"}}>       
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
                                        onClick={() => handleProposalTypeForward("product")}
                                        className={selectedIndex === 1 ? 'Mui-selected' : ''}
                                    >
                                        Product
                                    </Button>
                                    <Button
                                        onClick={() => handleProposalTypeForward("service")}
                                        className={selectedIndex === 2 ? 'Mui-selected' : ''}
                                    >
                                        Service
                                    </Button>
                                    <Button
                                        onClick={() => handleProposalTypeForward("project")}
                                        className={selectedIndex === 3 ? 'Mui-selected' : ''}
                                    >
                                        Project
                                    </Button>
                                </ButtonGroup>


                                <ButtonGroup
                                    sx={{
                                        '& .MuiButton-root': {
                                        backgroundColor: '#3E8F93',
                                        marginTop: screenWidth < 900 ? "10px" : "0",
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
                                        onClick={() => handleProposalTypeForward("partnership")}
                                        className={selectedIndex === 4 ? 'Mui-selected' : ''}
                                    >
                                        Partnership
                                    </Button>
                                    <Button
                                        onClick={() => handleProposalTypeForward("research")}
                                        className={selectedIndex === 5 ? 'Mui-selected' : ''}
                                    >
                                        Research
                                    </Button>
                                    <Button
                                        onClick={() => handleProposalTypeForward("grant")}
                                        className={selectedIndex === 6 ? 'Mui-selected' : ''}
                                    >
                                        Grant
                                    </Button>
                                </ButtonGroup>
                            </div>

                            {/* Visibility Buttons */}
                            <div
                                style={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "space-between",
                                marginBottom: "20px",
                                }}
                            >
                                <div className='prev-page' onClick={handleProposalTypeBackward}>
                                    <FaLongArrowAltLeft />
                                </div>
                            </div>
                        </div>

                        {ProposalPartialToDisplay()}

                    </form>

                </div>

            </div>
        </div>
    )
}




export default CustomizeProposal;