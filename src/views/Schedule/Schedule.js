import React, {useContext, useEffect, useRef, useState} from 'react'

import { CalendarOutlined, ClockCircleOutlined, UnorderedListOutlined, PlayCircleOutlined} from '@ant-design/icons';

import {Typography} from 'antd'

import Progress from './Progress'

import Periods from './Periods'


import Navbar from '../Shared/Navbar'

import dayjs from 'dayjs'

import CalendarSchedule from './Calendar'

import useMedia from '../../hooks/useMedia'

import SettingsContext from '../../contexts/SettingsContext'

import News from './News'

import {motion, useAnimation} from 'framer-motion'

import Div100vh,{use100vh} from 'react-div-100vh'

import Morning from '../../img/Landscapes/Morning.png'
import Daytime from '../../img/Landscapes/Daytime.png'
import Sundown from '../../img/Landscapes/Sundown.png'
import Night from '../../img/Landscapes/Night.png'
import {tuesThurSchedule, monWedSchedule, weekendSchedule, monWedHourDelay,tuesThurVirtualHourDelay, monFullSchedule} from './tempData'

const {Text} = Typography

var customParseFormat = require('dayjs/plugin/customParseFormat')

dayjs.extend(customParseFormat)




let scheduleData = {
    noSchool: [""],
    redWednesday: ["11"],
    blueWednesday: ["4", "18"]
}
const periodV = {
    hidden:{
       opacity: 0
    },
    visible:{
        opacity: 1,
        transition: {
            type: 'spring',
            stiffness: 80,
            when: "beforeChildren",
            duration: .4
        }
    }
}

const periodText = {
    hidden:{
        opacity: 0
    },
    visible:{
        opacity: 1,
        
    }
}



