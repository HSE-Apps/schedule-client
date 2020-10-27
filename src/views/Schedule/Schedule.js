import React, {useContext, useEffect, useRef, useState} from 'react'

import { CalendarOutlined, ClockCircleOutlined, UnorderedListOutlined} from '@ant-design/icons';

import {Typography} from 'antd'

import Progress from './Progress'

import Navbar from '../Shared/Navbar'

import dayjs from 'dayjs'

import CalendarSchedule from '../Calendar/Calendar'


import SettingsContext from '../../contexts/SettingsContext'

import {motion, useAnimation} from 'framer-motion'

import Div100vh,{use100vh} from 'react-div-100vh'

const {Text} = Typography

var customParseFormat = require('dayjs/plugin/customParseFormat')

dayjs.extend(customParseFormat)


const mockData = [


    {
        periodName: "Period 4",
        startTime: "6:00 PM",
        endTime: "7:45 PM",
    }, {
        periodName: "Passing Period",
        startTime: "7:45 PM",
        endTime: "7:50 PM",
        isPassing: true
    },
    {
        periodName: "Period 5",
        startTime: "7:50 PM",
        endTime: "11:55 PM",
    }, 

    
]


const Schedule = () => {

    const [schedule, setSchedule] = useState(null)
    const [period, setPeriod] = useState(null)
    const [nextPeriod, setNextPeriod] = useState(null)
    const [currentTime, setCurrentTime] = useState(dayjs().valueOf())
    const [status, setStatus] = useState('LOADING')


    const [view, setView] = useState('clock')

    const vh = use100vh()

    const getPeriod = () => {

        let currentTime = dayjs().valueOf()
        let beforeSchool = currentTime < schedule[0].startTimeUnix
        let afterSchool = currentTime > schedule[schedule.length - 1].endTimeUnix

        if(beforeSchool){
            setStatus('BEFORE_SCHOOL')
        } else if (afterSchool) {
            setStatus('AFTER_SCHOOL')
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


        setCurrentTime(dayjs().valueOf())
        getPeriod()
        setTimeout(() => timer(), 250)
    }

    return(
        <Div100vh style={{ display: 'flex', flexDirection: 'column',justifyContent:'space-between'}}>
        <Navbar/>


        <div style={{background: "#fafcff", display:"flex",flexDirection:"row",height:vh - 70, width: "100%", alignItems: 'center', justifyContent: 'center', flexDirection: 'column', paddingBottom: "80px"}}>
            {view == "clock" &&
            <>
                {
    
                    {
                        'SCHOOL_NOW':<Progress currentTime={currentTime} period={period} getPeriod={getPeriod} nextPeriod={nextPeriod}/> ,
                        'BEFORE_SCHOOL': <h1>before</h1>,
                        'AFTER_SCHOOL': <h1>after</h1>,
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
                            <div onClick={() => setView("list")} style={{width: "80px", height: "45px", display: 'flex', borderRadius: "10px 0px 0px 10px",justifyContent: 'center', alignItems: "center", background: view == "list" ? "white" : "transparent", boxShadow: view == "list" ? " 2px 2px 10px rgb(0,118,220,0.4) " : "none", cursor: 'pointer'}}>
                                <Text style={{paddingTop: '5px', color: "#333"}}><UnorderedListOutlined style={{fontSize: "20px"}}/></Text>
                            </div>
                            <div onClick={() => setView("clock")} style={{width: "80px", height: "45px", display: 'flex', justifyContent: 'center', alignItems: "center", background: view == "clock" ? "white" : "transparent", boxShadow: view == "clock" ? " 2px 2px 10px rgb(0,118,220,0.4) " : "none", cursor: 'pointer'}}>
                                <Text style={{paddingTop: '5px', color: "#333"}}><ClockCircleOutlined style={{fontSize: "20px"}} /></Text>
                            </div>
                            <div onClick={() => setView("calendar")} style={{width: "80px", height: "45px", display: 'flex', borderRadius: "0px 10px 10px 0px",justifyContent: 'center', alignItems: "center", background: view == "calendar" ? "white" : "transparent", boxShadow: view == "calendar" ? " 2px 2px 10px rgb(0,118,220,0.4) " : "none", cursor: 'pointer'}}>
                                <Text style={{paddingTop: '3px', color: "#333"}}><CalendarOutlined style={{fontSize: "20px"}} /></Text>
                            </div>
                </div>
            </div>

        </Div100vh>
    )
}

export default Schedule