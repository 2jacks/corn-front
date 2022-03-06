import React from 'react'
import {MapContainer} from 'react-leaflet'
import {POSITION_CLASSES} from '../../../constants/LEAFLET_CONSTS'

import {Control} from './Control/Control'
import {Layers} from './Layers/Layers'
import {DotChartOutlined} from '@ant-design/icons'


const Map = () => {

  return (
    <MapContainer
      center={[54.094434, 56.291283]}
      zoom={13}
      style={{height: '100vh'}}
    >
      <div className={'map__control-group ' + POSITION_CLASSES.topright}>
        <Control
          icon={<DotChartOutlined className={'control__icon'}/>}
          tooltip={'Это тулза'}
          // handler={controlHandler}
        />
        <Control
          icon={<DotChartOutlined className={'control__icon'}/>}
          tooltip={'Это тулза'}
          // handler={controlHandler}
        />
      </div>

      <Layers/>

    </MapContainer>
  )
}

export {Map}
