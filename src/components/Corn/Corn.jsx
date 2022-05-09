import React, {useEffect, useState} from 'react'

import {Layout, Row, Col} from 'antd'
import {Map} from './Map/Map'
import {CornMenu} from './CornMenu/CornMenu'
import {ActivePanel} from './ActivePanel/ActivePanel'

import {AuthService} from '../../services/AuthService'
import {useNavigate} from 'react-router-dom'

import {useDispatch, useSelector} from "react-redux";
import {userFetched} from "../../store/features/user/userSlice";
import {User} from "./User/User";

const {Sider, Content} = Layout


const Corn = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const user = useSelector(state => state.user)


   const [isMenuCollapsed, setIsMenuCollapsed] = useState(false)
   const [currentPanel, setCurrentPanel] = useState('researches')

   const onToggleMenu = () => {
      setIsMenuCollapsed(!isMenuCollapsed)
   }
   const onSelectPanel = (e) => {
      setCurrentPanel(e.key)
   }

   function checkUser(data) {
      let localUser = JSON.parse(window.localStorage.getItem('user'))
      let access_token = window.sessionStorage.getItem('access_token')
      console.log({...localUser, access_token})

      AuthService.verify(access_token)
        .then((res) => {
           dispatch(userFetched({...localUser, access_token}))
           console.log('token is fresh')
        })
        .catch((err) => {
           console.log(err)
           navigate('/login')
        })
   }

   // При заходе на / проверяет наличие юзера в локал сторажах и добавляет их в стор. Если стораж пустой - идем в регу
   useEffect(() => {
      checkUser()
   }, [])


   const _changeResearch = (research) => {
      setMapData((prev) => {
         return {...prev, research: research}
      })
   }
   const _changeAOIs = (aois) => {
      setMapData((prev) => {
         return {...prev, AOIs: aois}
      })
   }

   const [mapData, setMapData] = useState({
      research: {},
      field: {},
      AOIs: [],
      changeResearch: _changeResearch,
      changeAOIs: _changeAOIs
   })

   return (
     <>

        <Row>
           <Col flex={'0 0 1'}>
              <Layout style={{maxWidth: '500px'}}>
                 <Sider trigger={null} collapsible collapsed={isMenuCollapsed}>
                    <CornMenu onSelect={onSelectPanel}/>
                    <User username={user.username || 'Гость'} isMenuCollapsed={isMenuCollapsed}/>
                 </Sider>
                 <ActivePanel
                   isMenuCollapsed={isMenuCollapsed}
                   onToggleMenu={onToggleMenu}
                   currentPanel={currentPanel}
                 />
              </Layout>
           </Col>
           <Col flex={'auto'}>
              <Layout style={{width: '100%', height: '100vh'}}>
                 <Map/>
              </Layout>
           </Col>
        </Row>


     </>)
}

export {Corn}
