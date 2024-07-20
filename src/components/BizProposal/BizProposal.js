import React from 'react'
// import resumeCss from './Resume.module.css'
import CustomizeProposal from './CustomizeProposal'
// import PreviewResume from './PreviewResume'
// import DownloadResume from './DownloadResume'
import { useLocation } from 'react-router-dom'


const BizProposal = () => {
    const location = useLocation()
    
    const currentComponent = (path) => {
        let page
        switch (path) {
            case "?customize":
                page = <CustomizeProposal />
                break;
            // case "?preview":
            //     page = <PreviewResume />
            //     break;
            // case "?download":
            //     page = <DownloadResume />
            //     break;
    
            default: 
                page = <CustomizeProposal />
                break;
        }
        return page
    }

    const page = currentComponent(location.search)

    return (
        page
    )
}


export default BizProposal;