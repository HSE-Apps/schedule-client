import React, {useContext, useEffect, useRef, useState} from 'react'

import { CalendarOutlined, ClockCircleOutlined, UnorderedListOutlined} from '@ant-design/icons';

import {Typography} from 'antd'

import Progress from './Progress'

import Navbar from '../Shared/Navbar'

import dayjs from 'dayjs'

import CalendarSchedule from '../Calendar/Calendar'

import useMedia from '../../hooks/useMedia'

import SettingsContext from '../../contexts/SettingsContext'

import {motion, useAnimation} from 'framer-motion'

import Div100vh,{use100vh} from 'react-div-100vh'

import Morning from '../../img/Landscapes/Morning.png'
import Daytime from '../../img/Landscapes/Daytime.png'
import Sundown from '../../img/Landscapes/Sundown.png'
import Night from '../../img/Landscapes/Night.png'
import Title from 'antd/lib/skeleton/Title';

const {Text} = Typography

var customParseFormat = require('dayjs/plugin/customParseFormat')

dayjs.extend(customParseFormat)


const mockData = [


    {
        periodName: "Period 5",
        startTime: "7:30 AM",
        endTime: "8:55 AM",
    }, {
        periodName: "Passing Period",
        startTime: "8:55 AM",
        endTime: "9:02 AM",
        isPassing: true
    },
    {
        periodName: "Smart",
        startTime: "9:02 AM",
        endTime: "9:35 AM",
    }, {
        periodName: "Passing Period",
        startTime: "9:35 AM",
        endTime: "9:42 AM",
        isPassing: true
    }, {
        periodName: "Period 6",
        startTime: "9:42 AM",
        endTime: "11:07 AM",
    },
    {
        periodName: "Passing Period",
        startTime: "11:07 AM",
        endTime: "11:14 AM",
        isPassing: true
    },
    {
        periodName: "Period 7",
        startTime: "11:14 AM",
        endTime: "1:09 PM",
        lunchPeriods: {
            A: {
                startTime: "11:14 AM",
                endTime: "11:37 AM"
            },
            B: {
                startTime: "11:53 AM",
                endTime: "12:23 PM"
            },
            C: {
                startTime: "12:39 PM",
                endTime: "1:09 PM"
            },
        }
    }, {
        periodName: "Passing Period",
        startTime: "1:09 PM",
        endTime: "1:16 PM",
        isPassing: true
    }, 
    {
        periodName: "Clubs",
        startTime: "1:16 PM",
        endTime: "2:00 PM",
    }

    
]


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

    const fetchSchedule = async () => {

        let fetchedSchedule = await mockData

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
            console.log('get period')
            getPeriod()
        }

        if(!schedule){
            fetchSchedule()
        } else {
            timer()
        }
    }, [schedule])

    const timer = () => {
        console.log("wow")

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
                            <div style={{position: 'relative', display:'flex', justifyContent: 'center'}}>
                                <div style={{marginTop: "0px",textAlign: 'center',color: 'white',position: 'absolute',top:'50%',left: '50%', zIndex: 2, transform: 'translate(-50%, -50%)'}}>
                                    <h1 style={{color: "white", fontSize: mobile ? '24px' : '32px', margin: "10px 0px", fontWeight: 400,filter: "drop-shadow(0px 0px 10px rgb(0,0,0,0.7)"}}>School Hasn't Begun</h1>
                                    <h1 style={{color: "white", fontSize: mobile ? '24px' : '32px', margin: "10px 0px", fontWeight: 400, filter: "drop-shadow(0px 0px 10px rgb(0,0,0,0.7)"}}>{dayjs(currentTime).format('h:mm A')}</h1>

                                </div>
                                {/* <Title level={2} style={{color: 'white', position: 'absolute', textAlign: 'center'}}>  {status}</Title> */}
                                <img src={Morning} className="bright" style={{width: mobile ? '90% ':"80%",maxWidth: '850px'}}/>
                            </div>,
                        'BEFORE_SCHOOL_NIGHT':
                        <div style={{position: 'relative', display:'flex', justifyContent: 'center'}}>                                
                            <div style={{paddingBottom: "30px",textAlign: 'center',color: 'white',position: 'absolute',top:'50%',left: '50%', zIndex: 2, transform: 'translate(-50%, -50%)'}}>
                                    <h1 style={{color: "white", fontSize: mobile ? '24px' : '32px', fontWeight: 400,filter: "drop-shadow(0px 0px 10px rgb(0,0,0,0.5)"}}>School Hasn't Started</h1>
                                    <h1 style={{color: "white", fontSize: mobile ? '24px' : '32px', margin: "10px 0px", fontWeight: 400, filter: "drop-shadow(0px 0px 10px rgb(0,0,0,0.5)"}}>{dayjs(currentTime).format('h:mm A')}</h1>

                                </div>
                                <img src={Night} style={{width: mobile ? '90% ':"80%",maxWidth: '850px', filter: "drop-shadow(0px 0px 10px rgb(82,79,153,0.8)"}}/>
                            </div> ,
                        'AFTER_SCHOOL_NIGHT': 
                        <div style={{position: 'relative', display:'flex', justifyContent: 'center'}}>                                
                                <div style={{paddingBottom: "30px",textAlign: 'center',color: 'white',position: 'absolute',top:'50%',left: '50%', zIndex: 2, transform: 'translate(-50%, -50%)'}}>
                                    <h1 style={{color: "white", fontSize: mobile ? '24px' : '32px', fontWeight: 400,filter: "drop-shadow(0px 0px 10px rgb(0,0,0,0.5)"}}>School Has Ended</h1>
                                    <h1 style={{color: "white", fontSize: mobile ? '24px' : '32px', margin: "10px 0px", fontWeight: 400, filter: "drop-shadow(0px 0px 10px rgb(0,0,0,0.5)"}}>{dayjs(currentTime).format('h:mm A')}</h1>

                                </div>
                                <img src={Night} style={{width: mobile ? '90% ':"80%",maxWidth: '850px', filter: "drop-shadow(0px 0px 10px rgb(82,79,153,0.8)"}}/>
                            </div>,
                        'AFTER_SCHOOL_SUNDOWN': 
                        <div style={{position: 'relative', display:'flex', justifyContent: 'center'}}>                                
                                <div style={{paddingBottom: "40px",textAlign: 'center',color: 'white',position: 'absolute',top:'50%',left: '50%', zIndex: 2, transform: 'translate(-50%, -50%)'}}>
                                    <h1 style={{color: "white", fontSize: mobile ? '24px' : '32px', margin: "10px 0px", fontWeight: 400,filter: "drop-shadow(0px 0px 10px rgb(0,0,0,0.5)"}}>School Has Ended</h1>
                                    <h1 style={{color: "white", fontSize: mobile ? '24px' : '32px', margin: "10px 0px", fontWeight: 400, filter: "drop-shadow(0px 0px 10px rgb(0,0,0,0.5)"}}>{dayjs(currentTime).format('h:mm A')}</h1>

                                </div>
                                <img src={Sundown} style={{width: mobile ? '90% ':"80%",maxWidth: '850px', filter: "drop-shadow(0px 0px 10px rgb(230,114,124,0.8)"}}/>
                            </div>,
                        'AFTER_SCHOOL_DAYTIME': 
                        <div style={{position: 'relative', display:'flex', justifyContent: 'center'}}>                                
                                <div style={{paddingBottom: "30px",textAlign: 'center',color: 'white',position: 'absolute',top:'50%',left: '50%', zIndex: 2, transform: 'translate(-50%, -50%)'}}>
                                    <h1 style={{color: "white",fontSize: mobile ? '24px' : '32px', margin: "10px 0px", fontWeight: 400,filter: "drop-shadow(0px 0px 10px rgb(0,0,0,0.5)"}}>School Has Ended</h1>
                                    <h1 style={{color: "white",fontSize: mobile ? '24px' : '32px', margin: "10px 0px", fontWeight: 400, filter: "drop-shadow(0px 0px 10px rgb(0,0,0,0.5)"}}>{dayjs(currentTime).format('h:mm A')}</h1>

                                </div>
                                <img src={Daytime} style={{width: mobile ? '90% ':"80%",maxWidth: '850px', transform: "rotate('-90deg')",filter: "drop-shadow(0px 0px 10px rgb(128,203,233,0.8)"}}/>
                            </div> ,

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
        </div>
        
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: "100%", position: 'fixed', bottom: '30px'}}>
                <div style={{display: 'flex', zIndex: 4, boxShadow: " 2px 2px 10px rgb(0,118,220,0.2) ", borderRadius: "10px"}}>
                            <div onClick={() => setView("list")} style={{width: "80px", height: "45px", display: 'flex', borderRadius: "10px 0px 0px 10px",justifyContent: 'center', alignItems: "center", background: view == "list" ? "white" : "transparent", boxShadow: view == "list" ? " 2px 2px 10px rgb(0,118,220,0.32) " : "none", cursor: 'pointer'}}>
                                <Text style={{paddingTop: '5px', color: "#333"}}><UnorderedListOutlined style={{fontSize: "20px"}}/></Text>
                            </div>
                            <div onClick={() => setView("clock")} style={{width: "80px", height: "45px", display: 'flex', justifyContent: 'center', alignItems: "center", background: view == "clock" ? "white" : "transparent", boxShadow: view == "clock" ? " 2px 2px 10px rgb(0,118,220,0.32) " : "none", cursor: 'pointer'}}>
                                <Text style={{paddingTop: '5px', color: "#333"}}><ClockCircleOutlined style={{fontSize: "20px"}} /></Text>
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