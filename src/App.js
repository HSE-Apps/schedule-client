import React, {useEffect, useState} from 'react'
import {Route, BrowserRouter as Router,} from 'react-router-dom'

import {Modal, Typography, Button} from 'antd'

import useMedia from './hooks/useMedia'

import Schedule from './views/Schedule/Schedule'

import SettingsContext from './contexts/SettingsContext'

const {Text} = Typography

function App() {

  const [settings,setSettings] = useState({lunch: 'A', display: 'Timer', color: {to: "#1890FF", from: "#eb2f96"}})

  const mobile = useMedia(['(min-width: 750px)', '(max-width: 750px)'], [false, true])


  const [tempModal, setTempModal] = useState(!localStorage.getItem('temp-modal-h')) 


  
  useEffect(() => {
    localStorage.setItem('temp-modal-h', 'seen')
    loadSettings()
  }, [])

  useEffect(() => {
    saveSettings()
  }, [settings])

  const loadSettings = () => {
    const settingsFromStorage = localStorage.getItem('settings')
    
    if(settingsFromStorage){
      setSettings(JSON.parse(settingsFromStorage))
      console.log('grabbed')
    }
  }

  const saveSettings = () => {
    console.log('saved')
    localStorage.setItem('settings', JSON.stringify(settings))
  }

  return (
    <>
    <SettingsContext.Provider value={{settings, setSettings}}>
      <Router>
        <Route exact path="/" component={Schedule}/>
      </Router>
    </SettingsContext.Provider>
    <Modal
        style={{
          width: mobile ? "200px" : "400px",
        }}
        title={
          <Text>Announcement</Text>
        }
        visible={tempModal}

        onCancel={() => {
          setTempModal(false)
        }}

        okText="Ok"
        footer={
          <Button onClick={() => {setTempModal(false)}} type='primary'>Ok</Button>
        }
    >
      <Text> 
          Welcome back everyone! We at HSE Apps hope you enjoyed your short time off, and wish you the best in this spring semester.
      </Text>
      <br/>
      <br/>
      <Text strong> 
          Just a reminder, you can change display settings of the countdown along with your lunch by pressing the top right settings button.
      </Text>
    </Modal>
    </>
  );
}

export default App;
