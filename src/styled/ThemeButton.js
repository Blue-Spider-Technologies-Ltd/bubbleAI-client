import styled from "styled-components";

const ThemeButtonStyled = styled.button`
    background-color: ${({ theme }) => theme.buttonBg};
    color: ${({ theme }) => theme.buttonText};
    font-size: 1.3rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: fit-content;
    height: fit-content;
    padding: 0.5rem;
    border: none;
    border-radius: 50%;
    cursor: pointer;
`;

export default ThemeButtonStyled;