import React from 'react'
import {
  MapContainer,
  TileLayer,
  FeatureGroup,
  LayersControl,
} from 'react-leaflet'
import { POSITION_CLASSES } from '../../constants/LEAFLET_CONSTS'

import { Control } from './Control/Control'
import { DotChartOutlined } from '@ant-design/icons'

import { DrawPanel } from './DrawPanel/DrawPanel'

const Map = () => {
  const controlHandler = (e) => {
    e.preventDefault()
    fetch('http://localhost:8000/app/polygon/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        shape: [10.0, 42.3, 42.4],
      }),
    })
      .then((res) => {
        console.log(res)
        return res.json()
      })
      .then((res) => {
        console.log(res)
      })
  }

  return (
    <MapContainer
      center={[54.094434, 56.291283]}
      zoom={13}
      style={{ height: '100vh' }}
    >
      <div className={'map__control-group ' + POSITION_CLASSES.topright}>
        <Control
          icon={<DotChartOutlined className={'control__icon'} />}
          tooltip={'Это тулза'}
          handler={controlHandler}
        />
        <Control
          icon={<DotChartOutlined className={'control__icon'} />}
          tooltip={'Это тулза'}
          handler={controlHandler}
        />
      </div>
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
        <LayersControl.Overlay checked={true} name={' Области интереса'}>
          <DrawPanel />
        </LayersControl.Overlay>
      </LayersControl>
    </MapContainer>
  )
}

export { Map }
