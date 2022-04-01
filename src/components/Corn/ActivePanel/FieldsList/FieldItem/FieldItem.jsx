import React, {useEffect, useRef} from 'react';
import './FieldItem.scss'

import {ResearchItem} from "./ResearchItem/ResearchItem";

import {Collapse, List, message} from "antd";

import {useDispatch, useSelector} from "react-redux";
import {fetchResearches, selectFieldResearches} from "../../../../../store/features/researches/researchesSlice";

const {Panel} = Collapse

const FieldItem = ({field}) => {
   const dispatch = useDispatch()
   const user = JSON.parse(localStorage.getItem('user'))

   const researches = useSelector(state => selectFieldResearches(state, field.id))
   const researchesStatus = useSelector(state => state.researches.status)


   useEffect(() => {
      console.log('fieldItem init', field.id, researches, researchesStatus)
   }, [researches])

   useEffect(() => {
      if (researchesStatus === 'idle') {
         dispatch(fetchResearches({username: user.username, fieldId: field.id}))
      }
      if (researchesStatus === 'failed') {
         message.error('This is an error message')
      }

   }, [])
   const header = (
     <div className={'field-item'}>
        <div className={'field-item__icon'}>
           <img src="http://via.placeholder.com/20x20" alt=""/>
        </div>
        <h3 className={'field-item__name'}>{field.properties.name}</h3>
        <span className={'field-item__area'}>{field.properties.area || 'null'}</span>
     </div>
   )

   return (

     <Collapse bordered={false} className={'field-item__collapse'}>
        <Panel key={field.id.toString()} header={header} className={'field-item__collapse-panel'}>
           <div>
              <List dataSource={researches} className={'research-list'} renderItem={(item) =>
                <ResearchItem research={item}/>}/>
           </div>
        </Panel>
     </Collapse>


   );
};

export {FieldItem};
