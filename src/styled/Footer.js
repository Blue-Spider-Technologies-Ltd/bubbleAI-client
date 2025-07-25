import styled from "styled-components";
import bubblebg from "../images/bubblebannerbg.png";

export const FooterContainerStyled = styled.div`
    background:
            linear-gradient(to right, rgba(12, 30, 40, 0.5), rgba(12, 30, 40, 0.5)),
            url(${bubblebg}) center center;
    background-size: cover;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    color: #fff;
    
    
    .topHalf{
        display: flex;
        flex-direction: column;
        width: 100%;
        .newsletter{
            display: flex;
            flex-direction: column;
            gap: 0.7rem;
            p{
                font-size: 1rem;
            }
            .subscribe{
                display: flex;
                justify-content: space-between;
                width: 100%;
                background: #fff;
                border-radius: 0.625rem;
                padding: 0.7rem 0.9rem;
                input{
                    border: none;
                    outline: none;
                }
                button{
                    border-radius: 1rem;
                    padding: 0.2rem 0.3rem;
                    border: none;
                    background: linear-gradient(to right, #6FCBD1, #0C1E28);
                    color: #fff;

                }
            }
            
        }
        
    }
    
    .midHalf{
        .links{
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 1rem;
            text-transform: capitalize;
            .items{
                display: flex;
                flex-direction: column;
                justify-content: center;
                gap: 0.7rem;
            }
            h3{
                margin-bottom: 0.7rem;
            }
            h3,p{
                width: max-content;
                font-size: 0.9rem;
            ;
            }
            
        }
    }
    
    .bottomHalf{
        display: flex;
        justify-content: center;
        margin-bottom: 1rem;
        .socials{
            display: flex;
            gap: 1rem;
        }
    }
    .copyright{
        display: flex;
        justify-content: space-between;
        font-size: 0.4rem;
        p{
            color: #5fbec5;
        }
        .others{
            display: flex;
            gap: 0.7rem;
            .copyLinks{
                color: #fff
            }
        }
    }

    @media only screen and (min-width: 992px) {
        .topHalf{
            flex-direction: row;
            justify-content: space-between;
        }
        .midHalf{
            .links{
                h3,p{
                    font-size: 1rem;
                }
            }
        }
        .copyright{
            font-size: 0.8rem;
        }
    }
`;