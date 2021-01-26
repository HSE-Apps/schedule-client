import React, { useState, useEffect, useContext } from 'react'

import  {Typography} from 'antd'

import {motion} from 'framer-motion'

import useMedia from '../../hooks/useMedia'

import SettingsContext from '../../contexts/SettingsContext'

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

    const {settings,setSettings} = useContext(SettingsContext)
    const [settingsLocal, setSettingsLocal] = useState(settings)

    useEffect(() => {
        setSettingsLocal(settings)
    }, [settings])
      
    
    const darkTheme = settingsLocal.dark
    const theme = {
      textColor: darkTheme ? "white" : "",
      
      titleColor: darkTheme ? "#ececec" : "#333",
      titleWeight: darkTheme ? "600" : "",

      timeColor: darkTheme ? "#f2a365" : "#555",
      timeSecondaryColor: darkTheme ? "#f2a365" : "#333",
      timeWeight: darkTheme ? "bold" : "300",

      shadow: darkTheme ? "#30475e" : "rgb(0,118,220,0.18)",
      
    }


    const mobile = useMedia(['(min-width: 750px)', '(max-width: 750px)'], [false, true])

    const [showLunch, setShowLunch] = useState(true)

    const vh = use100vh()

    return(
        <motion.div variants={bigContainerVariants} initial="hidden" animate="visible" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: "100%", maxHeight: vh * .85, overflowY: "scroll", overflowX: 'hidden', padding: '20px 0px', margin: '45px 0px'}}>
            {periods.map((period) => {
                if(period.periodName != "Passing Period"){
                    return( 
                    <>
                        <motion.div onClick={() => setShowLunch(!showLunch)} whileHover={{x: 10}} variants={periodV} style={{flexShrink: 0, boxShadow: ` 2px 2px 15px ${theme.shadow} `, width: "80%",maxWidth: "500px", height: mobile ? '60px' : '80px',borderRadius: "10px", cursor: period.lunchPeriods ? 'pointer' : '', display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: vh * .02, padding: "24px"}}>
                                <div>
                                    <Title level={mobile ? 4 : 3} style={{color: theme.titleColor, fontWeight: theme.titleWeight, marginBottom: '0px'}}>{period.periodName}</Title>
                                </div>
                                <div>
                                    <Text style={{color: theme.timeColor, fontWeight: theme.timeWeight, fontSize: mobile ? '12px' : '14px'}}>{period.startTime} - {period.endTime}</Text>
                                    {period.lunchPeriods && 
                                    <Text  style={{marginLeft: "10px", color: theme.textColor }}> {showLunch ? <DownOutlined/> : <LeftOutlined/> }</Text>
                                    }
                                </div>
                        </motion.div>
                        {period.lunchPeriods && showLunch && 
                        <div id="hi" style={{flexShrink: 0,display: 'flex', alignItems: 'flex-end', justifyContent: mobile ? 'flex-end' : 'space-between', flexDirection: mobile ? 'column' : 'row', width: "80%",maxWidth: "500px"}}>

                                    {Object.keys(period.lunchPeriods).map(lunch => {
                                        return(
                                            <motion.div whileHover={{x: 3}} variants={periodV} style={{boxShadow: ` 2px 2px 15px ${theme.shadow} `, width: mobile ? "85%" : '30%',maxWidth: "500px",  height: mobile ? '60px' : '80px', borderRadius: "10px", cursor: 'pointer', display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: vh * .02, padding: "24px"}}>
                                                <div>
                                                    <Title level={mobile ? 4 : 3} style={{color: theme.titleColor, fontWeight: theme.titleWeight, marginBottom: '0px'}}>{lunch}{mobile && " Lunch"}</Title>
                                                </div>
                                                <div>
                                                    {mobile ? 
                                                    
                                                    <Text  style={{color: "#555", fontSize: mobile ? '12px' : '14px'}}>{period.lunchPeriods[lunch].startTime} - {period.lunchPeriods[lunch].endTime}</Text>

                                                    :
                                                    <>
                                                        <Text style={{color: theme.timeColor, fontWeight: theme.timeWeight, fontSize: mobile ? '10px' : '12px'}}>{period.lunchPeriods[lunch].startTime}</Text>
                                                        <br/>
                                                        <Text style={{color: theme.timeColor, fontWeight: theme.timeWeight, fontSize: mobile ? '10px' : '12px'}}>{period.lunchPeriods[lunch].endTime}</Text>
                                                    </>
                                                    }
                                                 

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