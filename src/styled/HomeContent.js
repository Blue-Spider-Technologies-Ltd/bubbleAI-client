import styled from "styled-components";
import bubblebg from "../images/bubblebannerbg.png"




export const MainBannerStyled = styled.div`
    display: flex;
    width: 90%;
    flex-direction: column;
    margin: 3rem auto;
    padding: 1rem;
    gap: 0.5rem;
    justify-content: center;
    align-items: center;
    border-radius: 0.625rem;
    background:
            linear-gradient(to right, rgba(111, 203, 209, 0.8), rgba(57, 104, 107, 0.8)),
            url(${bubblebg}) center center;
    background-size: cover;
    h1{
        font-family: "Kdam Thmor Pro", sans-serif;
        font-weight: 400;
        font-style: normal;
    }
    h1,p{
        color: #fff;
    }
    .search{
        display: flex;
        justify-content: space-between;
        background: #fff;
        width: 90%;
        margin: 0 auto;
        border-radius: 0.625rem;
        padding: 1rem;
        input{
            border: none;
            width: 70%;
            outline: none;
        }
    }
    .desktopbtns{
        display: none;
    }
    .privacy{
        font-size: 0.9rem;
        color:#fff;
        text-decoration: underline;
    }

    @media only screen and (min-width: 992px) {
        .desktopbtns{
            display: flex;
            justify-content: center;
            margin: 1rem auto;
            gap: 1rem;
        }
        .search{
            padding: 2.5rem;
        }
    }
    
`;

export const OffersContainerStyled = styled.div`
    display: flex; 
    flex-flow: column wrap; 
    gap: 1rem; 
    margin: 3rem auto;
    @media only screen and (min-width: 992px) {
        padding: 1rem;
        flex-flow: row wrap;
    }

`

export const OffersDataStyled =styled.div`
    background: ${({theme})=> theme === 'dark' ? 'linear-gradient(to bottom, rgba(111, 203, 209), rgba(57, 104, 107))' : 'transparent' };
    border: 1px solid #6FCBD1;
    border-radius: 0.625rem;
    width: 90%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 1.7rem;
    padding: 1rem;
    h2{
        font-weight: 400;
        text-align: center;
    }
    span{
        overflow: hidden;
        width: 180px;
        height: 180px;
        border-radius: 50%;
        & img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    p{
        text-align: center;
    }
    @media only screen and (min-width: 992px) {
        flex: 1 1 22%; /* Four boxes ideally (25% - some margin) */
        min-width: 200px;
        h2,p{
            font-size: 0.9rem;
        }
    }
    
`;



export const SectionTitleStyled =styled.h2`
    text-align: center;
    font-size: 1.2rem;
    margin: 0;
    color: ${({theme})=> theme === "dark" ? '#fff' : '#39686B'};
    
`