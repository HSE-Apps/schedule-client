import React from 'react'

import {Progress, Typography} from 'antd'

const {Text} = Typography

const ProgressSchedule = () => {

    return(
        <>
            <Progress
                width={500}
                type="circle"
                format={() => 
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    10:15
                    <Text type="secondary" style={{fontSize: "24px", marginTop: "10px", wordSpacing: "3px"}}>Until Period 5</Text>
                </div>
                }
                strokeWidth="3.5"
                strokeColor={{
                    '10%': '#1890FF',
                    '100%': '#eb2f96',
                }}
                percent={90.4}
            />
        </>
    )
}

export default ProgressSchedule