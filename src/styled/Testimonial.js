import styled from "styled-components";


const TestimonialStyled = styled.div`
    display: flex;
    margin: 3rem auto;
    background:
            linear-gradient(to bottom, rgba(111, 203, 209, 0.5), rgba(111, 203, 209));
    border-radius: 0.625rem;
    width: 90%;
    height: 270px;
    .content{
        display: flex;
        width: fit-content;
        flex-direction: column;
        font-size: 0.8rem;
        gap: 1.5rem;
        padding: 1rem;
        color: #000;
        
        p{
            width: 30ch;
        }
    }
    .imageBox{
        width: 280px;
        border-top-right-radius: 0.625rem;
        border-bottom-right-radius: 0.625rem;
        overflow: hidden;
        img{
            width: 100%;
            height: auto;
            object-fit: cover;
            display: block;

        }
    }
    @media only screen and (min-width: 992px) {
        height: 250px;
        .content{
            font-size: 1.2rem;
        }
    }
`;

export default TestimonialStyled;