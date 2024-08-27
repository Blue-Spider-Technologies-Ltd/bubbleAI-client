import React from 'react'
import resumeCss from '../../Resume/Resume.module.css'
import { ButtonSubmitGreen } from '../../UI/Buttons/Buttons';
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaLongArrowAltLeft } from "react-icons/fa";
import Alert from '@mui/material/Alert';
import AuthInput from '../../UI/Input/AuthInputs';
import { Grid } from "@mui/material";
const screenWidth = window.innerWidth;

const ProductsPartial = ({
    productFaded, 
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
    testimonialsArray,
    productArray,
    handleProductChange,
    handleDeleteProduct,
    handleAddProduct,
    handleAddTestimony,
    handleDeleteTestimony,
    handleTestimonyChange,
    otherDeets,
    handleOtherDeetsChange,
    productForwardOrBackward 
}) => {

    return (
        <div>
            {/* PRODUCT DETAILS */}
            <div id="product-deets" className={`Segment ${productFaded ? "Faded" : "Faded-in"}`}>
                <h4>Product Details</h4>

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
                                        name="price"
                                        id={item.price}
                                        value={item.price}
                                        label="Price (OPTIONAL)"
                                        inputGridSm={12}
                                        inputType="text"
                                        mb={2}
                                        onChange={(event) => handleProductChange(event, index)}
                                    />
                                    <AuthInput
                                        name="dicountPercent"
                                        id={item.discountPercent}
                                        value={item.discountPercent}
                                        label="Discount Percentage (OPTIONAL)"
                                        inputGridSm={12}
                                        inputType="number"
                                        mb={2}
                                        onChange={(event) => handleProductChange(event, index)}
                                    />
                                    <AuthInput
                                        name="productDesc"
                                        id={item.productDesc}
                                        value={item.productDesc}
                                        label="[If available] Describe your product"
                                        placeholder="[If available] Describe your product"
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

        
                {/* Product Visibility Buttons */}
                <div
                    style={{
                        width: "100%",
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: "20px",
                    }}
                >
                    <div className='prev-page' onClick={() => {productForwardOrBackward('backward')}}>
                        <FaLongArrowAltLeft />
                    </div>
                    <div style={{ width: "200px"}}>
                        <ButtonSubmitGreen type="button" onClick={() => {
                            productForwardOrBackward('forward')
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
                    What need does your product solve?
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
                        name="objInput"
                        value={objInput}
                        placeholder="Enter some objectives (Objectives are details of what your product will solve. Separate each sentence/word with a comma, semi-colon or full-stop)"
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
                            Testimonials &nbsp;&nbsp;<FaLongArrowAltRight />
                        </ButtonSubmitGreen>
                    </div>
                </div>
            </div>

            {/* CUSTOMERS/PARTNERS */}
            <div id="testimonial" className={`Segment ${customersFaded ? "Faded" : "Faded-in"}`}>
            
                <h4>Customers/Partners</h4>
                <Alert 
                    sx={{padding: '0 5px', display: 'flex', justifyContent: "center", fontSize: '.8rem', width: '300px', margin: "5px auto"}} 
                    severity="info"
                >
                    Enter previous or current <strong>customers/partners</strong> who your products have helped. This will strengthen your conversion by 40%
                </Alert>

                <div>
                    <Grid
                        container
                        sx={{ display: "flex", justifyContent: "space-around" }}
                        mt={3}
                    >
                        {testimonialsArray.length > 0 && testimonialsArray.map((item, index) => {
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
                                        name="clientName"
                                        id={item.clientName}
                                        value={item.clientName}
                                        label={`Client Name ${index + 1}`}
                                        inputGridSm={12}
                                        inputType="text"
                                        mb={2}
                                        required={true}
                                        onChange={(event) => handleTestimonyChange(event, index)}
                                    />
                                    <AuthInput
                                        name="testimony"
                                        id={item.testimony}
                                        value={item.testimony}
                                        placeholder="testimony/how client was helped (OPTIONAL)"
                                        inputGridSm={12}
                                        multiline={true}
                                        mt={2}
                                        rows={4}
                                        maxRows={6}
                                        onChange={(event) => handleTestimonyChange(event, index)}
                                    />
                                </Grid>
                            );
                        })}

                    </Grid>

                    <div className={resumeCss.CenteredElem}>
                        <div
                            style={{ marginRight: "10px" }}
                            className="delete"
                            title="Delete Testimony"
                            onClick={handleDeleteTestimony}
                        >
                            -
                        </div>
                        <div
                            className="add"
                            title="Add Testimony"
                            onClick={handleAddTestimony}
                        >
                            +
                        </div>
                    </div>
                </div>
                

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
            <div id="other-deets" className={`Segment ${otherDeetsFaded ? "Faded" : "Faded-in"}`}>
                <h4>Other Details</h4>
                {/* <Alert 
                    sx={{padding: '0 5px', display: 'flex', justifyContent: "center", fontSize: '.8rem', width: '300px', margin: "5px auto"}} 
                    severity="info"
                >
                    What need does your product solve?
                </Alert> */}
                <Grid
                    container
                    sx={{ display: "flex", justifyContent: "space-around" }}
                    mt={3}
                >  
                    <AuthInput
                        name={otherDeets?.teamSize}
                        id={otherDeets?.teamSize}
                        value={otherDeets?.teamSize}
                        label="Team Size"
                        inputGridSm={12}
                        inputGrid={6}
                        inputType="number"
                        mb={2}
                        onChange={handleOtherDeetsChange("teamSize")}
                    />
                    <AuthInput
                        name={otherDeets?.yearsInBiz}
                        id={otherDeets?.yearsInBiz}
                        value={otherDeets?.yearsInBiz}
                        label="Years in Business"
                        inputGridSm={12}
                        inputGrid={6}
                        inputType="number"
                        mb={2}
                        onChange={handleOtherDeetsChange("yearsInBiz")}
                    />
                    <AuthInput
                        name={otherDeets?.missionVisionCore}
                        id={otherDeets?.missionVisionCore}
                        value={otherDeets?.missionVisionCore}
                        label="[If available] Mission: Vision: Core Values: "
                        placeholder="[If available] Mission: Vision: Core Values: "
                        multiline={true}
                        inputGridSm={12}
                        mt={2}
                        rows={4}
                        maxRows={6}
                        onChange={handleOtherDeetsChange("missionVisionCore")}
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

export default ProductsPartial;