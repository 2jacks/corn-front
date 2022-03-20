import React, {useState, useEffect} from 'react';
import './FieldsList.scss'

import {GeoService} from "../../../../services/GeoService";

import {selectAllFields, selectFieldById, fetchFields} from "../../../../store/features/fields/fieldsSlice";
import {useSelector, useDispatch} from "react-redux";

import {FieldItem} from "./FieldItem/FieldItem";
import {Menu, Spin} from "antd";

const FieldsList = () => {
   const dispatch = useDispatch()

   const user = JSON.parse(localStorage.getItem('user'))

   const fields = useSelector(selectAllFields)
   const fieldsStatus = useSelector(state => state.fields.status)

   useEffect(() => {
      if (fieldsStatus === 'idle') {
         dispatch(fetchFields(user.username))
      }

   }, [fieldsStatus, dispatch])

   let content
   if (fieldsStatus === 'loading') {
      content = (
        <div style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}>
           <Spin size="large"/>
        </div>
      )
   } else if (fieldsStatus === 'complete') {
      const items = fields.map(field => {
         return (
           <FieldItem key={field.id.toString()} field={field}/>
         )
      })
      content = (
        <div className={'field-list'}>
           {items}
        </div>)
   }

   return (
     <>
        {content}
     </>
   );
};

export {FieldsList};
