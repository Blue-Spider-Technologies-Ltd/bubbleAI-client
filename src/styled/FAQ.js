import styled from "styled-components";


export const FAQWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 3rem auto;
    
`;

export const BoxStyled = styled.div`
    .question {
        display: flex;
        justify-content: space-between;
        border: none;
        color: ${({ theme }) => theme === 'dark' ? 'white' : 'black'};
        width: 90%;
        margin: 0 auto;
        border-radius: 0.625rem;
        text-align: left;
        padding: 1rem;
        font-size: 0.8rem;
        background: ${({theme}) => theme === 'dark' ? '#34797e' : '#64a7aa'};
        cursor: pointer;
    }
    .answer{
        width: 85%;
        margin: 0 auto;
        background: rgba(111, 203, 209, 0.5);
        border-top: .7px solid #5fbec5;
        font-size: 0.8rem;
        padding: 1rem;
    }
`;