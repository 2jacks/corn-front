import React from 'react'
import {
  MapContainer,
  TileLayer,
  FeatureGroup,
  LayersControl,
} from 'react-leaflet'
import { POSITION_CLASSES } from '../../constants/LEAFLET_CONSTS'

import { Control } from './Control/Control'
import { Layers } from './Layers/Layers'
import { DotChartOutlined } from '@ant-design/icons'

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
      <Layers />
    </MapContainer>
  )
}

export { Map }
