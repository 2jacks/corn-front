import React, {useEffect, useRef, useState} from 'react';
import './SideBySide.scss'


import L from 'leaflet'
import {MapContainer, TileLayer} from "react-leaflet";

import {SidePanel} from "../../../../../components/SidePanel/SidePanel";
import {SideBySideForm} from "./SideBySideForm/SideBySideForm";
import {SideBySideActivator} from "./SideBySideActivator/SideBySideActivator";


const SideBySide = () => {
   const [mapData, setMapData] = useState(null)

   const _onSBSSubmit = (values) => {
      setMapData(values)
   }

   return (
     <div className={'side-by-side'}>
        <div style={{flex: '0 1 1', width: '100%', height: '100vh',}}>
           <MapContainer
             center={[54.730865258122, 55.96384048461915]}
             zoom={12}
             style={{height: '100vh', width: '100%'}}
           >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <SideBySideActivator data={mapData}/>
           </MapContainer>
        </div>
        <div style={{flex: '0 0 1'}}>
           <SidePanel header={'Шторка'} body={<SideBySideForm onSubmit={_onSBSSubmit}/>}/>
        </div>
     </div>
   );
};

export {SideBySide}
