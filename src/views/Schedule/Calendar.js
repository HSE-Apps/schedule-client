import React, { useState } from 'react'

import {Calendar, Typography, Divider} from 'antd'

import { LeftOutlined, RightOutlined } from '@ant-design/icons';


import Navbar from '../Shared/Navbar'

import useMedia from '../../hooks/useMedia'

const {Text, Title} = Typography

let mockData = {
    redMon: ["1","2","3","4","5"],
    blueMon: [],
    noSchool: ["18"]
}

const CalendarSchedule = () => {
    
    const mobile = useMedia(['(min-width: 750px)', '(max-width: 750px)'], [false, true])


    const [month, setMonth] = useState(0)
    const [year, setYear] = useState(2021)


    return (
        <>
            <div style={{width: "100%", display: "flex", justifyContent: 'center', alignItems: 'center', height: "calc(100vh - 100px)"}}>
                    <Calendar 
                    className="calendar"
                    mode="month"                     
                    headerRender={({ value, type, onChange, onTypeChange }) => 
                    <div style={{display: 'flex', width: "100%", justifyContent: 'space-between', background: '#fafcff'}}>
                        <Title level={mobile ? 3 : 2} style={{color: "#333", fontWeight: "400"}}>{value.format('MMMM')} {value.format('Y')}</Title>

                        <div style={{display: 'flex', justifyContent: 'space-between', width: '50px'}}>
                            {/* <LeftOutlined onClick={() => {
                                let temp = value.clone()

                                if(month == 0){
                                    temp.month(11)
                                    setMonth(11)
                                    temp.year(year - 1)

                                    setYear(year -1)
                                } else {
                                    temp.month(month-1)
                                    setMonth(month-1)
                                }
                                

                                onChange(temp)
                                }} style={{fontSize: "20px"}}
                            />
                            <RightOutlined onClick={() => {
                                  let temp = value.clone()

                                  if(month == 11){
                                    temp.month(0)
                                    setMonth(0)
                                    temp.year(year + 1)
                                    setYear(year + 1)

                                  } else {
                                    temp.month(month+1)
                                    setMonth(month+1)
                                  }
                            
                                
                                  onChange(temp)
                                }} style={{fontSize: "20px"}}
                            /> */}
                        </div> 
                            
                        
                    </div>
                    }

                    style={{width: mobile ? '90%' : "80%", maxWidth: "1200px"}}
                    disabledDate={(date) => {
                        let monthOfDate = date.format("M")

                        return (parseInt(monthOfDate) - 1 != month)

                    }}
                    dateFullCellRender={(date) => {
                        let dayOfWeek = date.format('dddd')
                        let dayOfMonth = date.format('D')
                        
                        let week = date.format("W")

                        let monthOfDate = date.format("M")

                        if(parseInt(monthOfDate) - 1 != month){
                            return <></>
                        } else if(mockData.noSchool.includes(dayOfMonth) || (dayOfWeek == "Sunday" || dayOfWeek == "Saturday")){

                            return(
                                <>
                                    <div className="calendar-box" style={{width: "100%", height: mobile ? "40px" : "100px", background: "#fafafa"}}>
                                        <Divider style={{marginBottom: "5px", marginTop: "10px", background: "#f0f0f0"}}/>
                                        <Text style={{paddingRight: "12px"}}>{dayOfMonth}</Text>
                                    </div>
                                </>

                            )
                        } else if (dayOfWeek == "Friday"){
                            return(
                                <div className="calendar-box" style={{width: "100%",height: mobile ? "40px" : "100px", color: "#ffd666", background: "#fffbe6"}}>
                                    <Divider style={{marginBottom: "5px", marginTop: "10px", background: "#69c0ff", opacity: "0.15"}}/>
                                    <Text style={{paddingRight: "12px", color: "#ffd666"}}>{dayOfMonth}</Text>
                                </div>
                            )
                        } else {


                            if( mockData.redMon.includes(week) ? ["Monday", "Tuesday"].includes(dayOfWeek) : ["Wednesday", "Thursday"].includes(dayOfWeek)){
                                return(
                                    <div className="calendar-box" style={{width: "100%", height: mobile ? "40px" : "100px", color: "#ff7875", background: "#fff5f4"}}>
                                        <Divider style={{marginBottom: "5px", marginTop: "10px", background: "#ff7875", opacity: "0.15"}}/>
                                        <Text style={{paddingRight: "12px", color: "#ff7875"}}>{dayOfMonth}</Text>
                                    </div>
                                )
                            } else {
                                return(
                                <div className="calendar-box" style={{width: "100%",height: mobile ? "40px" : "100px", color: "#69c0ff", background: "#f2fbff"}}>
                                <Divider style={{marginBottom: "5px", marginTop: "10px", background: "#69c0ff", opacity: "0.15"}}/>
                                <Text style={{paddingRight: "12px", color: "#69c0ff"}}>{dayOfMonth}</Text>
                                </div>
                                )
                            }

                        

                          
                        }
                        
                        
                        // else if(mockData.redMon.includes(week) && (dayOfWeek == "Monday" || dayOfWeek == "Tuesday")){
                            // return(
                            //     <div className="calendar-box" style={{width: "100%", height: mobile ? "40px" : "100px", color: "#ff7875", background: "#fff5f4"}}>
                            //         <Divider style={{marginBottom: "5px", marginTop: "10px", background: "#ff7875", opacity: "0.15"}}/>
                            //         <Text style={{paddingRight: "12px", color: "#ff7875"}}>{dayOfMonth}</Text>
                            //     </div>
                            // )
                        // }else if(mockData.blueMon.includes(dayOfMonth) && (dayOfWeek == "Wednesday" || dayOfWeek == "Thursday")){
                            return(

                                 <div className="calendar-box" style={{width: "100%",height: mobile ? "40px" : "100px", color: "#69c0ff", background: "#f2fbff"}}>
                                    <Divider style={{marginBottom: "5px", marginTop: "10px", background: "#69c0ff", opacity: "0.15"}}/>
                                    <Text style={{paddingRight: "12px", color: "#69c0ff"}}>{dayOfMonth}</Text>
                                </div>
                            )
                        // } else {
                        //     return(

                        //         <div className="calendar-box" style={{width: "100%",height: mobile ? "40px" : "100px", color: "#ffd666", background: "#fffbe6"}}>
                        //            <Divider style={{marginBottom: "5px", marginTop: "10px", background: "#69c0ff", opacity: "0.15"}}/>
                        //            <Text style={{paddingRight: "12px", color: "#ffd666"}}>{dayOfMonth}</Text>
                        //        </div>
                        //    )
                        // }
                    }}
                        />
            </div>
         
    </>
    )
}

export default CalendarSchedule
