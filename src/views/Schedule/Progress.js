import React, { useEffect, useState } from 'react'

import {Progress, Typography} from 'antd'

import dayjs from 'dayjs'

var duration = require('dayjs/plugin/duration')


dayjs.extend(duration)

const {Text} = Typography

const ProgressSchedule = ({currentTime, period, getPeriod}) => {




    const genText = () => {

        let diffFromEnd = period.endTimeUnix - currentTime 

        let minutesLeft = dayjs.duration(diffFromEnd, 'ms').minutes()

        let secondsLeft = dayjs.duration(diffFromEnd, 'ms').seconds()

        if(minutesLeft && secondsLeft){
            getPeriod()
        }

        return(`${minutesLeft}:${secondsLeft > 9 ? secondsLeft : "0" + secondsLeft}`)

    }

    const genPercent = () => {

        let range = period.endTimeUnix - period.startTimeUnix

        let diffFromStart = currentTime - period.startTimeUnix

        return ((diffFromStart / range) * 100)

    }


    return(
        <>  
            <Progress
                width={500}
                type="circle"
                format={() => 
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    {genText() || 'loading'}
                    <Text type="secondary" style={{fontSize: "24px", marginTop: "10px", wordSpacing: "3px"}}>Until Period 5</Text>
                </div>
                }
                strokeWidth="3.5"
                strokeColor={{
                    '10%': '#1890FF',
                    '100%': '#eb2f96',
                }}
                percent={genPercent() || 0}
            />
            
        </>
    )
}

export default ProgressSchedule