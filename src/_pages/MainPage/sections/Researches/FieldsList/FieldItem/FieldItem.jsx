import React from 'react';
import './FieldItem.scss'
import {AimOutlined} from "@ant-design/icons";
import * as turf from '@turf/turf'

import {useDispatch} from "react-redux";
import {setMapCenter, setZoom} from "../../../../../../store/features/mapState/mapStateSlice";


const FieldItem = ({field}) => {
   const dispatch = useDispatch()
   const _onZoomClick = (e) => {
      let center = turf.center(field)
      console.log('center', center)
      dispatch(setMapCenter({mapCenter: center.geometry.coordinates.reverse()}))
      dispatch(setZoom({zoom: 15}))
   }

   return (
     <div className={'field-item'}>
        <div className={'field-item__icon'}>
           <img src="http://via.placeholder.com/20x20" alt=""/>
        </div>
        <h3 className={'field-item__name'}>{field.properties.name}</h3>
        <span className={'field-item__area'}>{field.properties.area + ' га' || 'null'}</span>
        <button className={'field-item__zoom-to-field'} onClick={_onZoomClick}>
           <AimOutlined/>
        </button>
     </div>
   )
     ;
};

export {FieldItem};
