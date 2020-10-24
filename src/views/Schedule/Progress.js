import React, {useState, useEffect} from 'react'

import {Progress, Typography, Card, Radio} from 'antd'

const {Text} = Typography

const scheduleData = {
    1: [[7, 35, 8, 15, "Period 1"], [8, 15, 8, 22, "Going to Period 2"], [19, 30, 20, 30, "Period 2"], [11, 20, 11, 25, "Going to Period 3"], [11, 27, 11, 30, "Period 3"]],
    2: [[7, 35, 8, 15, "Period 1"], [8, 15, 8, 22, "Going to Period 2"], [8, 22, 9, 2, "Period 2"], [9, 2, 9, 9, "Going to Period 3"], [9, 9, 9, 49, "Period 3"]],
    3: [[7, 35, 8, 15, "Period 1"], [8, 15, 8, 22, "Going to Period 2"], [19, 30, 19, 55, "Period 2"], [23, 20, 23, 26, "Going to Period 3"], [23, 26, 23, 32, "Period 3"]],
    4: [[7, 35, 8, 15, "Period 1"], [8, 15, 8, 22, "Going to Period 2"], [19, 30, 19, 55, "Period 2"], [23, 20, 23, 40, "Going to Period 3"], [23, 40, 23, 200, "Period 3"]],
    6: [[0, 0, 0, 120, "Period 1"], [8, 15, 8, 22, "Period 2"], [8, 22, 9, 2, "Period 2"], [9, 2, 9, 9, "Going to Period 3"], [9, 9, 9, 49, "Period 3"]],
  }
  
  
  const ProgressDisplay = () => {
  
    const [schedule, setSchedule] = useState()
    const [time, setTime] = useState()
  
    useEffect(() => {
  
      setInterval(() => {
        setTime(new Date())
      }, 1000)
  
      if (!schedule) {
        setSchedule(scheduleData[(new Date()).getDay()])
      }
    }, [schedule])
    
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    }
    const periodReturn = (t) => {
      console.log("checking periods")
      var hr = t.getHours() 
      var min = t.getMinutes() 
      var sec = t.getSeconds()
      for (const x in schedule) {
        var currentTime = ((sec/3600.0)+ (min/60.0) + hr)
        var startTime = ((schedule[x][1]/60.0)+schedule[x][0])
        var endTime = ((schedule[x][3]/60.0)+schedule[x][2])   
        if (startTime <= currentTime && currentTime <= endTime ) {
          return (
            <div>  
              
              <div style={{width:"500", marginRight:"4%", display:"flex", justifyContent:"center"}}>
                <Progress 
                  width={500}
                  type="circle"
                  strokeWidth="3.5"
                  strokeColor={{
                    '10%': '#1890FF',
                    '100%': '#eb2f96',
                  }}
                  percent={100-100*(endTime - currentTime)/(endTime - startTime)} 
                  format={() => {
                    var diff = endTime - currentTime
                    return (
                      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <div>
                          {Math.floor(diff) === 0? <span></span>: <span>{Math.floor(diff)}:</span>}
                          {Math.floor((diff*60)%60) < 10? <span>0</span>: <span></span>}
                          {Math.floor((diff*60)%60)}:
                          {Math.floor((diff*3600)%60) < 10? <span>0</span>: <span></span>}
                          {Math.floor((diff*3600)%60)}
                        </div>
                        <Text type="secondary" style={{fontSize: "24px", marginTop: "10px", wordSpacing: "3px"}}>
                          {schedule[(parseInt(x)+1).toString()]? 
                            <div style={radioStyle}>Until {schedule[(parseInt(x)+1).toString()][4]}</div>
                          :
                            <div style={radioStyle}>Until School Ends</div>
                          }
                        </Text>
                      </div>
                    )
                  }}
                />
              </div>
              <div style={{width:"23%", display:"flex", justifyContent:"center"}}>
                <Radio.Group
                  style={{margin:"5%"}}
                  size="small"
                  onChange={(e) => { setSchedule(e[(new Date()).getDay()]) }}
                >
                  <Radio style={radioStyle} value={scheduleData}>A Lunch</Radio>
                  <Radio style={radioStyle} value={scheduleData}>B Lunch</Radio>
                  <Radio style={radioStyle} value={scheduleData}>C Lunch</Radio>
                </Radio.Group>
              </div>
              <div style={{width:"27%"}}>
                <div style={{margint:"5%"}}>
                  {/* <div>Time: {time.getHours()}:{time.getMinutes()}:{time.getSeconds()}</div> */}
                  <div style={radioStyle}>Now: {schedule[x][4]}</div>
                  <div style={radioStyle}>Ends at {schedule[x][2]}:{schedule[x][3]}</div>
                  {schedule[(parseInt(x)+1).toString()]? 
                    <div style={radioStyle}>Next: {schedule[(parseInt(x)+1).toString()][4]}</div>
                  :
                    <div style={radioStyle}>Next: None</div>
                  }
                </div>
              </div>
  
            </div>
          )
        }
      }
      return (
        <div>School is over!</div>
      )
    }
  
    return (
      <div style={{margin:"10%"}}>
        {time?
          <div>{periodReturn(time)}</div>  
        :
          <div>rip</div>
        }
      </div>
    )
  }
  
  export default ProgressDisplay;