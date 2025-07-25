import styled from "styled-components";



const ProfileImageStyled = styled.span`
    display: flex;
    border-radius: 50%;
    border: none;
    width: 40px;
    height: 40px;
    overflow: hidden;
    & img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    
`;


export default ProfileImageStyled;