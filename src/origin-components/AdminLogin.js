import React, { useState } from "react";
import authCss from "../components/Auth/Auth.module.css";
import { Input } from "../components/UI/Input/Input";
import { ButtonSubmitBlack } from "../components/UI/Buttons/Buttons";
import { Send } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ThreeCircles } from 'react-loader-spinner';
import { errorAnimation } from "../utils/client-functions";
// import { checkAuthenticatedUser } from "../../utils/client-functions";


// const screenWidth = window.innerWidth

const AdminLogin = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({
        email: '',
        password: ''
    })

    
    const errorSetter = (string) => {
        setError(string)
        errorAnimation()
    }


    // useEffect(() => {

    //     const isUserAuthenticated = async () => {
    //         try {
    //             await checkAuthenticatedUser()
    //             if (queryString.length >= 1)  {
    //                 if (queryString === 'pricing') {
    //                     navigate(`/pricing`)
    //                 } else {
    //                     navigate(`/user/dashboard/${queryString}`)
    //                 }
    //             } else {
    //                 navigate('/')
    //             }
    //         } catch (error) {
    //             navigate(`/popin?${queryString}`)
    //             return
    //         }
    //     }

    //     isUserAuthenticated()
    // }, [navigate, queryString])

    //Login submit handler
    const handleFormSubmitLogin = async (e) => {
        e.preventDefault()
        setError("")
        setLoading(true)
        
        const admData = {
            email: data.email,
            password: data.password
        }
        try {
            const response = await axios.post('auth/admin/login', admData)
            let userDetails = response?.data?.admin
            localStorage.setItem('token', userDetails)
            setError("")

            setLoading(false)
            //If user was redirected to login from a page because of a service request to a protected route
            
        } catch (error) {
            setLoading(false)
            console.log(error?.response?.data?.mesage);
            errorSetter(error?.response?.data?.message);
        }

    }

    const handleInputChange = (prop) => (event) => {
        setError("")
        setData({ ...data, [prop]: event.target.value});
    };


    return (
        <div>

            <div className={authCss.formContainer}>
                <div className={authCss.formInner} style={{marginTop: '200px'}}>
                    <h2>Controller Pop in</h2>
                    <div className="error">{error}</div>
                    <form onSubmit={handleFormSubmitLogin}>
                        <Input placeholder="Email..." inputType="email" inputGridSm={12} onChange={handleInputChange('email')} /> 
                        
                    
                        <div>
                            <Input placeholder="Password..." inputType="password" inputGridSm={12} onChange={handleInputChange('password')} />
                        </div>
                        <div> 
                            <ButtonSubmitBlack disabled={loading} type="submit">{!loading ? <Send /> : 
                                <ThreeCircles
                                    height="25"
                                    width="25"
                                    color="#FFFFFF"
                                    visible={true}
                                    ariaLabel="three-circles-rotating"
                                />}
                            </ButtonSubmitBlack>
                        </div>
                    </form>

                </div>
            </div>
        </div>        
    )
}

export default AdminLogin;