import React, {useEffect, useState} from 'react'
import {Route, BrowserRouter as Router,} from 'react-router-dom'



import Schedule from './views/Schedule/Schedule'

import SettingsContext from './contexts/SettingsContext'
import CalendarSchedule from './views/Calendar/Calendar'

function App() {

  const [settings,setSettings] = useState({lunch: 'A', color: {to: "#1890FF", from: "#eb2f96"}})
  
  useEffect(() => {
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
    <SettingsContext.Provider value={{settings, setSettings}}>
      <Router>
        <Route exact path="/" component={Schedule}/>
        <Route exact path="/calendar" component={CalendarSchedule}/>
      </Router>
    </SettingsContext.Provider>

  );
}

export default App;
