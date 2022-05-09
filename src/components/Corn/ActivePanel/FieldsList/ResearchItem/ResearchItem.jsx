import React, {useContext, useEffect} from 'react';
import "./ResearchItem.scss"
import {List} from 'antd'

import * as turf from '@turf/turf'

import {useDispatch, useSelector} from "react-redux";
import {setResearch, setField, setMapCenter} from "../../../../../store/features/mapState/mapStateSlice";
import {fetchAoisByResearhId} from "../../../../../store/features/aois/aoisSlice";

const ResearchItem = ({research}) => {
   const dispatch = useDispatch()

   const aoisStatus = useSelector(state => state.aois.status)
   const aoisError = useSelector(state => state.aois.error)

   const researchesStatus = useSelector(state => state.researches.status)
   const researchesError = useSelector(state => state.researches.error)

   let user = JSON.parse(localStorage.getItem('user'))  //TODO: pull user from redux-store

   useEffect(() => {
      dispatch(fetchAoisByResearhId({
         username: user.username,
         fieldId: research.field_id,
         researchId: research.id
      }))
   }, [])


   const _onClick = () => {

      dispatch(setResearch({researchId: research.id}))
      dispatch(setField({fieldId: research.field_id}))
      let bounds = turf.points([[research.bounds.corner1.lat, research.bounds.corner1.lng], [research.bounds.corner2.lat, research.bounds.corner2.lng]])
      dispatch(setMapCenter({mapCenter: turf.center(bounds).geometry.coordinates}))


      if (aoisStatus === 'idle') {
         dispatch(setResearch({researchId: research.id}))
      }
   }

   let date = new Date(research.date)
   return (
     <List.Item className={'researches-list__item'} onClick={_onClick}>
        <div className={'research'}>
           <h3>{date.toLocaleDateString()}</h3>
        </div>
     </List.Item>
   );
};

export {ResearchItem};
