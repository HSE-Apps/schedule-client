import React from 'react'

import  {Typography} from 'antd'

import {motion} from 'framer-motion'

import useMedia from '../../hooks/useMedia'


const {Text, Title} = Typography


const Periods = ({periods}) => {

    const mobile = useMedia(['(min-width: 750px)', '(max-width: 750px)'], [false, true])

    return(
        periods.map((period) => {
            if(period.periodName != "Passing Period"){
               return( <motion.div whileHover={{x: 10}}  style={{boxShadow: " 2px 2px 15px rgb(0,118,220,0.18) ", width: "80%",maxWidth: "500px", height: mobile ? "70px" : "80px", borderRadius: "10px", cursor: 'pointer', display: "flex", justifyContent: "space-between", alignItems: "center", margin: "20px", padding: "24px"}}>
                <div>
                    <Title level={mobile ? 4 : 3} style={{color: "#333", marginBottom: '0px'}}>{period.periodName}</Title>
                </div>
                <div>
                    <Text style={{color: "#555", fontSize: mobile ? '12px' : '14px'}}>{period.startTime} - {period.endTime}</Text>
                </div>
                </motion.div>
               )
            }
        })
    )
}

export default Periods