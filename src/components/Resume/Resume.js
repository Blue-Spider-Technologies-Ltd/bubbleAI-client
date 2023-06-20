import React from 'react'
// import resumeCss from './Resume.module.css'
import CustomizeResume from './CustomizeResume'
import PreviewResume from './PreviewResume'
import { useLocation } from 'react-router-dom'


const Resume = () => {

    const location = useLocation()
    const currentComponent = (path) => {
        let page
        switch (path) {
            case "?customize":
                page = <CustomizeResume />
                break;
            case "?preview":
                page = <PreviewResume />
                break;
        
            default: 
                page = <CustomizeResume />
                break;
        }
        return page
    }

    const page = currentComponent(location.search)

    return (
        page
    )
}


export default Resume;