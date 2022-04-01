import React from 'react'
import {MapConsumer, MapContainer} from 'react-leaflet'
import {POSITION_CLASSES} from '../../../constants/LEAFLET_CONSTS'

import {Control} from './Control/Control'
import {Layers} from './Layers/Layers'
import {DotChartOutlined} from '@ant-design/icons'

import L from 'leaflet'


const Map = () => {

   return (
     <MapContainer
       center={[54.094434, 56.291283]}
       zoom={13}
       style={{height: '100vh'}}
     >
        <MapConsumer>
           {(map) => {
              console.log('map center:', map)
              return (
                <>
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

                   <Layers mapCtx={map}/></>
              )
           }}
        </MapConsumer>


     </MapContainer>
   )
}

export {Map}
