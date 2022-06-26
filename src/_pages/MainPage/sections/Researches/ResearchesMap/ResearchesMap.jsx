import React, {useEffect} from 'react'
import './ResearchesMap.scss'
import {MapContainer, Pane} from 'react-leaflet'

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
           <div className="legend">
              <h4>Легенда</h4>
              <div className="palette">
                 <h5>Вегетация</h5>
                 <img src="./img/ndvi_palette.jpg" alt=""/>
                 <div className="palette-desc">
                    <span>Низкая</span>
                    <span>Высокая</span>
                 </div>
              </div>
              <div className="palette">
                 <h5>Содержание влаги</h5>
                 <img src="./img/diff_palette.jpg" alt=""/>
                 <div className="palette-desc">
                    <span>Низкое</span>
                    <span>Высокое</span>
                 </div>
              </div>
              <div className="row">
                 <div className={'row-object'}>
                    <img src="./img/field_example.jpg" alt=""/>
                 </div>
                 <span className="row-definition">Границы поля</span>
              </div>
              <div className="row">
                 <div className={'row-object'}>
                    <img src="./img/vector_example.jpg" alt=""/>
                 </div>
                 <span className="row-definition">Выбранная область</span>
              </div>
              <div className="row">
                 <div className={'row-object'}>
                    <img src="./img/point_example.jpg" alt=""/>
                 </div>
                 <span className="row-definition">Точка взятия пробы</span>
              </div>
           </div>
        </>
        <Pane name={'toppane'} style={{zIndex: 1005}}/>
     </MapContainer>
   )
}

export {ResearchesMap}
