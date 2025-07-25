import styled from "styled-components";

const IconButtonStyled = styled.button`
    display: flex;
    justify-content: center;
    font-size: ${({ fontSize }) => fontSize || '2rem'};
    background: ${({ bg }) => bg || 'transparent'};
    border: none;
    border-radius: 50%;
    padding: ${({pad})=> pad || '0'};
    cursor: pointer;
    color: ${({ color }) => color || '#fff'};
`;

export default IconButtonStyled;