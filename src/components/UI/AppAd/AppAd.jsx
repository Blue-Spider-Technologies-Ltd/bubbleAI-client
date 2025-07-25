import React from 'react';
import styled from 'styled-components';
import appad from '../../../images/Rectangle89.png'
import {useTheme} from "../Theme/ThemeContext"


const AppAdStyled = styled.div`
    position: relative;
    display: flex;
    margin: 2rem auto;
    .imgcontainer {
       width: 100%;
        background: linear-gradient(to bottom, #0b1f2a, #0e2f3d);
        outline: hidden;
        img{
            object-fit: cover;
            width: 100%;
            height: inherit;
        }
    }
    span {
        position: absolute;
        width: 60%;
        top: 50%;
        left: 55%;
        transform: translateY(-50%);
        & h3, p {
            font-weight: 300;
            color: #fff;
            font-size: 0.9rem;
        }
    }

    @media only screen and (min-width: 760px) {
        position: relative;
        display: flex;
        margin: 2rem auto;
        .imgcontainer {
            width: 450px;
            height: auto;
            border: 20px solid ${({theme}) => theme === 'dark' ? '#6FCBD1' : '#fff'};
            border-left: none;
            border-top-right-radius: 3rem;
            border-bottom-right-radius: 3rem;
            overflow: hidden;

            img {
                width: 100%;
                height: 100%;
            }
        }

        span {
            position: absolute;
            top: 50%;
            left: 36%;
            transform: translateY(-50%);
            display: flex;
            flex-direction: column;
            justify-content: center;
            background: #0C1E28;
            width: 100%;
            height: fit-content;
            padding: 4rem;
            border: 20px solid ${({theme}) => theme === 'dark' ? '#6FCBD1' : '#fff'};
            border-radius: 3rem 0 0 3rem;
            border-right: none;

            h3, p {
                text-align: left;
                font-size: 1.5rem;
                color: ${({theme}) => theme === 'dark' ? '#6FCBD1' : '#fff'}
            }


        }

    }

    @media only screen and (min-width: 992px) {
        span {
            left: 25%;
            h3, p {
                font-size: 2rem;
            }
        }

    }

`


const AppAd = () => {
    const {themeName} = useTheme();
    return (
        <AppAdStyled theme={themeName}>
            <div className="imgcontainer">
                <img src={appad} alt="appad"/>
            </div>
            <span>
                    <h3>Download the App</h3>
                    <p>for a more seamless experience.</p>
                </span>

        </AppAdStyled>
    );
}

export default AppAd;