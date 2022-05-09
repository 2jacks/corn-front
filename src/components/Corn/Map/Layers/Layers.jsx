import React, {useContext, useEffect} from 'react'
import {ImageOverlay, LayersControl, TileLayer, FeatureGroup} from 'react-leaflet'

import {DrawPanel} from '../DrawPanel/DrawPanel.jsx'
import L from 'leaflet'


import {API_URL} from "../../../../constants/BACKEND";
import {useSelector} from "react-redux";
import {selectResearchById} from "../../../../store/features/researches/researchesSlice";

const Layers = () => {
   const user = useSelector(state => state.user)
   const mapState = useSelector(state => state.mapState)
   const research = useSelector(state => selectResearchById(state, mapState.research))
   useEffect(() => {
      console.log('map_user', user)
   }, [user])


   let researchLayers
   if (research) {
      let bounds = L.latLngBounds(
        [research.bounds.corner1.lat, research.bounds.corner1.lng],
        [research.bounds.corner2.lat, research.bounds.corner2.lng]
      )
      researchLayers = (
        <>
           <LayersControl.Overlay checked={true} name={'Исходник'}>
              <ImageOverlay url={`${API_URL}/geo/${user.username}/fields/${mapState.field}/researches/${mapState.research}/files/rgb`} bounds={bounds}/>
           </LayersControl.Overlay>
           <LayersControl.Overlay checked={true} name={'NDVI'}>
              <ImageOverlay url={`${API_URL}/geo/${user.username}/fields/${mapState.field}/researches/${mapState.research}/files/ndvi`} bounds={bounds}/>
           </LayersControl.Overlay>
           <LayersControl.Overlay checked={true} name={'NDWI'}>
              <ImageOverlay url={`${API_URL}/geo/${user.username}/fields/${mapState.field}/researches/${mapState.research}/files/ndwi`} bounds={bounds}/>
           </LayersControl.Overlay>
        </>
      )
   } else researchLayers = null

   return (
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

        <LayersControl.Overlay checked={true} name={'Области интереса'}>
           <FeatureGroup>
              <DrawPanel/>
           </FeatureGroup>

        </LayersControl.Overlay>

        {researchLayers}

     </LayersControl>
   )
}

export {Layers}
