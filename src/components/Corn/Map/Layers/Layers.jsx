import React, {useContext, useEffect} from 'react'
import {ImageOverlay, LayersControl, TileLayer} from 'react-leaflet'

import {DrawPanel} from '../DrawPanel/DrawPanel'
import L from 'leaflet'

import {MapData} from "../../../../contexts/MapData";

import {API_URL} from "../../../../constants/BACKEND";

const Layers = ({mapCtx}) => {
   const user = JSON.parse(localStorage.getItem('user'))
   const mapData = useContext(MapData)
   useEffect(() => {
      console.log('map_user', user)
   }, [user])
   useEffect(() => {
      console.log('map', mapData)
   }, [mapData])

   let bounds = L.latLngBounds(
     [54.091709135, 56.230794873],
     [54.072576908, 56.272860853]
   )

   let researchLayers
   if (mapData && Object.keys(mapData.research).length !== 0) {
      researchLayers = (
        <>
           {/*<LayersControl.Overlay checked={true} name={'Исходник'}>*/}
           {/*   <ImageOverlay url={`${API_URL}/geo/${user.username}/fields/${mapData.research.field_id}/researches/${mapData.research.id}/files/src`} bounds={bounds}/>*/}
           {/*</LayersControl.Overlay>*/}
           {/*<LayersControl.Overlay checked={true} name={'Индекс'}>*/}
           {/*   <ImageOverlay url={`${API_URL}/geo/${user.username}/fields/${mapData.research.field_id}/researches/${mapData.research.id}/files/index`} bounds={bounds}/>*/}
           {/*</LayersControl.Overlay>*/}
           <LayersControl.Overlay checked={true} name={'Исходник'}>
              <ImageOverlay url={`${API_URL}${mapData.research.indexes.ndvi_png}`} bounds={bounds}/>
           </LayersControl.Overlay>
           <LayersControl.Overlay checked={true} name={'Индекс'}>
              <ImageOverlay url={`${API_URL} / geo /${user.username}/fields/${mapData.research.field_id}/researches/${mapData.research.id}/files/index`} bounds={bounds}/>
           </LayersControl.Overlay>
        </>
      )
   } else researchLayers = null

   return (
     <LayersControl position="bottomright">
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

        <LayersControl.Overlay checked={true} name={'Области интереса'}>
           <DrawPanel mapData={mapCtx}/>
        </LayersControl.Overlay>

        {researchLayers}

     </LayersControl>
   )
}

export {Layers}
