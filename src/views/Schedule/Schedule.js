import React, {useEffect, useState} from 'react'

import Progress from './Progress'

import Navbar from '../Shared/Navbar'

import dayjs from 'dayjs'


var customParseFormat = require('dayjs/plugin/customParseFormat')

dayjs.extend(customParseFormat)


const mockData = [
    {
        periodName: "Period 8",
        startTime: "9:23 PM",
        endTime: "9:29 PM"
    },
]


const Schedule = () => {

    const [schedule, setSchedule] = useState(null)
    const [period, setPeriod] = useState(null)
    const [currentTime, setCurrentTime] = useState(dayjs().valueOf())
    const [status, setStatus] = useState('SCHOOL_NOW')

    const getPeriod = () => {

        let currentTime = dayjs().valueOf()
        let beforeSchool = currentTime < schedule[0].startTimeUnix
        let afterSchool = currentTime > schedule[schedule.length - 1].endTimeUnix

        if(beforeSchool){
            setStatus('BEFORE_SCHOOL')
        } else if (afterSchool) {
            setStatus('AFTER_SCHOOL')
        }

        schedule.forEach(period => {
            if(currentTime >= period.startTimeUnix && currentTime < period.endTimeUnix){
                console.log(period)
                setPeriod(period)
            }
        })
    }

    const fetchSchedule = async () => {

        let fetchedSchedule = await mockData

        let scheduleWithUnix = []

        fetchedSchedule.forEach(period => {
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
        setTimeout(() => timer(), 50)
    }

    return(
        <>
        <Navbar/>
        <div style={{background: "#fafcff", display:"flex",flexDirection:"row",height:"calc(100vh - 60px)", width: "100%", alignItems: 'center', justifyContent: 'center'}}>
            {schedule && period ?
                {
                    'SCHOOL_NOW': <Progress currentTime={currentTime} period={period} getPeriod={getPeriod}/>,
                    'BEFORE_SCHOOL': <h1>before</h1>,
                    'AFTER_SCHOOL': <h1>after</h1>
                }[status]
            :
            <>loading</>
            }
        </div>

        </>
    )
}

export default Schedule