const Schedule = () => {

    const [schedule, setSchedule] = useState(null)
    const [period, setPeriod] = useState(null)
    const [nextPeriod, setNextPeriod] = useState(null)
    const [currentTime, setCurrentTime] = useState(dayjs().valueOf())
    const [status, setStatus] = useState('LOADING')


    const mobile = useMedia(['(min-width: 750px)', '(max-width: 750px)'], [false, true])


    const [view, setView] = useState('clock')

    const vh = use100vh()

    const getPeriod = () => {

        let currentTime = dayjs().valueOf()
        let today = dayjs()
        let day = today.format('dddd')

        if (day == 'Friday'){
            
            
             if(currentTime > dayjs('8:00 PM', 'h mm A').valueOf()){
                setStatus('E_LEARNING_NIGHT')
            } else if (currentTime > dayjs('6:00 PM', 'h mm A').valueOf()){
                setStatus('E_LEARNING_SUNDOWN')
            } else if (currentTime > dayjs('12:00 PM', 'h mm A').valueOf()) {
                setStatus('E_LEARNING_DAYTIME')
            } else if (currentTime >= dayjs('6:30 AM', 'h mm A').valueOf()){
                setStatus('E_LEARNING_MORNING')
            } else {
                setStatus('E_LEARNING_NIGHT')
            }
            return; 

        } else {
        
            if(schedule.length == 0){
                if(currentTime > dayjs('8:00 PM', 'h mm A').valueOf()){
                    setStatus('WEEKEND_NIGHT')
                } else if (currentTime > dayjs('6:00 PM', 'h mm A').valueOf()){
                    setStatus('WEEKEND_SUNDOWN')
                } else if (currentTime > dayjs('12:00 PM', 'h mm A').valueOf()) {
                    setStatus('WEEKEND_DAYTIME')
                } else if (currentTime >= dayjs('6:30 AM', 'h mm A').valueOf()){
                    setStatus('WEEKEND_MORNING')
                } else {
                    setStatus('WEEKEND_NIGHT')
                }
                return;
            } else {
                let beforeSchool = currentTime < schedule[0].startTimeUnix
                let afterSchool = currentTime > schedule[schedule.length - 1].endTimeUnix
        
                if(beforeSchool){
                    if(currentTime >= dayjs('6:30 AM', 'h mm A').valueOf()){
                        setStatus('BEFORE_SCHOOL_MORNING')
                    } else {
                        setStatus('BEFORE_SCHOOL_NIGHT')
                    }
                } else if (afterSchool) {
                    if(currentTime > dayjs('8:00 PM', 'h mm A').valueOf()){
                        setStatus('AFTER_SCHOOL_NIGHT')
                    } else if (currentTime > dayjs('6:00 PM', 'h mm A').valueOf()){
                        setStatus('AFTER_SCHOOL_SUNDOWN')
        
                    } else {
                        setStatus('AFTER_SCHOOL_DAYTIME')
        
                    }
                }
        
                schedule.forEach((period, index) => {
                    if(currentTime >= period.startTimeUnix && currentTime < period.endTimeUnix){
                        setStatus('SCHOOL_NOW')
                        setPeriod(period)
                        
                        try{
                            if(period.isPassing){
                                setNextPeriod(schedule[index+1])
                            } else {
                                setNextPeriod(schedule[index+2])
        
                            }
        
                        } catch {
                            setNextPeriod(null)
                        }
        
                    }
                })
            }
        
        }
     

    }


    const fetchSchedule = async () => {

        let fetchedSchedule = null

        let today = dayjs()

        let dayOfWeek = today.format('dddd')
        let dayOfMonth = today.format('D')

        const special = true

        if (special) {
            fetchedSchedule = tuesThurSchedule
        } else {

        
        

            if(["Sunday", "Saturday", "Friday"].includes(dayOfWeek) || scheduleData.noSchool.includes(dayOfMonth)){
                fetchedSchedule = weekendSchedule
            } else if(["Monday", "Wednesday"].includes(dayOfWeek)){
                fetchedSchedule = monWedSchedule
            } else if(["Tuesday", "Thursday"].includes(dayOfWeek)){
                fetchedSchedule = tuesThurSchedule
            } 
            
        }

      


        let scheduleWithUnix = []

        fetchedSchedule.forEach(period => {


            if(period.lunchPeriods){

                let lunchPeriods = {}

                for(let key in period.lunchPeriods){

                    lunchPeriods[key] = ({
                        ... period.lunchPeriods[key],
                        startTimeUnix: dayjs(period.lunchPeriods[key].startTime, 'h mm A').valueOf(),
                        endTimeUnix: dayjs(period.lunchPeriods[key].endTime, 'h mm A').valueOf(),
                    })
                }

                period.lunchPeriods = lunchPeriods
               
            }

            scheduleWithUnix.push({
                ...period,
                startTimeUnix: dayjs(period.startTime, 'h mm A').valueOf(),
                endTimeUnix: dayjs(period.endTime, 'h mm A').valueOf(),
            })
        })


        setSchedule(scheduleWithUnix)
    }

    useEffect(() => {

        if(schedule && !period){
            getPeriod()
        }

        if(!schedule){
            fetchSchedule()
        } else {
            timer()
        }
    }, [schedule])

    const timer = () => {

        setCurrentTime(dayjs().valueOf())
        getPeriod()
        setTimeout(() => timer(), 250)
    }

    return(
        <Div100vh style={{ display: 'flex', flexDirection: 'column',justifyContent:'space-between'}}>
        <Navbar/>


        <div style={{background: "#fafcff", display:"flex",flexDirection:"row",height:vh - 30, width: "100%", alignItems: 'center', justifyContent: 'center', flexDirection: 'column', paddingBottom: "80px"}}>
            {view == "clock" &&
            <>
                {
    
                    {
                        'SCHOOL_NOW':<Progress currentTime={currentTime} period={period} getPeriod={getPeriod} nextPeriod={nextPeriod}/> ,
                        'BEFORE_SCHOOL_MORNING': 
                            <motion.div variants={periodV} initial="hidden" animate="visible"  style={{position: 'static', display:'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <motion.div variants={periodText} style={{marginTop: "0px",textAlign: 'center',color: 'white',position: 'absolute',top:'50%',left: '50%', zIndex: 2, transform: 'translate(-50%, -50%)'}}>
                                    <h1 style={{color: "white", fontSize: mobile ? '24px' : '32px', margin: "10px 0px", fontWeight: 400,filter: "drop-shadow(0px 0px 10px rgb(0,0,0,0.7)"}}>School Hasn't Begun</h1>
                                    <h1 style={{color: "white", fontSize: mobile ? '24px' : '32px', margin: "10px 0px", fontWeight: 400, filter: "drop-shadow(0px 0px 10px rgb(0,0,0,0.7)"}}>{dayjs(currentTime).format('h:mm A')}</h1>

                                </motion.div>
                                {/* <Title level={2} style={{color: 'white', position: 'absolute', textAlign: 'center'}}>  {status}</Title> */}
                                <img src={Morning} className="bright" style={{margin: '5px',width: mobile ? '90% ':"80%",maxWidth: '850px'}}/>
                            </motion.div>,
                        'BEFORE_SCHOOL_NIGHT':
                        <motion.div variants={periodV} initial="hidden" animate="visible"  style={{position: 'static', display:'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <motion.div variants={periodText} style={{paddingBottom: "30px",textAlign: 'center',color: 'white',position: 'absolute',top:'50%',left: '50%', zIndex: 2, transform: 'translate(-50%, -50%)'}}>
                                    <h1 style={{color: "white", fontSize: mobile ? '24px' : '32px', fontWeight: 400,filter: "drop-shadow(0px 0px 10px rgb(0,0,0,0.5)"}}>School Hasn't Started</h1>
                                    <h1 style={{color: "white", fontSize: mobile ? '24px' : '32px', margin: "10px 0px", fontWeight: 400, filter: "drop-shadow(0px 0px 10px rgb(0,0,0,0.5)"}}>{dayjs(currentTime).format('h:mm A')}</h1>

                                </motion.div>
                                <img src={Night} style={{margin: '5px',width: mobile ? '90% ':"80%",maxWidth: '850px', filter: "drop-shadow(0px 0px 10px rgb(82,79,153,0.8)"}}/>
                            </motion.div> ,
                        'AFTER_SCHOOL_NIGHT': 
                        <motion.div variants={periodV} initial="hidden" animate="visible"  style={{position: 'static', display:'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <motion.div variants={periodText}style={{paddingBottom: "30px",textAlign: 'center',color: 'white',position: 'absolute',top:'50%',left: '50%', zIndex: 2, transform: 'translate(-50%, -50%)'}}>
                                    <h1 style={{color: "white", fontSize: mobile ? '24px' : '32px', fontWeight: 400,filter: "drop-shadow(0px 0px 10px rgb(0,0,0,0.5)"}}>School Has Ended</h1>
                                    <h1 style={{color: "white", fontSize: mobile ? '24px' : '32px', margin: "10px 0px", fontWeight: 400, filter: "drop-shadow(0px 0px 10px rgb(0,0,0,0.5)"}}>{dayjs(currentTime).format('h:mm A')}</h1>

                                </motion.div>
                                <img src={Night} style={{margin: '5px',width: mobile ? '90% ':"80%",maxWidth: '850px', filter: "drop-shadow(0px 0px 10px rgb(82,79,153,0.8)"}}/>
                            </motion.div>,
                        'AFTER_SCHOOL_SUNDOWN': 
                        <motion.div variants={periodV} initial="hidden" animate="visible"  style={{position: 'static', display:'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <motion.div variants={periodText} style={{paddingBottom: "40px",textAlign: 'center',color: 'white',position: 'absolute',top:'50%',left: '50%', zIndex: 2, transform: 'translate(-50%, -50%)'}}>
                                    <h1 style={{color: "white", fontSize: mobile ? '24px' : '32px', margin: "10px 0px", fontWeight: 400,filter: "drop-shadow(0px 0px 10px rgb(0,0,0,0.5)"}}>School Has Ended</h1>
                                    <h1 style={{color: "white", fontSize: mobile ? '24px' : '32px', margin: "10px 0px", fontWeight: 400, filter: "drop-shadow(0px 0px 10px rgb(0,0,0,0.5)"}}>{dayjs(currentTime).format('h:mm A')}</h1>

                                </motion.div>
                                <img src={Sundown} style={{margin: '5px',width: mobile ? '90% ':"80%",maxWidth: '850px', filter: "drop-shadow(0px 0px 10px rgb(230,114,124,0.8)"}}/>
                            </motion.div>,
                        'AFTER_SCHOOL_DAYTIME': 
                        <motion.div variants={periodV} initial="hidden" animate="visible"  style={{position: 'static', display:'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <motion.div variants={periodText} style={{paddingBottom: "30px",textAlign: 'center',color: 'white',position: 'absolute',top:'50%',left: '50%', zIndex: 2, transform: 'translate(-50%, -50%)'}}>
                                    <h1 style={{color: "white",fontSize: mobile ? '24px' : '32px', margin: "10px 0px", fontWeight: 400,filter: "drop-shadow(0px 0px 10px rgb(0,0,0,0.5)"}}>Summer Break</h1>
                                    <h1 style={{color: "white",fontSize: mobile ? '24px' : '32px', margin: "10px 0px", fontWeight: 400, filter: "drop-shadow(0px 0px 10px rgb(0,0,0,0.5)"}}>{dayjs(currentTime).format('h:mm A')}</h1>

                                </motion.div>
                                <img src={Daytime} style={{margin: '5px', width: mobile ? '90% ':"80%",maxWidth: '850px', transform: "rotate('-90deg')",filter: "drop-shadow(0px 0px 10px rgb(128,203,233,0.8)"}}/>
                            </motion.div> ,
                        'WEEKEND_NIGHT': 
                        <motion.div variants={periodV} initial="hidden" animate="visible"  style={{position: 'static', display:'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <motion.div variants={periodText}style={{paddingBottom: "30px",textAlign: 'center',color: 'white',position: 'absolute',top:'50%',left: '50%', zIndex: 2, transform: 'translate(-50%, -50%)'}}>
                                    <h1 style={{color: "white", fontSize: mobile ? '24px' : '32px', fontWeight: 400,filter: "drop-shadow(0px 0px 10px rgb(0,0,0,0.5)"}}>Weekend</h1>
                                    <h1 style={{color: "white", fontSize: mobile ? '24px' : '32px', margin: "10px 0px", fontWeight: 400, filter: "drop-shadow(0px 0px 10px rgb(0,0,0,0.5)"}}>{dayjs(currentTime).format('h:mm A')}</h1>

                                </motion.div>
                                <img src={Night} style={{margin: '5px',width: mobile ? '90% ':"80%",maxWidth: '850px', filter: "drop-shadow(0px 0px 10px rgb(82,79,153,0.8)"}}/>
                            </motion.div>,
                        'WEEKEND_SUNDOWN': 
                        <motion.div variants={periodV} initial="hidden" animate="visible"  style={{position: 'static', display:'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <motion.div variants={periodText} style={{paddingBottom: "40px",textAlign: 'center',color: 'white',position: 'absolute',top:'50%',left: '50%', zIndex: 2, transform: 'translate(-50%, -50%)'}}>
                                    <h1 style={{color: "white", fontSize: mobile ? '24px' : '32px', margin: "10px 0px", fontWeight: 400,filter: "drop-shadow(0px 0px 10px rgb(0,0,0,0.5)"}}>Weekend</h1>
                                    <h1 style={{color: "white", fontSize: mobile ? '24px' : '32px', margin: "10px 0px", fontWeight: 400, filter: "drop-shadow(0px 0px 10px rgb(0,0,0,0.5)"}}>{dayjs(currentTime).format('h:mm A')}</h1>

                                </motion.div>
                                <img src={Sundown} style={{margin: '5px',width: mobile ? '90% ':"80%",maxWidth: '850px', filter: "drop-shadow(0px 0px 10px rgb(230,114,124,0.8)"}}/>
                            </motion.div>,
                        'WEEKEND_DAYTIME': 
                        <motion.div variants={periodV} initial="hidden" animate="visible"  style={{position: 'static', display:'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <motion.div variants={periodText} style={{paddingBottom: "30px",textAlign: 'center',color: 'white',position: 'absolute',top:'50%',left: '50%', zIndex: 2, transform: 'translate(-50%, -50%)'}}>
                                    <h1 style={{color: "white",fontSize: mobile ? '24px' : '32px', margin: "10px 0px", fontWeight: 400,filter: "drop-shadow(0px 0px 10px rgb(0,0,0,0.5)"}}>Weekend</h1>
                                    <h1 style={{color: "white",fontSize: mobile ? '24px' : '32px', margin: "10px 0px", fontWeight: 400, filter: "drop-shadow(0px 0px 10px rgb(0,0,0,0.5)"}}>{dayjs(currentTime).format('h:mm A')}</h1>

                                </motion.div>
                                <img src={Daytime} style={{margin: '5px', width: mobile ? '90% ':"80%",maxWidth: '850px', transform: "rotate('-90deg')",filter: "drop-shadow(0px 0px 10px rgb(128,203,233,0.8)"}}/>
                            </motion.div> ,
                        'WEEKEND_MORNING': 
                        <motion.div variants={periodV} initial="hidden" animate="visible"  style={{position: 'static', display:'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <motion.div variants={periodText} style={{marginTop: "0px",textAlign: 'center',color: 'white',position: 'absolute',top:'50%',left: '50%', zIndex: 2, transform: 'translate(-50%, -50%)'}}>
                                <h1 style={{color: "white", fontSize: mobile ? '24px' : '32px', margin: "10px 0px", fontWeight: 400,filter: "drop-shadow(0px 0px 10px rgb(0,0,0,0.7)"}}>Weekend</h1>
                                <h1 style={{color: "white", fontSize: mobile ? '24px' : '32px', margin: "10px 0px", fontWeight: 400, filter: "drop-shadow(0px 0px 10px rgb(0,0,0,0.7)"}}>{dayjs(currentTime).format('h:mm A')}</h1>

                            </motion.div>
                            {/* <Title level={2} style={{color: 'white', position: 'absolute', textAlign: 'center'}}>  {status}</Title> */}
                            <img src={Morning} className="bright" style={{margin: '5px',width: mobile ? '90% ':"80%",maxWidth: '850px'}}/>
                        </motion.div>,
                        
                        'E_LEARNING_MORNING': 
                        <motion.div variants={periodV} initial="hidden" animate="visible"  style={{position: 'static', display:'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <motion.div variants={periodText} style={{marginTop: "0px",textAlign: 'center',color: 'white',position: 'absolute',top:'50%',left: '50%', zIndex: 2, transform: 'translate(-50%, -50%)'}}>
                                <h1 style={{color: "white", fontSize: mobile ? '24px' : '32px', margin: "10px 0px", fontWeight: 400,filter: "drop-shadow(0px 0px 10px rgb(0,0,0,0.7)"}}>E-Learning Friday</h1>
                                <h1 style={{color: "white", fontSize: mobile ? '24px' : '32px', margin: "10px 0px", fontWeight: 400, filter: "drop-shadow(0px 0px 10px rgb(0,0,0,0.7)"}}>{dayjs(currentTime).format('h:mm A')}</h1>

                            </motion.div>
                            {/* <Title level={2} style={{color: 'white', position: 'absolute', textAlign: 'center'}}>  {status}</Title> */}
                            <img src={Morning} className="bright" style={{margin: '5px',width: mobile ? '90% ':"80%",maxWidth: '850px'}}/>
                        </motion.div>,
                        'E_LEARNING_DAYTIME': 
                        <motion.div variants={periodV} initial="hidden" animate="visible"  style={{position: 'static', display:'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <motion.div variants={periodText} style={{paddingBottom: "30px",textAlign: 'center',color: 'white',position: 'absolute',top:'50%',left: '50%', zIndex: 2, transform: 'translate(-50%, -50%)'}}>
                                    <h1 style={{color: "white",fontSize: mobile ? '24px' : '32px', margin: "10px 0px", fontWeight: 400,filter: "drop-shadow(0px 0px 10px rgb(0,0,0,0.5)"}}>E-Learning Friday</h1>
                                    <h1 style={{color: "white",fontSize: mobile ? '24px' : '32px', margin: "10px 0px", fontWeight: 400, filter: "drop-shadow(0px 0px 10px rgb(0,0,0,0.5)"}}>{dayjs(currentTime).format('h:mm A')}</h1>

                                </motion.div>
                                <img src={Daytime} style={{margin: '5px', width: mobile ? '90% ':"80%",maxWidth: '850px', transform: "rotate('-90deg')",filter: "drop-shadow(0px 0px 10px rgb(128,203,233,0.8)"}}/>
                            </motion.div> ,
                        'E_LEARNING_SUNDOWN': 
                        <motion.div variants={periodV} initial="hidden" animate="visible"  style={{position: 'static', display:'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <motion.div variants={periodText} style={{paddingBottom: "40px",textAlign: 'center',color: 'white',position: 'absolute',top:'50%',left: '50%', zIndex: 2, transform: 'translate(-50%, -50%)'}}>
                                    <h1 style={{color: "white", fontSize: mobile ? '24px' : '32px', margin: "10px 0px", fontWeight: 400,filter: "drop-shadow(0px 0px 10px rgb(0,0,0,0.5)"}}>E-Learning Friday</h1>
                                    <h1 style={{color: "white", fontSize: mobile ? '24px' : '32px', margin: "10px 0px", fontWeight: 400, filter: "drop-shadow(0px 0px 10px rgb(0,0,0,0.5)"}}>{dayjs(currentTime).format('h:mm A')}</h1>

                                </motion.div>
                                <img src={Sundown} style={{margin: '5px',width: mobile ? '90% ':"80%",maxWidth: '850px', filter: "drop-shadow(0px 0px 10px rgb(230,114,124,0.8)"}}/>
                            </motion.div>,
                        'E_LEARNING_NIGHT': 
                        <motion.div variants={periodV} initial="hidden" animate="visible"  style={{position: 'static', display:'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <motion.div variants={periodText}style={{paddingBottom: "30px",textAlign: 'center',color: 'white',position: 'absolute',top:'50%',left: '50%', zIndex: 2, transform: 'translate(-50%, -50%)'}}>
                                    <h1 style={{color: "white", fontSize: mobile ? '24px' : '32px', fontWeight: 400,filter: "drop-shadow(0px 0px 10px rgb(0,0,0,0.5)"}}>E-Learning Friday</h1>
                                    <h1 style={{color: "white", fontSize: mobile ? '24px' : '32px', margin: "10px 0px", fontWeight: 400, filter: "drop-shadow(0px 0px 10px rgb(0,0,0,0.5)"}}>{dayjs(currentTime).format('h:mm A')}</h1>

                                </motion.div>
                                <img src={Night} style={{margin: '5px',width: mobile ? '90% ':"80%",maxWidth: '850px', filter: "drop-shadow(0px 0px 10px rgb(82,79,153,0.8)"}}/>
                            </motion.div>,

                        'LOADING': <h1>loading</h1>
                    }[status]
    
                }
            </>
            }

            {view == "calendar" && 
            <>
                <CalendarSchedule/>
            </>
            }

            {view == "news" && 
            <>
                <News/>
            </>
            }

            {view == 'list' && 
            <>
                <Periods periods={schedule}/>
            </>
            }
        </div>
        
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: "100%", position: 'fixed', bottom: '30px',marginTop: "20px"}}>
                <div style={{display: 'flex', zIndex: 4, boxShadow: " 2px 2px 10px rgb(0,118,220,0.2) ", borderRadius: "10px"}}>
                            <div onClick={() => setView("list")} style={{width: "80px", height: "45px", display: 'flex', borderRadius: "10px 0px 0px 10px",justifyContent: 'center', alignItems: "center", background: view == "list" ? "white" : "transparent", boxShadow: view == "list" ? " 2px 2px 10px rgb(0,118,220,0.32) " : "none", cursor: 'pointer'}}>
                                <Text style={{paddingTop: '5px', color: "#333"}}><UnorderedListOutlined style={{fontSize: "20px"}}/></Text>
                            </div>
                            <div onClick={() => setView("clock")} style={{width: "80px", height: "45px", display: 'flex', justifyContent: 'center', alignItems: "center", background: view == "clock" ? "white" : "transparent", boxShadow: view == "clock" ? " 2px 2px 10px rgb(0,118,220,0.32) " : "none", cursor: 'pointer'}}>
                                <Text style={{paddingTop: '5px', color: "#333"}}><ClockCircleOutlined style={{fontSize: "20px"}} /></Text>
                            </div>
                            <div onClick={() => setView("news")} style={{width: "80px", height: "45px", display: 'flex', justifyContent: 'center', alignItems: "center", background: view == "news" ? "white" : "transparent", boxShadow: view == "news" ? " 2px 2px 10px rgb(0,118,220,0.32) " : "none", cursor: 'pointer'}}>
                                <Text style={{paddingTop: '5px', color: "#333"}}><PlayCircleOutlined style={{fontSize: "20px"}} /></Text>
                            </div>
                            <div onClick={() => setView("calendar")} style={{width: "80px", height: "45px", display: 'flex', borderRadius: "0px 10px 10px 0px",justifyContent: 'center', alignItems: "center", background: view == "calendar" ? "white" : "transparent", boxShadow: view == "calendar" ? " 2px 2px 10px rgb(0,118,220,0.32) " : "none", cursor: 'pointer'}}>
                                <Text style={{paddingTop: '3px', color: "#333"}}><CalendarOutlined style={{fontSize: "20px"}} /></Text>
                            </div>
                </div>
            </div>

        </Div100vh>
    )
}

export default Schedule