import React, {useState, useEffect} from 'react';

import { Routes, useLocation } from "react-router-dom"
import ProgressBar from '../progressbar';

const CustomRoutes = ({children}) => {
    const [progress, setProgress] = useState(false)
    const [prevLoc, setPrevLoc] = useState("")
    const location = useLocation()

    useEffect(() => {
        setPrevLoc(location.pathname)
        setProgress(true)
        if(location.pathname===prevLoc){
            setPrevLoc('')
        }
     }, [location])
  
     useEffect(() => {
        setProgress(false)
     }, [prevLoc])

    return(
        <>
            {<ProgressBar loading={progress}/>}
            <Routes>{children}</Routes>
        </>
    );
}

export default CustomRoutes;