import React from 'react';
import './Researches.scss'

import {SidePanel} from "../../../../components/SidePanel/SidePanel";
import {ResearchesMap} from "./ResearchesMap/ResearchesMap";
import {FieldsList} from "./FieldsList/FieldsList";

const Researches = () => {
   return (
     <div className="corn-section__researches">
        <div style={{flex: '0 0 1'}}>
           <SidePanel header="Исследования" body={<FieldsList/>}/>
        </div>
        <div style={{flex: '0 1 1', width: '100%', height: '100vh'}}>
           <ResearchesMap/>
        </div>

     </div>
   );
};

export {Researches};
