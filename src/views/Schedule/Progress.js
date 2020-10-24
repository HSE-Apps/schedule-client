import React, { useEffect, useState } from 'react'

import {Progress, Typography} from 'antd'

import dayjs from 'dayjs'

var duration = require('dayjs/plugin/duration')


dayjs.extend(duration)

const {Text} = Typography

const ProgressSchedule = ({schedule}) => {

    const [period, setPeriod] = useState(null)
    const [percent, setPercent] = useState(null)
    const [text, setText] = useState(null)


    const getPeriod = () => {

        let currentTime = dayjs().valueOf()
        let beforeSchool = currentTime < schedule[0].startTimeUnix
        let afterSchool = currentTime > schedule[schedule.length - 1].endTimeUnix

        if(beforeSchool){
            console.log('Before School')
        } else if (afterSchool) {
            console.log('after school')
        }

        schedule.forEach(period => {
            if(currentTime >= period.startTimeUnix && currentTime < period.endTimeUnix){
                setPeriod(period)
            }
        })
    }

    const setPercentAndText = () => {

        let currentTime = dayjs().valueOf()

        let range = period.endTimeUnix - period.startTimeUnix

        let diffFromStart = currentTime - period.startTimeUnix

        let diffFromEnd = period.endTimeUnix - currentTime 

        setPercent((diffFromStart / range) * 100)

        let minutesLeft = dayjs.duration(diffFromEnd, 'ms').minutes()

        let secondsLeft = dayjs.duration(diffFromEnd, 'ms').seconds()

        

        setText(`${minutesLeft}:${secondsLeft > 9 ? secondsLeft : "0" + secondsLeft}`)

    }


    const updateFunc = () => {
        getPeriod()
        setPercentAndText()

        setTimeout(() => updateFunc(), 100)
    }

    useEffect(() => {

        if(period){
            updateFunc()
        } else {
            getPeriod()
        }
    })



    return(
        <>  
            <h1>{period && period.periodName}</h1>

            <Progress
                width={500}
                type="circle"
                format={() => 
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    {text || 'loading'}
                    <Text type="secondary" style={{fontSize: "24px", marginTop: "10px", wordSpacing: "3px"}}>Until Period 5</Text>
                </div>
                }
                strokeWidth="3.5"
                strokeColor={{
                    '10%': '#1890FF',
                    '100%': '#eb2f96',
                }}
                percent={percent || 0}
            />
            
        </>
    )
}

export default ProgressSchedule