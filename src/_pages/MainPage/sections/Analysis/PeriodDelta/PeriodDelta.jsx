import React, {useEffect, useState} from "react";
import './PeriodDelta.scss'
import {ImageOverlay, LayersControl, MapContainer, TileLayer, Polygon} from "react-leaflet";
import {SidePanel} from "../../../../../components/SidePanel/SidePanel";
import {PeriodDeltaForm} from "./PeriodDeltaForm/PeriodDeltaForm";
import {useSelector} from "react-redux";
import {selectFieldById} from "../../../../../store/features/fields/fieldsSlice";

import * as turf from '@turf/turf'
import L from 'leaflet'

import MapController from "./MapController/MapController";
import {GeoService} from "../../../../../services/GeoService";

const PeriodDelta = () => {
   const [rasterUrl, setRasterUrl] = useState(null)
   const [selectedFieldId, setSelectedFieldId] = useState(null)
   const selectedField = useSelector(state => selectFieldById(state, selectedFieldId))
   const _onDeltaSubmit = async (values) => {
      const {res_1, res_2, fieldId} = values
      GeoService.getDiffResearches({res_1, res_2, field: selectedField}).then(res => {
         if (res.ok) {
            res.blob().then(blob => {
               setRasterUrl(URL.createObjectURL(blob))
            })
         }
      })

   }

   const _onFieldChange = (id) => {
      setSelectedFieldId(id)
   }

   let resultRaster = null
   if (rasterUrl) {
      let bbox = turf.envelope(selectedField).bbox
      console.log(bbox)
      let bounds = L.latLngBounds([bbox[1], bbox[0]], [bbox[3], bbox[2]])
      console.log(bbox[0], bbox[1], bbox[2], bbox[3])
      resultRaster =
        <LayersControl.Overlay checked={true} name={'Результат'}>
           <ImageOverlay url={rasterUrl} bounds={bounds}/>
        </LayersControl.Overlay>


   }

   return (
     <div className={'period-delta'}>
        <div style={{flex: '0 1 1', width: '100%', height: '100vh',}}>
           <MapContainer
             center={[54.730865258122, 55.96384048461915]}
             zoom={12}
             style={{height: '100vh', width: '100%'}}
           >
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

                 {resultRaster}

              </LayersControl>


              <MapController field={selectedField}/>

              <div className="legend--delta">
                 <h4>Легенда</h4>
                 <div className="palette">
                    <h5>Изменение вегетации</h5>
                    <img src="./img/diff_palette.jpg" alt=""/>
                    <div className="palette-desc">
                       <span>Отрицательное</span>
                       <span>Положительное</span>
                    </div>
                 </div>
              </div>

           </MapContainer>
        </div>
        <div style={{flex: '0 0 1'}}>
           <SidePanel header={'Изменения за период'} body={
              <PeriodDeltaForm onSubmit={_onDeltaSubmit} onFieldChange={_onFieldChange} selectedField={selectedFieldId}/>}/>
        </div>
     </div>
   );
};

export {PeriodDelta};
