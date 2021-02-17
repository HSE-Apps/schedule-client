import React, {useEffect, useState} from 'react'
import {Route, BrowserRouter as Router,} from 'react-router-dom'

import {Modal, Typography, Button, notification, Space, Divider} from 'antd'


import useMedia from './hooks/useMedia'

import Schedule from './views/Schedule/Schedule'

import SettingsContext from './contexts/SettingsContext'

const {Text} = Typography

function App() {

  const [settings,setSettings] = useState({lunch: 'A', display: 'Timer', color: {to: "#1890FF", from: "#eb2f96"}})

  const mobile = useMedia(['(min-width: 750px)', '(max-width: 750px)'], [false, true])


  const [tempModal, setTempModal] = useState(!localStorage.getItem('temp-modal-x')) 



  
  useEffect(() => {
    localStorage.setItem('temp-modal-x', 'seen')
    
  
    if (localStorage.getItem('feedback-notif-a') !== 'seen'){
      setTimeout(() => {openNotification('buttomRight');}, 5000);
      localStorage.setItem('feedback-notif-a', 'seen')

    } 

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

  const link = (
    <Text>Send any feedback/suggestions you have about the HSE Schedule App <a href="https://forms.gle/ppXB97gXhMb3AuAT9" target="_blank">here</a>! </Text>
  )
  const openNotification = placement => {
    notification.info({
      message: `Feedback Appreciated!`,
      duration: 10,
      description:
        link,
      placement,
    });
  };


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
      <Text type="primary">
        The Schedule app has been updated for the 1 hour delay schedule! 
      </Text>



    </Modal>




    </Modal>

        
    </>
  );
}

export default App;
