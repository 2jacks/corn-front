import React, {useState} from 'react';
import './Analysis.scss'

import {SidePanel} from "../../../../components/SidePanel/SidePanel";
import {Toolbar} from './Toolbar/Toolbar'
import {SideBySide} from "./SideBySide/SideBySide";
import {useSelector} from "react-redux";
import {PeriodDelta} from "./PeriodDelta/PeriodDelta";

const analysisTools = {
   'sideBySide': <SideBySide/>,
   'periodDelta': <PeriodDelta/>
}

const Analysis = () => {
   const activeAnalysisTool = useSelector(state => state.analysis.activeAnalysisTool)

   return (
     <div className="analysis">

        <div style={{flex: '0 0 1'}}>
           <SidePanel header="Анализ" body={<Toolbar/>}/>
        </div>
        <div style={{flex: '0 1 1', width: '100%'}}>
           {analysisTools[activeAnalysisTool]}
        </div>

        {/*<div style={{flex: '0 1 1', width: '100%', height: '100vh'}}>*/}
        {/*   <MapContainer center={[54.730865258122, 55.96384048461915]}*/}
        {/*                 zoom={12}*/}
        {/*                 style={{height: '100vh'}}>*/}
        {/*      <TileLayer*/}
        {/*        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'*/}
        {/*        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"*/}
        {/*      />*/}
        {/*      <AnalysisMap/>*/}
        {/*   </MapContainer>*/}
        {/*</div>*/}
        {/*{isToolWindowActive ? <div style={{flex: '0 0 1', width: '1200px'}} className={'analysis__tool-window'}>*/}
        {/*   <ToolWindow/>*/}
        {/*</div> : null}*/}


     </div>
   )
     ;
};

export {Analysis};
