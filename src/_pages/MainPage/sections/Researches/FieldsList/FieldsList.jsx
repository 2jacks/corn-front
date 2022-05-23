import React, {useState, useEffect} from 'react';
import './FieldsList.scss'

import {selectAllFields, fetchFields} from "../../../../../store/features/fields/fieldsSlice";
import {useSelector, useDispatch} from "react-redux";

import {FieldItem} from "./FieldItem/FieldItem";
import {Collapse, Spin} from "antd";
import {ResearchesList} from "./ResearchesList/ResearchesList";
import {AimOutlined} from "@ant-design/icons";

const {Panel} = Collapse

const FieldsList = () => {
   const dispatch = useDispatch()

   const user = JSON.parse(localStorage.getItem('user'))

   const fields = useSelector(selectAllFields)
   const fieldsStatus = useSelector(state => state.fields.status)

   useEffect(() => {
      if (fieldsStatus === 'idle') {
         dispatch(fetchFields(user.username))
      }
   }, [dispatch, fields])

   const _onFieldItemClick = (e) => {
      console.log(e)
      // if (researchesStatus === 'idle') {
      //    dispatch(fetchResearches({username: user.username, fieldId: field.id}))
      // }
   }


   let content
   if (fieldsStatus === 'loading') {
      content = (
        <div style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}>
           <Spin size="large"/>
        </div>
      )
   } else if (fieldsStatus === 'complete') {
      content = (
        <div className={'field-list'}>
           <Collapse bordered={false} className={'field-item__collapse'} onClick={_onFieldItemClick}>
              {fields.map(field => {
                 return (
                   <Panel header={<FieldItem field={field}/>}
                          key={field.id.toString()}
                          className={'field-item__collapse-panel'}
                          onItemClick={_onFieldItemClick}
                   >
                      <div className={'field-item__extra'}>There will be extra</div>
                      <ResearchesList fieldId={field.id}/>
                   </Panel>
                 )
              })}
           </Collapse>
        </div>)
   }

   return <>{content}</>;
};

export {FieldsList};
