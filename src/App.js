import React, {useEffect, useState} from 'react'
import {Route, BrowserRouter as Router,} from 'react-router-dom'

import {Modal, Typography, Button} from 'antd'

import useMedia from './hooks/useMedia'

import Schedule from './views/Schedule/Schedule'

import SettingsContext from './contexts/SettingsContext'

const {Text} = Typography

function App() {

  const [settings,setSettings] = useState({lunch: 'A', display: 'timer', color: {to: "#1890FF", from: "#eb2f96"}})

  const mobile = useMedia(['(min-width: 750px)', '(max-width: 750px)'], [false, true])


  const [tempModal, setTempModal] = useState(localStorage.getItem('temp-modal')) 
  
  useEffect(() => {
    localStorage.setItem('temp-modal', 'seen')
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
    {/* <Modal
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
        
        Do you happen to be in a club, and want a chance at winning <Text strong>$100?</Text> <br/> <br/>
        
        If the club you're a part of isn't currently on our the club site (<a target="_blank" href='https://hseclubs.com'>hseclubs.com</a>, please view on desktop as of now), and you can get your sponsor to put it there and ask for members of your club to join on the site, we will enter you in our giveaway. To enter, you must message our instagram <a target="_blank" href='https://instagram.com/hseapps'>@hseapps</a> with an email you sent to your sponsor and the name of your club. The winner will be announced November 6th, so act fast! 
      </Text>
    </Modal> */}
    </>
  );
}

export default App;
