import React, {useEffect, useState} from 'react'

import Progress from './Progress'

import Navbar from '../Shared/Navbar'

import dayjs from 'dayjs'


var customParseFormat = require('dayjs/plugin/customParseFormat')

dayjs.extend(customParseFormat)


const mockData = [
    {
        periodName: "Period 1",
        startTime: "12:00 AM",
        endTime: "12:15 AM"
    }
    ,
    {
        periodName: "Period 2",
        startTime: "12:15 AM",
        endTime: "12:20 AM"
    }
    ,
    {
        periodName: "Period 3",
        startTime: "12:20 AM",
        endTime: "1:03 AM"
    },
    {
        periodName: "Period 4",
        startTime: "1:03 AM",
        endTime: "1:05 AM"
    },
    {
        periodName: "Period 5",
        startTime: "1:05 AM",
        endTime: "1:06 AM"
    },
    {
        periodName: "Period 6",
        startTime: "1:06 AM",
        endTime: "1:07 AM"
    },
    {
        periodName: "Period 8",
        startTime: "1:07 AM",
        endTime: "1:11 AM"
    },
    {
        periodName: "Period 8",
        startTime: "1:11 AM",
        endTime: "1:12 AM"
    }
]


const Schedule = () => {

    const [schedule, setSchedule] = useState(null)

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
        if(!schedule){
            fetchSchedule()
        }
    })

    return(
        <>
        <Navbar/>
        <div style={{background: "#fafcff", display:"flex",flexDirection:"row",height:"calc(100vh - 60px)", width: "100%", alignItems: 'center', justifyContent: 'center'}}>
            {schedule ?
            <Progress schedule={schedule}/>
            :
            <>loading</>
            }
        </div>

        </>
    )
}

export default Schedule