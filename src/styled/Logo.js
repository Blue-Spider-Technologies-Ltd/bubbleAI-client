import styled from "styled-components";

export const LogoContainerStyled = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img{
        width: ${({width}) => width || '6rem'};
        height: ${({height}) => height || '2.4rem'};
    }
`