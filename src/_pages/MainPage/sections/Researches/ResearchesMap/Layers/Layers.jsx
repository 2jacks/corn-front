import React, {useContext, useEffect, useState} from 'react'
import {
   ImageOverlay,
   LayersControl,
   TileLayer,
   FeatureGroup,
   Pane,
   Polyline, CircleMarker
} from 'react-leaflet'

import {DrawPanel} from '../DrawPanel/DrawPanel.jsx'
import {FitoscanChart} from "./FitoscanChart/FitoscanChart"
import L from 'leaflet'
import * as turf from '@turf/turf'

import {API_URL} from "../../../../../../constants/BACKEND";
import {useSelector} from "react-redux";
import {selectResearchById} from "../../../../../../store/features/researches/researchesSlice";
import {selectFitoScansByResearchId} from "../../../../../../store/features/fitoscan/fitoscanSlice";
import {Modal} from "antd";
import {selectFieldById} from "../../../../../../store/features/fields/fieldsSlice";

const Layers = () => {
   const user = useSelector(state => state.user)
   const mapState = useSelector(state => state.mapState)
   const field = useSelector(state => selectFieldById(state, mapState.field))
   const research = useSelector(state => selectResearchById(state, mapState.research))
   const fitoscan = useSelector(state => selectFitoScansByResearchId(state, mapState.research))

   const [isModalVisible, setIsModalVisible] = useState(false)

   const [chartData, setChartData] = useState(null)

   const showModal = () => {
      setIsModalVisible(true);
   };

   const handleOk = () => {
      setIsModalVisible(false);
   };

   const handleCancel = () => {
      setIsModalVisible(false);
   };


   let fitoscanPoints = fitoscan.map(f => {
      return (
        <CircleMarker
          key={f.id}
          center={[f.geometry.coordinates[1], f.geometry.coordinates[0]]}
          radius={8}
          pathOptions={{
             weight: 2,
             color: '#1b6900',
             fillColor: '#30d000',
             fillOpacity: 1,
             opacity: 1,

          }}
          eventHandlers={{
             add: (e) => {
                console.log(e)
                e.target.pm._layer.setStyle({pmIgnore: true})
             },
             click: () => {
                setChartData(f.properties)
                showModal()
             }
          }}
        />
      )
   })

   let layers
   if (research) {
      let bounds = L.latLngBounds(
        [research.bounds.corner1.lat, research.bounds.corner1.lng],
        [research.bounds.corner2.lat, research.bounds.corner2.lng]
      )
      let invertedField = turf.flip(field)
      layers = (
        <>
           <LayersControl.Overlay checked={false} name={'RGB снимок'}>
              <ImageOverlay zIndex={1001} url={`${API_URL}/geo/${user.username}/fields/${mapState.field}/researches/${mapState.research}/files/rgb`} bounds={bounds}/>
           </LayersControl.Overlay>

           {research.indexes.ndwi_png ? <LayersControl.Overlay checked={false} name={'Содержание влаги'}>
              <ImageOverlay zIndex={1001} url={`${API_URL}/geo/${user.username}/fields/${mapState.field}/researches/${mapState.research}/files/ndwi`} bounds={bounds}/>
           </LayersControl.Overlay> : null}

           <LayersControl.Overlay checked={true} name={'Вегетация'}>
              <ImageOverlay zIndex={1003} url={`${API_URL}/geo/${user.username}/fields/${mapState.field}/researches/${mapState.research}/files/ndvi`} bounds={bounds}/>
           </LayersControl.Overlay>


           <LayersControl.Overlay checked={true} name={'Границы поля'}>
              <Pane name={'field'} style={{zIndex: 1002}}>
                 <Polyline
                   positions={invertedField.geometry.coordinates}
                   pathOptions={{fill: 'transparent', color: '#16fff3', fillColor: 'transparent'}}
                   pane={'field'}
                   eventHandlers={{
                      add: (e) => {
                         e.target.pm._layer.setStyle({pmIgnore: true, snapIgnore: false})
                      },
                   }}
                 />
              </Pane>
           </LayersControl.Overlay>

           <LayersControl.Overlay checked={true} name={'Области интереса'}>
              <Pane name={'drawPanel'} style={{zIndex: 1002}}>
                 <FeatureGroup pane={'drawPanel'}>
                    <DrawPanel/>
                 </FeatureGroup>
              </Pane>
           </LayersControl.Overlay>
           {fitoscan.length > 0 ?
             <LayersControl.Overlay checked={true} name={'ФИТОСКАН'}>
              <Pane name={'fitoscan'} style={{zIndex: 1003}}>
                 <FeatureGroup>
                    {fitoscanPoints}
                 </FeatureGroup>
              </Pane>
           </LayersControl.Overlay>
             : null}

        </>
      )
   } else layers = null
   return (
     <>
        <Modal
          title="Результаты ФитоСкана"
          cancelText={'Закрыть'}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          bodyStyle={{width: 960, height: 500}}
          width={980}
        >
           <div style={{width: 900, height: 400}}>
              {chartData ? <FitoscanChart data={Object.values(chartData).slice(1)}/> : null}
           </div>
        </Modal>
        <LayersControl position="bottomright" collapsed={false}>
           <LayersControl.BaseLayer name={'Open Street Map'}>
              <TileLayer
                attribution='<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
           </LayersControl.BaseLayer>

           <LayersControl.BaseLayer checked name={'Спутник'}>
              <TileLayer
                attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              />
           </LayersControl.BaseLayer>


           {layers}

        </LayersControl></>
   )
}

export {Layers}
