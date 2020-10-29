import React, {useState, useEffect} from 'react'

import  {Typography} from 'antd'

import {motion} from 'framer-motion'

import useMedia from '../../hooks/useMedia'

import axios from 'axios'

import {use100vh} from 'react-div-100vh'

import dayjs from 'dayjs'

import { LoadingOutlined } from '@ant-design/icons';


const {Text, Title} = Typography

const periodV = {
    hidden:{
       opacity: 0,
       x: '200%'
    },
    visible:{
        opacity: 1,
        x: 0,
        transition: {
            type: 'spring',
            stiffness: 50
        }
    }
}

const bigContainerVariants = {
    hidden:{
        opacity: 0
    },
    visible:{
        opacity: 1,
        transition: {
            staggerChildren: "0.10"
        }
    }
}


var duration = require('dayjs/plugin/duration')
var customParseFormat = require('dayjs/plugin/customParseFormat')


dayjs.extend(duration)
dayjs.extend(customParseFormat)


const Periods = () => {

    const [newsCasts, setNewsCasts] = useState(null)

    useEffect(() => {
        getNewsCasts()
    }, [])

    const getNewsCasts = async () => {
        try{
            const {data} = await axios.get('https://hsenews.com/wp-json/wp/v2/posts/?categories=493')



            setNewsCasts(data)
        } catch(err) {

        }
    }

    const mobile = useMedia(['(min-width: 750px)', '(max-width: 750px)'], [false, true])

    const vh = use100vh()



    return(
        <>
            {newsCasts ? 
        <motion.div variants={bigContainerVariants} initial="hidden" animate="visible" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: "100%", maxHeight: vh * .85, overflowY: "scroll", overflowX: 'hidden', padding: '20px 0px', margin: '45px 0px'}}>
        {newsCasts.slice(0,10).map((cast) => {

                const date = dayjs(cast.date)

                return(
                        <a target="_blank" style={{width: "80%",maxWidth: "500px", display: 'block'}} href={cast.link}>
                        <motion.div whileHover={{x: 10}} variants={periodV} style={{boxShadow: " 2px 2px 15px rgb(0,118,220,0.18) ", width: "100%", height: mobile ? '60px' : '80px', borderRadius: "10px", cursor: 'pointer', display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: vh * .02, padding: "24px"}}>
                            <div>
                                <Title level={mobile ? 4 : 3} style={{color: "#333", marginBottom: '0px'}}>{cast.title.rendered.replace(';', ':').split(':')[0].split('&')[0] }</Title>
                            </div>
                            <div style={{textAlign: 'center'}}>
                                <Text style={{color: "#555", fontWeight: "300",fontSize: mobile ? '16px' : '18px'}}>{date.format('D') > 9 ? date.format('D') : '0' + date.format('D')}</Text>
                                <br/>
                                <Text strong style={{color: "#333", fontSize: mobile ? '14px' : '16px'}}>{date.format('MMM')}</Text>
                            </div>
                        </motion.div>
                        </a>


                )
            })}
            </motion.div>
            :
            <LoadingOutlined style={{fontSize: "55px", color: "#1890ff"}} />   
            }
        </>
        
        
       
    )
}

export default Periods                    
