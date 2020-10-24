import React, {useEffect} from 'react'

import Progress from './Progress'

import Navbar from '../Shared/Navbar'

import dayjs from 'dayjs'


var customParseFormat = require('dayjs/plugin/customParseFormat')

dayjs.extend(customParseFormat)


const Schedule = () => {

    useEffect(() => {
        let temp = dayjs('11:34 PM', 'h mm A').unix()
        let bruh = dayjs().unix()
        console.log(temp -bruh)
    })

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