import React from 'react'
import {MapContainer} from 'react-leaflet'
// import {POSITION_CLASSES} from '../../../../../constants/LEAFLET_CONSTS'

import {MapController} from "./MapController";
import {Layers} from './Layers/Layers'


const ResearchesMap = () => {

   return (
     <MapContainer
       center={[54.730865258122, 55.96384048461915]}
       zoom={12}
       style={{height: '100vh'}}
     >
        <>
           <MapController/>
           <Layers/>
        </>

     </MapContainer>
   )
}

export {ResearchesMap}
