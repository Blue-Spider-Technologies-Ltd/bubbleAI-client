import React, {useState} from 'react';
import styled from 'styled-components';
import { MdOutlineCancel } from "react-icons/md";
import {Link} from "react-router-dom";


const Free = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    background: #39686B;
    color: #fff;
    opacity: 0.8;
    .icon{
        position: absolute;
        top: 0.5rem;
        right: 1rem;
        text-align: right;
        font-size: 1.5rem;
        font-weight: 200;
    }
    .link{
        color: #F7FF05;
        text-decoration: underline;
        margin-top: 1rem;
    }
    .link,p{
        text-align: center;
    }
    p{
        margin-bottom: 1rem;
    }
    
`;

const FreeTrial = () => {
    const [cancel, setCancel] = useState(false);
    return (
        <>
            {cancel ? <></> :
                <Free>
                    <span className="icon" onClick={() => setCancel(!cancel)}>
                        <MdOutlineCancel/>
                    </span>
                    <Link className="link">Grab FREE TRIAL Now!</Link>
                    <p>join thousands of successful job seekers in Nigeria!</p>
                </Free>}
        </>


    );
}

export default FreeTrial;