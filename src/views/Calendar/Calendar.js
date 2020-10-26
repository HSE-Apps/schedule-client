import React, { useState } from 'react'

import {Calendar, Typography, Divider} from 'antd'

import Navbar from '../Shared/Navbar'

import useMedia from '../../hooks/useMedia'

const {Text} = Typography

let mockData = {
    noSchool: {
        October: []
    }
}

const CalendarSchedule = () => {
    
    const mobile = useMedia(['(min-width: 750px)', '(max-width: 750px)'], [false, true])


    const [month, setMonth] = useState("October")


    return (
        <>
            <div style={{width: "100%", display: "flex", justifyContent: 'center', alignItems: 'center', height: "calc(100vh - 100px)"}}>
                    <Calendar 
                    mode="month" 
                    onPanelChange={(e) => {
                        console.log(e.format('MMMM'))
                        setMonth(e.format('MMMM'))
                    }}
                    
                    style={{width: mobile ? '90%' : "80%", maxWidth: "1200px"}}

                    dateFullCellRender={(date) => {
                        let dayOfWeek = date.format('dddd')
                        let dayOfMonth = date.format('D')

                        let monthOfDate = date.format("MMMM")

                        if(monthOfDate != month){
                            return(
                                <div className="calendar-box" style={{width: "100%", height: mobile ? "40px" : "100px", paddingRight: "12px"}}>
                                    <Divider style={{marginBottom: "5px", marginTop: "10px"}}/>
                                </div>
                            )
                        }

                        if(dayOfWeek == "Sunday" || dayOfWeek == "Saturday" ){
                            return(
                                <>
                                    <div className="calendar-box" style={{width: "100%", height: mobile ? "40px" : "100px", background: "#fafafa"}}>
                                        <Divider style={{marginBottom: "5px", marginTop: "10px", background: "#f0f0f0"}}/>
                                        <Text style={{paddingRight: "12px"}}>{dayOfMonth}</Text>
                                    </div>
                                </>

                            )
                        } else if(dayOfWeek == "Monday" || dayOfWeek == "Tuesday"){
                            return(
                                <div className="calendar-box" style={{width: "100%",height: mobile ? "40px" : "100px", color: "#69c0ff", background: "#f2fbff"}}>
                                        <Divider style={{marginBottom: "5px", marginTop: "10px", background: "#69c0ff", opacity: "0.15"}}/>
                                        <Text style={{paddingRight: "12px", color: "#69c0ff"}}>{dayOfMonth}</Text>
                                </div>
                            )
                        }else if(dayOfWeek == "Thursday" || dayOfWeek == "Friday"){
                            return(
                                <div className="calendar-box" style={{width: "100%", height: mobile ? "40px" : "100px", color: "#ff7875", background: "#fff5f4"}}>
                                        <Divider style={{marginBottom: "5px", marginTop: "10px", background: "#ff7875", opacity: "0.15"}}/>
                                        <Text style={{paddingRight: "12px", color: "#ff7875"}}>{dayOfMonth}</Text>
                                </div>
                            )
                        }
                    }}
                        />
            </div>
         
    </>
    )
}

export default CalendarSchedule