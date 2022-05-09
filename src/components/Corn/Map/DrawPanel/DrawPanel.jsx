import React, {useCallback, useEffect, useRef, useState} from 'react'
import './DrawPanel.css'

import {EditControl} from 'react-leaflet-draw'
import {Popup, LayerGroup, Polygon, FeatureGroup, useMap, GeoJSON} from 'react-leaflet'

import L from 'leaflet'
import 'leaflet-draw'
import * as turf from '@turf/turf'

import {PopupContent} from '../../../../utils/geo/layerPopup'
import {GeoService} from '../../../../services/GeoService'

import {useSelector, useDispatch} from "react-redux";
import {addAoi, selectAoisByResearchId} from "../../../../store/features/aois/aoisSlice";
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
      let layers = e.layers;
      layers.eachLayer(function (layer) {
         layer.remove()
      });
   }, [mapState])

   useEffect(() => {
      let drawnItems = fgRef.current;
      map.addLayer(drawnItems);
      let drawControl = new L.Control.Draw({
         edit: {
            featureGroup: drawnItems,
            edit: false,
            remove: true,
         },
         draw: {
            marker: false,
            circle: false,
            circlemarker: false

         },
         position: 'bottomleft'
      });
      map.addControl(drawControl);


      // map.on(L.Draw.Event.CREATED, (e) => {
      //    debugger
      //    const fieldId = mapState.field
      //    const researchId = mapState.research
      //    const layer = e.layer
      //    const area = String(turf.area(layer.toGeoJSON()) / 10000)
      //    GeoService.createAOI({
      //       username: user.username,
      //       fieldId: fieldId,
      //       researchId: researchId,
      //       geom: layer.toGeoJSON(),
      //       area: area
      //    })
      //      .then((res) => {
      //         console.log('AOI RES', res)
      //      })
      // });

   }, [])
   useEffect(() => {
      map.off(L.Draw.Event.CREATED)
      map.on(L.Draw.Event.CREATED, _onCreate);

      map.off(L.Draw.Event.DELETED)
      map.on(L.Draw.Event.DELETED, _onDelete);
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
