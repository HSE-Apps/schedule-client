import React, { useEffect, useState, useContext } from 'react'

import {Progress, Typography} from 'antd'

import dayjs from 'dayjs'

import SettingsContext from '../../contexts/SettingsContext'

import useMedia from '../../hooks/useMedia'



var duration = require('dayjs/plugin/duration')
var customParseFormat = require('dayjs/plugin/customParseFormat')


dayjs.extend(duration)
dayjs.extend(customParseFormat)


const {Text} = Typography

const ProgressSchedule = ({currentTime, period,nextPeriod}) => {

    const mobile = useMedia(['(min-width: 750px)', '(max-width: 750px)'], [false, true])


    const {settings,setSettings} = useContext(SettingsContext)


    const lunchStatus = () => {
        let userLunchPeriod = period.lunchPeriods[settings.lunch]
        
        if(userLunchPeriod.startTimeUnix <= currentTime  && currentTime <= userLunchPeriod.endTimeUnix ){
            return('DURING')
        } else if (currentTime >= userLunchPeriod.endTimeUnix){
            return('AFTER')
        } else {
            return('BEFORE')
        }

    }


    const genText = () => { 


        
        let diffFromEnd;

        if(period.lunchPeriods){

            let userLunchPeriod = period.lunchPeriods[settings.lunch]

            switch (lunchStatus()) {
                case 'DURING':
                    diffFromEnd = userLunchPeriod.endTimeUnix - currentTime
                    break;
            
                case 'BEFORE':
                    diffFromEnd = userLunchPeriod.startTimeUnix - currentTime
                    break;

                case "AFTER":
                    diffFromEnd = period.endTimeUnix - currentTime
                    break
            }


        } else { 
            diffFromEnd = period.endTimeUnix - currentTime
        }

       
        let hoursLeft = dayjs.duration(diffFromEnd, 'ms').hours()


        let minutesLeft = dayjs.duration(diffFromEnd, 'ms').minutes()

        let secondsLeft = dayjs.duration(diffFromEnd, 'ms').seconds()


        return(`${hoursLeft > 0? hoursLeft +":" : ""}${minutesLeft > 9 ? minutesLeft :  hoursLeft > 0 ? "0" + minutesLeft : minutesLeft}:${secondsLeft > 9 ? secondsLeft : "0" + secondsLeft}`)

    }

    const genPercent = () => {



        let range;

        let diffFromStart;


        if(period.lunchPeriods){

            let userLunchPeriod = period.lunchPeriods[settings.lunch]


            switch (lunchStatus()) {
                case 'DURING':
                    range = userLunchPeriod.endTimeUnix - userLunchPeriod.startTimeUnix
                    diffFromStart = currentTime - userLunchPeriod.startTimeUnix
                    break;
            
                case 'BEFORE':
                    range = userLunchPeriod.startTimeUnix - period.startTimeUnix
                    diffFromStart = currentTime - period.startTimeUnix
                    break;

                case "AFTER":
                    range =  period.endTimeUnix - userLunchPeriod.endTimeUnix
                    diffFromStart = currentTime - userLunchPeriod.endTimeUnix
                    break
            }


        } else { 
            range = period.endTimeUnix - period.startTimeUnix

            diffFromStart = currentTime - period.startTimeUnix
    
        }


       
        return ((diffFromStart / range) * 100)

    }

    // In Lunch - Until Lunch Ends
    // Before Lunch - Until Lunch Begins
    // After Lunch -- Until period ends


    return(
        <>
            <Progress
                width={mobile ? 300 : 500}
                type="circle"
                format={() => 
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    {genText() || 'loading'}
                {period.isPassing ? 
                <Text type="secondary" style={{fontSize: "1.1rem", marginTop: "10px", wordSpacing: "3px"}}>Until {nextPeriod ? nextPeriod.periodName + " Begins" : 'School Ends'}</Text>

                :
                    <>
                    {period.lunchPeriods ?
                        {
                            'DURING':  <Text type="secondary" style={{fontSize: "1.1rem", marginTop: "10px", wordSpacing: "3px"}}> Until {settings.lunch} Lunch Ends </Text>,
                            'BEFORE':  <Text type="secondary" style={{fontSize: "1.1rem", marginTop: "10px", wordSpacing: "3px"}}>Until {settings.lunch} Lunch Begins</Text>,
                            'AFTER':  <Text type="secondary" style={{fontSize: "1.1rem", marginTop: "10px", wordSpacing: "3px"}}>{nextPeriod ? `Until ${period.periodName} Ends` : "Until School Ends"}</Text>,
                        }[lunchStatus()]
                    :
                    <Text type="secondary" style={{fontSize: "1.1rem", marginTop: "10px", wordSpacing: "3px"}}>{nextPeriod ? `Until ${period.periodName} Ends` : "Until School Ends"}</Text>

                    }
                    </>
                }

                </div>
                }
                strokeWidth={mobile ? 4.5 : 3.5}
                strokeColor={{
                    '10%': settings.color.to,
                    '100%': settings.color.from,
                }}
                percent={genPercent() || 0}
            />
        </>

    )
}

export default ProgressSchedule