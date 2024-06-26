import React from 'react'
import { BiHelpCircle } from "react-icons/bi";


const HelpIcon = () => {
    const toContact = () => {
        window.location.href = '/support'
    }
    return (
        <div style={style.iconCont} onClick={toContact}>
            <BiHelpCircle style={style.icon} />
        </div>
    )
}

const style = {
    iconCont: {
        borderRadius: '50%',
        cursor: 'pointer',
        position: 'fixed',
        bottom: '25px',
        right: '30px',
        width: '2.5rem',
        height: '2.5rem',
        zIndex: '99'
    },
    icon: {
        width: '100%',
        color: '#56A8AC',
        height: '100%'
    }
}

export default HelpIcon;