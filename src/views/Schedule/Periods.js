import React, { useState } from 'react'

import  {Typography} from 'antd'

import {motion} from 'framer-motion'

import useMedia from '../../hooks/useMedia'


import {use100vh} from 'react-div-100vh'

import { LeftOutlined, DownOutlined } from '@ant-design/icons';


const {Text, Title} = Typography

const periodV = {
    hidden:{
        opacity: 0,
        x: '200%'
     },
     visible:{
         opacity: 1,
         x: 0,
         transition: {
             type: 'spring',
             stiffness: 50
         }
     }
}

const bigContainerVariants = {
    hidden:{
        opacity: 0
    },
    visible:{
        opacity: 1,
        transition: {
            staggerChildren: "0.10"
        }
    }
}



const Periods = ({periods}) => {

    const mobile = useMedia(['(min-width: 750px)', '(max-width: 750px)'], [false, true])

    const [showLunch, setShowLunch] = useState(true)

    const vh = use100vh()

    return(
        <motion.div variants={bigContainerVariants} initial="hidden" animate="visible" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: "100%", maxHeight: vh * .85, overflowY: "scroll", overflowX: 'hidden', padding: '20px 0px', margin: '45px 0px'}}>
            {periods.map((period) => {
                if(period.periodName != "Passing Period"){
                    return( 
                    <>
                        <motion.div onClick={() => setShowLunch(!showLunch)} whileHover={{x: 10}} variants={periodV} style={{flexShrink: 0, boxShadow: " 2px 2px 15px rgb(0,118,220,0.18) ", width: "80%",maxWidth: "500px", height: mobile ? '60px' : '80px',borderRadius: "10px", cursor: period.lunchPeriods ? 'pointer' : '', display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: vh * .02, padding: "24px"}}>
                                <div>
                                    <Title level={mobile ? 4 : 3} style={{color: "#333", marginBottom: '0px'}}>{period.periodName}</Title>
                                </div>
                                <div>
                                    <Text style={{color: "#555", fontSize: mobile ? '12px' : '14px'}}>{period.startTime} - {period.endTime}</Text>
                                    {period.lunchPeriods && 
                                    <Text  style={{marginLeft: "10px"}}> {showLunch ? <DownOutlined/> : <LeftOutlined/> }</Text>
                                    }
                                </div>
                        </motion.div>
                        {period.lunchPeriods && showLunch && 
                        <div id="hi" style={{flexShrink: 0,display: 'flex', alignItems: 'flex-end', justifyContent: mobile ? 'flex-end' : 'space-between', flexDirection: mobile ? 'column' : 'row', width: "80%",maxWidth: "500px"}}>

                                    {Object.keys(period.lunchPeriods).map(lunch => {
                                        return(
                                            <motion.div whileHover={{x: 3}} variants={periodV} style={{boxShadow: " 2px 2px 15px rgb(0,118,220,0.18) ", width: mobile ? "85%" : '30%',maxWidth: "500px",  height: mobile ? '60px' : '80px', borderRadius: "10px", cursor: 'pointer', display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: vh * .02, padding: "24px"}}>
                                                <div>
                                                    <Title level={mobile ? 4 : 3} style={{color: "#333", marginBottom: '0px'}}>{lunch}</Title>
                                                </div>
                                                <div>
                                                    <Text style={{color: "#555", fontSize: mobile ? '10px' : '12px'}}>{period.lunchPeriods[lunch].startTime}</Text>
                                                    <br/>
                                                    <Text style={{color: "#555", fontSize: mobile ? '10px' : '12px'}}>{period.lunchPeriods[lunch].endTime}</Text>

                                                </div>
                                            </motion.div>
                                        )
                                    })}
                            
                        </div>
                        }
                       
                    </>
                )} else {
                    
                }
            })}
        </motion.div>
       
    )
}

export default Periods