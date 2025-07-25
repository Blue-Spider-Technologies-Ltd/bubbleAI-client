import styled from "styled-components";


export const ModalContainerStyled = styled.div`
    position: fixed;
    inset: 0; 
    background-color: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(6px); 
    -webkit-backdrop-filter: blur(6px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;

`;

export const ModalStyled = styled.div`
    background: #DFEEEF;
    width: 90%;
    color: #000;
    height: fit-content;
    padding: 2rem;
    border-radius: 0.75rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    text-align: center;
    & :first-child{
        text-align: right;
        font-size: 1.2rem;
    }
    h2{
        font-size: 0.9rem;
        margin: 1rem auto;
    }
    .plans{
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        gap: 1rem;
        height: 350px;
        overflow: auto;
        .planContainer{
            display: flex;
            flex-direction: column;
            border-radius: 0.625rem;
            background: #fff;
            width: 100%;
            min-height: 350px;
            .header{
                background: rgba(62, 143, 147, 0.8);
                border-radius: 0.625rem 0.625rem 0 0;
                padding: 1rem;

                h3{
                    text-align: left;
                    font-size: 0.8rem;
                    font-weight: 300;
                }
                p{
                    text-align: left;
                    font-size: 1rem;
                }
                
            }
        }
        
    }
    @media only screen and (min-width: 992px) {
        & :first-child{
            text-align: right;
            font-size: 2rem;
        }
        h2{
            font-size: 1.2rem;
        }
        .plans{
            flex-direction: row;
            justify-content: space-evenly;
            gap: 1rem;
            height: 450px;

            .planContainer{
                display: flex;
                flex-direction: column;
                border-radius: 0.625rem;
                background: #fff;
                width: 100%;
                min-height: 300px;
                .header{
                    background: rgba(62, 143, 147, 0.8);
                    border-radius: 0.625rem 0.625rem 0 0;
                    padding: 1rem;

                    h3{
                        font-size: 1rem;
                    }
                    p{
                        font-size: 1.2rem;
                    }

                }
            }
        
    }

`