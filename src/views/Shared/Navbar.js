import React, {useState, useContext, useEffect} from 'react';
import {Link} from 'react-router-dom'

import { Row, Col, Typography, Button, Checkbox, Drawer,Menu, Avatar, Modal, Input, Radio, Switch } from 'antd';

import { GithubOutlined, InstagramOutlined, LogoutOutlined, MenuOutlined, SettingOutlined, LinkOutlined, TeamOutlined } from '@ant-design/icons';


import logo from '../../img/hseapps.png'

import {motion} from 'framer-motion'

import SettingsContext from '../../contexts/SettingsContext'

import useMedia from '../../hooks/useMedia'

const {SubMenu} = Menu

const {Title , Text, Paragraph} = Typography






const Navbar = ({history}) => {

  const [modal, setModal] = useState(false)

  const {settings,setSettings} = useContext(SettingsContext)

  const mobile = useMedia(['(min-width: 750px)', '(max-width: 750px)'], [false, true])

  
  
  // refreshes state after context is updated
  useEffect(() => {
    setSettingsLocal(settings)
  }, [settings])
  
  const [settingsLocal, setSettingsLocal] = useState(settings)
  
  const currentTheme = settingsLocal.dark
  const theme = {
    backgroundColor: currentTheme ? "#222831" : "",
    borderBottom: currentTheme ? "" : "solid 1px rgba(0,0,0,0.1)",
    textColor: currentTheme ? "white" : "",
    iconColor: currentTheme ? "#f2a365" : "#1890ff"
  }
  
  return (
    <> 
      <div style={{borderBottom: theme.borderBottom, backgroundColor: theme.backgroundColor}}>
        <Row style = {{padding: '10px'}} align = "middle">
        <Col span={20} style={{display: "flex", alignItems: "center"}}>
            <Link to="/"><motion.img whileHover={{ scale: 1.05 }} src={logo} style={{height: "40px"}}></motion.img></Link>
            <Title level={3} style={{margin: "0px 5px", color: theme.textColor}}> HSE Schedule</Title>
        </Col>
        <Col span={4}  style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
            <Button onClick={() => setModal(!modal)} shape='circle' style={{backgroundColor: theme.iconColor, outline: "none"}} type='primary' icon={<SettingOutlined/>}/>
          {/* {auth.isAuth ? 
            <>
              <Text style={{marginRight: "10px", fontSize: "16px"}}>{auth.user.name}</Text>
                <motion.div style={{marginRight: "10px"}} whileHover={{ scale: 1.03 }}>
                  <Link to="/settings">
                    {auth.user.profilePictureURL == "default" ?
                      <Avatar style={{cursor: "pointer"}} icon={<UserOutlined />} size={35} />
                    :
                      <Avatar style={{cursor: "pointer"}}src={auth.user.profilePictureURL} size={35} />
                    }

                  </Link>
                </motion.div>

            </>
          
          
          :
            <>

              <Link to="/login">
                <Button type="primary" icon={<UserOutlined />} size={'mediun'}>
                    Login
                </Button>
              </Link>
            </>
          } */}
        </Col>
        </Row>
  
      </div>
      <Modal
        style={{
          width: mobile ? "200px" : "400px",
        }}
        title={
          <Text>Settings</Text>
        }
        visible={modal}
        onCancel={() => {
          setModal(false)

          setSettingsLocal(settings)
        }}
        onOk={() => {
          setModal(false)

          setSettings(settingsLocal)
        }}
        okText="Save"
      >
        <Text strong style={{fontSize: "10px"}}>CIRCLE COLOR</Text>

        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: "20px", marginTop: "3px"}}>

        <Input value={settingsLocal.color.to} onChange={(e) => setSettingsLocal({...settingsLocal, color: {...settingsLocal.color, to: e.target.value}})} prefix={<input onChange={(e) => setSettingsLocal({...settingsLocal, color: {...settingsLocal.color, to: e.target.value}})} value={settingsLocal.color.to} type="color" style={{width: '20px', height: '20px', background: settingsLocal.color.to, marginRight: "5px", border: "0px transparent", outline: "none", cursor: "pointer"}}></input>} placeholder="0% Color" style={{width: "45%"}}/>

          <Input value={settingsLocal.color.from} onChange={(e) => setSettingsLocal({...settingsLocal, color: {...settingsLocal.color, from: e.target.value}})} prefix={<input onChange={(e) => setSettingsLocal({...settingsLocal, color: {...settingsLocal.color, from: e.target.value}})} value={settingsLocal.color.from} type="color" style={{width: '20px', height: '20px', background: settingsLocal.color.from, marginRight: "5px", border: "0px transparent", outline: "none", cursor: "pointer"}}></input>} placeholder="0% Color" style={{width: "45%"}}/>

        </div>

        <Text strong style={{fontSize: "10px",}}>LUNCH </Text>
        <div style={{marginTop: "3px",  marginBottom: "20px"}}>
          <Radio.Group value={settingsLocal.lunch} onChange={(e) => setSettingsLocal({...settingsLocal, lunch: e.target.value})}>
            <Radio.Button value={'A'}>A Lunch</Radio.Button >
            <Radio.Button value={'B'}>B Lunch</Radio.Button >
            <Radio.Button value={'C'}>C Lunch</Radio.Button >
            {/* <Radio.Button value={'ALL'}>All</Radio.Button >
            <Radio.Button disabled={true} value={'ALL'}>None</Radio.Button > */}

          </Radio.Group>
        </div>


        <Text strong style={{fontSize: "10px"}}> MAIN DISPLAY </Text>
        <div style={{marginTop: "3px", marginBottom: "20px"}}>
        <Radio.Group value={settingsLocal.display} onChange={(e) => setSettingsLocal({...settingsLocal, display: e.target.value})}>
            <Radio.Button value={'Timer'}>Timer</Radio.Button >
            <Radio.Button value={'Period'}>Period</Radio.Button >

          </Radio.Group>


        </div>


        <Text strong style={{fontSize: "10px"}}> DARK MODE </Text>
        <div style={{marginTop: "3px" }}>
          <Switch 
          checked={settings.dark}
          onChange={() => {
            setSettingsLocal({...settingsLocal, dark: settingsLocal.dark ? false : true})
            setSettings({...settingsLocal, dark: settingsLocal.dark ? false : true})
          }} 
          >Dark</Switch >
        </div>


        <div style={{width: '100%', textAlign:'center', marginTop: "15px"}}>
                    <Text style={{fontSize: '12px'}}>Made by HSE Apps</Text>
                    <br></br>
                    <Text style={{fontSize: '18px'}}>
                    <a target="_blank" href="https://hseapps.org/about"><TeamOutlined style={{marginRight: '5px'}}></TeamOutlined></a>
                    <a target="_blank" href="https://instagram.com/hseapps"><InstagramOutlined style={{marginRight: '8px'}}></InstagramOutlined></a>
                    <a target="_blank" href="https://github.com/HSE-Apps"><GithubOutlined style={{marginRight: '5px'}}></GithubOutlined></a>
                    </Text>

                </div>
      
      </Modal>
    </>
  );
}

export default Navbar;
