import React from 'react'

import Progress from './Progress'

import Navbar from '../Shared/Navbar'

const Schedule = () => {

    return(
        <>
        <Navbar/>
        <div style={{background: "#fafcff", display:"flex",flexDirection:"row",height:"calc(100vh - 60px)", width: "100%", alignItems: 'center', justifyContent: 'center'}}>
            <Progress/>
        </div>

        </>
    )
}

export default Schedule