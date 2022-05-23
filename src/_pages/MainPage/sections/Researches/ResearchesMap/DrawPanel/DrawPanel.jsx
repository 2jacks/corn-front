import React, {useCallback, useEffect, useRef, useState} from 'react'
import './DrawPanel.css'

import {Popup, LayerGroup, Polygon, FeatureGroup, useMap, GeoJSON} from 'react-leaflet'

import L from 'leaflet'

import '@geoman-io/leaflet-geoman-free';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';

import * as turf from '@turf/turf'

import {useSelector, useDispatch} from "react-redux";
import {addAoi, selectAoisByResearchId} from '../../../../../../store/features/aois/aoisSlice';
import {Table} from "antd";


function DrawPanel() {
   const dispatch = useDispatch()
   const map = useMap()

   const user = JSON.parse(localStorage.getItem('user'))
   const mapState = useSelector(state => state.mapState)
   const fgRef = useRef() //FeatureGroup

   const aois = useSelector(state => selectAoisByResearchId(state, mapState.research))

   const _onCreate = useCallback((e) => {
      const layer = e.layer
      const area = String(turf.area(layer.toGeoJSON()) / 10000)

      dispatch(addAoi({
         username: user.username,
         fieldId: mapState.field,
         researchId: mapState.research,
         geom: layer.toGeoJSON(),
         area: area
      }))
   }, [mapState])

   const _onDelete = useCallback((e) => {

   }, [mapState])


   // Init Geoman
   useEffect(() => {
      map.pm.addControls({
         position: 'bottomleft',

         drawMarker: false,
         drawCircle: false,
         drawCircleMarker: false,
         drawPolyline: false,
         drawRectangle: true,
         drawPolygon: true,
         editMode: true,
         dragMode: false,
         cutPolygon: false,
      })
   }, [])

   //Refresh event handlers
   useEffect(() => {
      map.off('pm:create')
      map.on('pm:create', _onCreate)
   }, [mapState])


   if (aois) {
      let renderedAois = aois.map(aoi => {
         const columns = [
            {
               title: 'Мин.',
               dataIndex: 'min_index',
               key: 'min_index',
            },
            {
               title: 'Макс.',
               dataIndex: 'max_index',
               key: 'max_index',
            },
            {
               title: 'Среднее',
               dataIndex: 'mean_index',
               key: 'mean_index',
            },
            {
               title: 'Площадь, га',
               dataIndex: 'area',
               key: 'area',
            },
         ];
         let popupData
         let entries = new Map()
         for (let [key, value] of Object.entries(aoi.properties)) {
            entries.set(key, value.toFixed(2))
         }
         popupData = Object.fromEntries(entries)
         // debugger
         return (
           <GeoJSON key={aoi.id} data={aoi.geometry}>
              <Popup>
                 <Table dataSource={[popupData]} columns={columns} pagination={false} size={'small'} bordered={true} rowKey={aoi.id}/>
              </Popup>
           </GeoJSON>)

      })
      return (
        <FeatureGroup ref={fgRef}>
           {renderedAois}
        </FeatureGroup>)

   } else {
      return null
   }
}

export {DrawPanel}
