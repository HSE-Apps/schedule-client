import React, { useEffect, useState, useContext } from 'react'

import {Progress, Typography, Badge} from 'antd'

import dayjs from 'dayjs'

import SettingsContext from '../../contexts/SettingsContext'

import useMedia from '../../hooks/useMedia'



var duration = require('dayjs/plugin/duration')
var customParseFormat = require('dayjs/plugin/customParseFormat')


dayjs.extend(duration)
dayjs.extend(customParseFormat)


const {Text, Title} = Typography

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
        <div style={{position: 'relative'}}>  
            <Progress
                width={mobile ? window.innerWidth * .7 : 500}
                type="circle"
                format={() => 
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    {settings.display == "Timer" ?  
                    
                    genText() || 'loading' 
                    
                    : 
                    
                    <>
                          {period.lunchPeriods ?
                                  <>
                                    {lunchStatus() == "DURING" ? 
                                        settings.lunch + ' Lunch'
                                    :
                                        period.periodName
                                    }
                                  </>
                                :
                                period.periodName

                            }
                    </>
                    
                    }
                    {settings.display == "Timer" ? 
                        <>
                            {period.isPassing ? 

                            nextPeriod?.lunchPeriods && settings.lunch == "A" ?
                            <Text type="secondary" style={{fontSize: mobile ? "1.1rem" : "1.4rem", marginTop: "10px", wordSpacing: "3px"}}>To Get to A Lunch</Text>

                            :
                            <Text type="secondary" style={{fontSize: mobile ? "1.1rem" : "1.4rem", marginTop: "10px", wordSpacing: "3px"}}>Until {nextPeriod.periodName} Begins</Text>

                            :
                                <>
                                {period.lunchPeriods ?
                                    {
                                        'DURING':  <Text type="secondary" style={{fontSize: mobile ? "1.1rem" : "1.4rem", marginTop: "10px", wordSpacing: "3px"}}> Until {settings.lunch} Lunch Ends </Text>,
                                        'BEFORE':  <Text type="secondary" style={{fontSize: mobile ? "1.1rem" : "1.4rem", marginTop: "10px", wordSpacing: "3px"}}>Until {settings.lunch} Lunch Begins</Text>,
                                        'AFTER':  <Text type="secondary" style={{fontSize: mobile ? "1.1rem" : "1.4rem", marginTop: "10px", wordSpacing: "3px"}}>{nextPeriod ? `Until ${period.periodName} Ends` : "Until School Ends"}</Text>,
                                    }[lunchStatus()]
                                :
                                <Text type="secondary" style={{fontSize: mobile ? "1.1rem" : "1.4rem", marginTop: "10px", wordSpacing: "3px"}}>{nextPeriod ? `Until ${period.periodName} Ends` : "Until School Ends"}</Text>

                                }
                                </>
                            }
                        </>
                    :
                    
                        
                        <Text type="secondary" style={{fontSize: mobile ? "1.3rem" : "1.5rem", marginTop: "10px", wordSpacing: "3px"}}>
                            {genText()} {period.lunchPeriods ? 
                                {
                                    'DURING':   <>Until Lunch Ends </> ,
                                    'BEFORE':  <>Until {settings.lunch} Lunch </>,
                                    'AFTER':  <>{nextPeriod ? `Until Period Ends` : "Until School Ends"}</>
                                }[lunchStatus()]
                                :
                                'Until Period Ends'
                            }
                        </Text>

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
        </div>

    )
}

export default ProgressSchedule