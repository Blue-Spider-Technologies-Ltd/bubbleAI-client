import React, { useState, useEffect } from 'react';
import adminCss from "./Admin.module.css"
import axios from "axios";
import AdminSideMenu from "../components/UI/AdminSideMenu/AdminSideMenu";
import AuthInput from '../components/UI/Input/AuthInputs';
import { Grid } from "@mui/material";
import { ButtonSubmitGreen } from '../components/UI/Buttons/Buttons';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { errorAnimation, successMiniAnimation, checkAuthenticatedAdmin, generatePassword } from '../utils/client-functions';
import { setError, setFetching, setSuccessMini } from '../redux/states';
import AdminsTable from '../components/UI/Tables/AdminsTable'
//Wrap whole app around ConfirmProvider to be able to open confirmation dialog prompt

const roles = [
    {
        name: "superadmin"
    },
    {
        name: "admin"
    },
    {
        name: "support"
    }
]

const CreateAdmins = () => {
    const { error, successMini } = useSelector((state) => state.stateData);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [adminEmail, setAdminEmail] = useState("")
    const [admins, setAdmins] = useState([])
    const [fullName, setFullName] = useState("")
    const [role, setRole] = useState("")
    const isAdminAuth = sessionStorage?.getItem("afd8TvhsdjwiuuvsgjhsAfgsUhjs")

    useEffect(() => {
        const fetchAdmins = async () => {
            try {
                //must await
                await checkAuthenticatedAdmin()
            } catch (error) {
                return navigate("/");      
            }
            try {
                dispatch(setFetching(true))
                const response = await axios.get("/origin/get-all-admins", {
                    headers: {
                      "x-access-token": isAdminAuth,
                    },
                });
                setAdmins(response.data.admins)
                dispatch(setFetching(false))
            } catch (error) {
                dispatch(setFetching(false))
                errorSetter(error?.response?.statusText)
            }
        }

        fetchAdmins()
    }, [navigate])
    
    const errorSetter = (string) => {
        dispatch(setError(string))
        errorAnimation()
    }

    const successSetter = (string) => {
        dispatch(setSuccessMini(string))
        successMiniAnimation()
    }

    const handleEmailChange = (e) => {
        setAdminEmail(e.target.value)
    }

    const handleFullNameChange = (e) => {
        setFullName(e.target.value)
    }

    const handleRoleChange = (e) => {
        if (e.target.value === undefined) {
            return setRole("")
        }
        setRole(e.target.value)
    }

    const createAdmin = async () => {
        
        try {
            //must await
            await checkAuthenticatedAdmin()
        } catch (error) {
            return navigate("/");      
        }

        try {
            if(!adminEmail || !fullName || !role) {
                return errorSetter("Fill in all required fields")
            }
            dispatch(setFetching(true))
            const adminData = {
                adminEmail: adminEmail,
                fullName: fullName,
                role: role,
                password: generatePassword()
            }
            const response = await axios.post("/origin/create-admin", adminData, {
                headers: {
                    "x-access-token": isAdminAuth,
                },
            });
            
            if (response.status === 201) {
                setAdmins(response.data.admins)
                dispatch(setFetching(false))
                successSetter(`New Admin: ${adminData.adminEmail} generated`)
                return
            }

        } catch (error) {
            errorSetter(error?.response?.data?.message)
            dispatch(setFetching(false))
        }


    }

  return (
    <div className={adminCss.AdminDashboard}>
        <AdminSideMenu />
        <div className={adminCss.OtherWrapper}>
            <div className="error">{error}</div>
            <div className="success-mini">{successMini}</div>
            <div className={adminCss.TopContainer}>
                <h4>Manage Admins</h4>
            </div>

            <div className='Segment'>
                <h5 style={{marginLeft: "10px", margin: "10px"}}>Create New Admin</h5>

                <Grid container>

                    <AuthInput 
                        id="fullName"  
                        name="fullName"  
                        value={fullName}
                        label="Full Name" 
                        inputType="text" 
                        inputGridSm={12} 
                        inputGrid={6} 
                        mb={2}
                        onChange={handleFullNameChange}
                        required
                    />

                    <AuthInput 
                        name="code"  
                        value={adminEmail}
                        label="Admin Email" 
                        inputType="email" 
                        inputGridSm={12} 
                        inputGrid={6} 
                        mb={2} 
                        onChange={handleEmailChange}
                        required
                    />

                    <AuthInput 
                        id="role"  
                        name="role"  
                        value={role}
                        label="Select Role" 
                        inputType="select2" 
                        inputGridSm={12} 
                        inputGrid={6} 
                        mb={2} 
                        list={roles}
                        onChange={handleRoleChange}
                        required
                    />


                    <Grid item xs={12} md={6}>
                        <div style={{ width: "100%"}}>
                            <ButtonSubmitGreen type="button" onClick={createAdmin}>
                                Create Admin
                            </ButtonSubmitGreen>
                        </div>
                    </Grid>
                </Grid>


            </div>

            <div className='Segment'>
                <AdminsTable allAdmins={admins} />
            </div>

        </div>
    </div>
  );
}

export default CreateAdmins;
