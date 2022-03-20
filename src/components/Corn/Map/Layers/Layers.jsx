import React, {useContext, useEffect} from 'react'
import {ImageOverlay, LayersControl, TileLayer} from 'react-leaflet'

import {DrawPanel} from '../DrawPanel/DrawPanel'
import L from 'leaflet'

import {MapData} from "../../Corn";

const Layers = () => {
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
           <DrawPanel/>
        </LayersControl.Overlay>

        {/*!!!!!!!*/}
        <LayersControl.Overlay checked={true} name={'Индекс'}>
           {/*<ImageOverlay url="./src.jpg" bounds={bounds}/>*/}
           <ImageOverlay url={'https://lapkins.ru/upload/iblock/c3e/c3efe1eeeb89cb82ae4598a6cb71a579.jpeg'} bounds={bounds}/>
           {/*<ImageOverlay url={`http://localhost:8000/geo/${user.username}/fields/${mapData.field_id}/researches/${mapData.id}/files/index`} bounds={bounds}/>*/}
        </LayersControl.Overlay>
        {/*!!!!!!!*/}
     </LayersControl>
   )
}

export {Layers}
