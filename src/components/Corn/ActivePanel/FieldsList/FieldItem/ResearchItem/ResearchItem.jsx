import React, {useContext, useEffect} from 'react';
import "./ResearchItem.scss"
import {List} from 'antd'

import {MapData} from "../../../../../../contexts/MapData";
import {GeoService} from "../../../../../../services/GeoService";

const ResearchItem = ({research}) => {
   let user = JSON.parse(localStorage.getItem('user'))
   let context = useContext(MapData)
   // useEffect(() => {
   //    GeoService.fetchAOIs({
   //       username: user.username,
   //       fieldId: research.field_id,
   //       researchId: research.id
   //    })
   //      .then(res => {
   //         let aois = res.features.map((aoi) => {
   //            let coords = aoi.geometry.coordinates[0].map(point => point.reverse())
   //
   //            return {...aoi, coords}
   //         })
   //         context.changeAOIs(aois)
   //         console.log('aois', aois)
   //      })
   // }, [])
   useEffect(() => {
      console.log(context)
   }, [context])

   let date = new Date(research.date)

   let renderDate = date.getDate() + '.' + date.getUTCMonth() + '.' + date.getFullYear()
   return (
     <List.Item className={'research-list__item'} onClick={() => {
        context.changeResearch(research)
        GeoService.fetchAOIs({
           username: user.username,
           fieldId: research.field_id,
           researchId: research.id
        })
          .then(res => {
             let aois = res.features.map((aoi) => {
                let geometry = {...aoi.geometry, coordinates: aoi.geometry.coordinates[0].map(point => point.reverse())}
                return {...aoi, geometry}
             })
             context.changeAOIs(aois)
             console.log('aois', aois)
          })
     }}>
        <div className={'research'}>
           <h3>{renderDate}</h3>
        </div>
     </List.Item>
   );
};

export {ResearchItem};
