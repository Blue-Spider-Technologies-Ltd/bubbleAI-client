import styled from "styled-components";


const ButtonsStyled = styled.div`
    border: 1px solid ${({theme})=> theme === 'dark' ? '#6FCBD1': '#6FCBD1' };
    background: ${({pricing})=> pricing === 'true' && 'linear-gradient(to left, #6FCBD1, #39686B )'};
    padding: ${({pad})=> pad || '0.27rem 1rem' };
    width: fit-content;
    border-radius: ${({borderRadius})=> borderRadius || '0.625rem'};
    .btn{
        color: ${({color})=> color || '#6FCBD1' };

    }
    
`;


export default ButtonsStyled;