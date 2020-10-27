import React, {useState, useContext, useEffect} from 'react';
import {Link} from 'react-router-dom'

import { Row, Col, Typography, Button, Dropdown, Drawer,Menu, Avatar, Modal, Input, Radio} from 'antd';

import { GithubOutlined, InstagramOutlined, LogoutOutlined, MenuOutlined, SettingOutlined, LinkOutlined} from '@ant-design/icons';


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


  return (
    <> 
      <div style={{borderBottom: 'solid 1px rgba(0,0,0,0.1)'}}>
        <Row style = {{padding: '10px'}} align = "middle">
        <Col span={20} style={{display: "flex", alignItems: "center"}}>
            <Link to="/"><motion.img whileHover={{ scale: 1.05 }} src={logo} style={{height: "40px"}}></motion.img></Link>
            <Title level={3} style={{margin: "0px 5px"}}> HSE Schedule</Title>
        </Col>
        <Col span={4}  style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
            <Button onClick={() => setModal(!modal)} shape='circle' type='primary' icon={<SettingOutlined/>}/>
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

          <Input value={settingsLocal.color.to} onChange={(e) => setSettingsLocal({...settingsLocal, color: {...settingsLocal.color, to: e.target.value}})} prefix={<div style={{width: '20px', height: '20px', background: settingsLocal.color.to, marginRight: "5px"}}></div>} placeholder="0% Color" style={{width: "45%"}}/>

          <Input value={settingsLocal.color.from} onChange={(e) => setSettingsLocal({...settingsLocal, color: {...settingsLocal.color, from: e.target.value}})} prefix={<div style={{width: '20px', height: '20px', background: settingsLocal.color.from, marginRight: "5px"}}></div>} placeholder="0% Color" style={{width: "45%"}}/>

        </div>

        <Text strong style={{fontSize: "10px"}}>LUNCH </Text>
        <div style={{marginTop: "3px"}}>
          <Radio.Group value={settingsLocal.lunch} onChange={(e) => setSettingsLocal({...settingsLocal, lunch: e.target.value})}>
            <Radio.Button value={'A'}>A Lunch</Radio.Button >
            <Radio.Button value={'B'}>B Bunch</Radio.Button >
            <Radio.Button value={'C'}>C Lunch</Radio.Button >

          </Radio.Group>
        </div>

        <div style={{width: '100%', textAlign:'center', marginTop: "30px"}}>
                    <Text style={{fontSize: '12px'}}>Made by HSE Apps</Text>
                    <br></br>
                    <Text style={{fontSize: '18px'}}>
                    <a target="_blank" href="https://instagram.com/hseapps"><InstagramOutlined style={{marginRight: '8px'}}></InstagramOutlined></a>
                    <a target="_blank" href="https://github.com/HSE-Apps"><GithubOutlined style={{marginRight: '5px'}}></GithubOutlined></a>
                    </Text>

                </div>
      
      </Modal>
    </>
  );
}

export default Navbar;
