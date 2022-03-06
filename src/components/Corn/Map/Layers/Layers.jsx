import React from 'react'
import { ImageOverlay, LayersControl, TileLayer } from 'react-leaflet'

import { DrawPanel } from '../DrawPanel/DrawPanel'
import L from 'leaflet'

const Layers = () => {
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
        <DrawPanel />
      </LayersControl.Overlay>

      {/*!!!!!!!*/}
      <LayersControl.Overlay checked={true} name={'Индекс'}>
        <ImageOverlay url="./src.jpg" bounds={bounds} />
      </LayersControl.Overlay>
      {/*!!!!!!!*/}
    </LayersControl>
  )
}

export { Layers }
