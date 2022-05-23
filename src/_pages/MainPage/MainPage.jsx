import React, {useState} from 'react'

import {CornMenu} from '../../components/CornMenu/CornMenu'

import {Researches} from "./sections/Researches/Researches";
import {Fields} from "./sections/Fields/Fields";
import {Analysis} from "./sections/Analysis/Analysis";

import {ExperimentOutlined, RadiusSettingOutlined, RadarChartOutlined} from "@ant-design/icons";

import {Layout} from 'antd'

const {Content} = Layout


const sections = {
   'researches': {
      header: 'Исследования',
      menuIcon: <ExperimentOutlined/>,
      body: <Researches/>
   },
   'fields': {
      header: 'Поля',
      menuIcon: <RadiusSettingOutlined/>,
      body: <Fields/>
   },
   'analysis': {
      header: 'Анализ',
      menuIcon: <RadarChartOutlined/>,
      body: <Analysis/>
   }
}

const MainPage = () => {

   const [currentSection, setCurrentSection] = useState('researches')

   const onMenuSelect = (e) => {
      setCurrentSection(e.key)
   }
   return (

     <>
        <Layout>
           <CornMenu onSelect={onMenuSelect} sections={sections}/>
           <Content>
              <div style={{width: '100%', height: '100vh'}}>
                 {sections[currentSection].body}
              </div>
           </Content>
        </Layout>
     </>
   )
}

export {MainPage}
