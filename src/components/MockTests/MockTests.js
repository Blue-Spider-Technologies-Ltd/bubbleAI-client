import React, { useState, useEffect } from "react";
import mockCss from "./Mock.module.css"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setError } from "../../redux/states";
import { errorAnimation } from "../../utils/client-functions";
import AuthHeader from "../UI/AuthHeader/AuthHeader";
import AuthSideMenu from "../UI/AuthSideMenu/AuthSideMenu";
import { ButtonCard } from "../UI/Buttons/Buttons";
import { Grid } from "@mui/material";
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import AuthInputs from "../UI/Input/AuthInputs";
import { checkAuthenticatedUser } from "../../utils/client-functions";


const DashSupport = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchString, setSearchString] = useState("");
    const [searchArray, setSearchArray] = useState([]);
    const [searching, setSearching] = useState(false);
    const screenWidth = window.innerWidth
    const searchBarWidth = screenWidth >= 900 ? '40%' : '80%';
    
  
    const errorSetter = (string) => {
        dispatch(setError(string))
        errorAnimation()
    }

    const toggleSideMenu = () => {
        setMenuOpen(!menuOpen)
    }

    const examIconImg = (<ImportContactsIcon sx={{fontSize: '4rem'}} /> )

    const mockTests = [
        {
            title: "UTME",
            description: "Unified Tertiary Matriculation Examination Mock",
            onClick: () => {
                navigate("/user/dashboard/mock/utme")
            }
        },
        {
            title: "IELTS",
            description: "International English Language Testing System Mock Exams",
            onClick: () => {
                navigate("/user/dashboard/mock/ielts")
            }
        },
        {
            title: "WASSCE",
            description: "The West African Senior School Certification Examination Mock",
            onClick: () => {
                navigate("/user/dashboard/mock/wassce")
            }
        },
        {
            title: "TOEFL",
            description: "Test Of English as a Foreign Language Mock",
            onClick: () => {
                navigate("/user/dashboard/mock/toefl")
            }
        },
        {
            title: "CEE",
            description: "Cambridge English Mock Exam",
            onClick: () => {
                navigate("/user/dashboard/mock/cee")
            }
        },
        {
            title: "NECO",
            description: "National Examination Council Mock Exams",
            onClick: () => {
                navigate("/user/dashboard/mock/neco")
            }
        },
        {
            title: "GRE",
            description: "Graduate Record Examination Mock Exams",
            onClick: () => {
                navigate("/user/dashboard/mock/gre")
            }
        },
        {
            title: "CEH",
            description: "Certified Ethical Hacker Mock Exams",
            onClick: () => {
                navigate("/user/dashboard/mock/ceh")
            }
        },
        {
            title: "PMP",
            description: "Project Management Professional Mock Exams",
            onClick: () => {
                navigate("/user/dashboard/mock/pmp")
            }
        },
        {
            title: "CISSP",
            description: "Certified Information Systems Security Professional Mock Exams",
            onClick: () => {
                navigate("/user/dashboard/mock/cissp")
            }
        },
        {
            title: "CIMA",
            description: "Chartered Institute of Management Accountants Mock Exams",
            onClick: () => {
                navigate("/user/dashboard/mock/cima")
            }
        },
        {
            title: "FRM",
            description: "Financial Risk Manager Mock Exams",
            onClick: () => {
                navigate("/user/dashboard/mock/frm")
            }
        },
        {
            title: "CFA",
            description: "Chartered Financial Analyst Mock Exams",
            onClick: () => {
                navigate("/user/dashboard/mock/cfa")
            }
        },
        {
            title: "ACCA",
            description: "Association of Chartered Certified Accountants Mock Exams",
            onClick: () => {
                navigate("/user/dashboard/mock/acca")
            }
        } 
    ]

    
    useEffect(() => {
        const handleSearch = () => {
            const filteredData = mockTests.filter(item => 
                item.title.toLowerCase().includes(searchString.toLowerCase()) || 
                item.description.toLowerCase().includes(searchString.toLowerCase())
            );
            setSearchArray(filteredData);
        };
        if(searchString.length < 1) {
            setSearching(false)
        }
        if(searchString.length >= 1) {
            setSearching(true)
            handleSearch()
        }

    }, [searchString])

    useEffect(() => {
        window.scrollTo(0, 0);
        const checkIfAuthenticated = async () => {
            try {
                //must await
                await checkAuthenticatedUser()
            } catch (error) {
                return navigate("/popin?mock");      
            }
        }

        checkIfAuthenticated()
    }, []);

    const handleSearchInput = (e) => {
        setSearchString(e.target.value)
    }

    const searchDisplay = (
        <Grid container>
            {searchArray.map(({ title, description, onClick }, index) => (
                <Grid item xs={12} md={4} key={index}>
                    <ButtonCard 
                        iconImg={examIconImg}
                        title={title}
                        description={description}
                        onClick={onClick}
                    />
                </Grid>
            ))}
        </Grid>
    );

    const normalDisplay = (
        <Grid container>
            {mockTests.map((test, index) => {
                return(
                    <Grid item xs={12} md={4} key={index}>
                        <ButtonCard 
                            iconImg={examIconImg}
                            title={test.title}
                            description={test.description}
                            onClick={test.onClick}
                        />
                    </Grid>
                )
            })}
        </Grid>
    )
    


  return (
    <div className="auth-container">
        {/* For SIDE MENU */}
        <AuthSideMenu
            opened={menuOpen}
            seacrhBarPlaceholder="Search already taken Exams"
            hidden={!menuOpen}
        />
        <div style={{ width: `${searchBarWidth}`, padding: "0" }}>
            <div className="auth-bg-blob"></div>
        </div>

        <div className="auth-container-inner">
            {/* for TOP MENU */}
            <AuthHeader
                authMenuOpen={menuOpen}
                onClick={toggleSideMenu}
                headerText="Choose Exam"
            />

            <div className={mockCss.DescritionCont}>
                ACE your Professional Exams with Bubble AI's simulated time-based mock tests with over 
                10 years of randomized past questions. Get tutored by Bubble Ai on your weaknesses after each mock.
            </div>

            <div style={{width: searchBarWidth, margin: "auto"}}>
                <AuthInputs 
                    value={searchString} 
                    onChange={handleSearchInput} 
                    placeholder=" Search for Exam" 
                    inputType="search" 
                    mb={5} 
                    required={true}
                />
            </div>

            {!searching ? normalDisplay : searchDisplay}

            
        </div>
    </div>
  );
};

export default DashSupport;
