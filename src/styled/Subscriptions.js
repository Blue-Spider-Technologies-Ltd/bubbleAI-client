import styled from "styled-components";


const ContainerStyled = styled.div`
    background: ${({theme})=> theme === 'dark' ? 'rgb(24, 52, 59)' : 'rgba(111, 203, 209, 0.12)'};
    color: ${({theme})=> theme === 'dark' ? '#fff' : '#39686B'};
    display: flex;
    flex-direction: column;
    padding: 1rem;
    margin: 3rem auto;
`;


const CardContainerStyled = styled.div`
    margin: 1rem auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    
    @media only screen and (min-width: 992px) {
        display: flex;
        flex-direction: row;
       

    }
    
`;

const CardStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.7rem;
    background: #fff;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border-radius: 0.625rem;
    color: ${({theme})=> theme === 'dark' ? '#000' : '#39686B'};
    padding: 1rem;
    & :last-child{
        align-self: end;
    }

    h2{
        font-size: 1.3rem;
    }
    .info{
        display: flex;
        justify-content: space-between;
        & :first-child{
            font-size: 1.1rem;
            font-weight: 300;
        }
        & :last-child{
            font-size: 1.3rem;
            font-weight: 700;
        }
    }
    .items p{
        font-weight: 300;

    }
    .discount{
        color: #5fbec5;
    }
    .hr{
        border-bottom: 1px solid #5fbec5;
    }
    .premiumInfo{
        display: flex;
        justify-content: space-between;
        .discount{
            color: #5fbec5;
        }
        span{
            display: flex;
            gap: 0.7rem;
        }
    }
    .premiumMessage{
        font-size: 0.8rem;
    }

    @media only screen and (min-width: 992px) {
    }
`;




export {CardStyled, ContainerStyled, CardContainerStyled};