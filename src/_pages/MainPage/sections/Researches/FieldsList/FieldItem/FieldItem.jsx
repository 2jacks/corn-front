import React, {useEffect, useRef} from 'react';
import './FieldItem.scss'
import {AimOutlined} from "@ant-design/icons";
import * as turf from '@turf/turf'

import {useDispatch} from "react-redux";
import {setField, setMapCenter, setZoom} from "../../../../../../store/features/mapState/mapStateSlice";

import * as d3 from 'd3'

const FieldItem = ({field}) => {
   const dispatch = useDispatch()
   const _onZoomClick = (e) => {
      // dispatch(setField(field))
      let center = turf.center(field)
      dispatch(setMapCenter({mapCenter: center.geometry.coordinates.reverse()}))
      dispatch(setZoom({zoom: 15}))
   }

   const svgContainer = useRef(null)
   let fieldShape = null

   var projection = d3.geoIdentity().reflectY(true).fitSize([40, 40], field);

   var geoGenerator = d3.geoPath().projection(projection)

   useEffect(() => {
      let str = geoGenerator(field)
      d3.select(svgContainer.current.querySelector('g'))
        .append('path')
        .attr('d', geoGenerator(field))
        .attr('stroke-width', 2)
        .attr('fill', '#1890ff')
      // .data(field)

      // debugger


   }, [])


   return (
     <div className={'field-item'}>
        <div className={'field-item__icon'}>
           <svg className={'field-item__svg'} ref={svgContainer} xmlns="http://www.w3.org/2000/svg" version="1.1">
              <g className="map"/>
           </svg>
           {fieldShape}
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
