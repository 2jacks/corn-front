import React, {useEffect} from 'react';
import './ResearchesList.scss'
import {List, Spin} from "antd";
import {ResearchItem} from "../ResearchItem/ResearchItem";

import {useDispatch, useSelector} from "react-redux";
import {selectResearchesByFieldId, fetchResearches} from "../../../../../../store/features/researches/researchesSlice";

const ResearchesList = ({fieldId}) => {
   const dispatch = useDispatch()

   const user = JSON.parse(localStorage.getItem('user'))
   const researches = useSelector(state => selectResearchesByFieldId(state, fieldId))

   const researchesStatus = useSelector(state => state.researches.status)

   useEffect(() => {
      if (researchesStatus === 'idle') {
         dispatch(fetchResearches({
            username: user.username,
            fieldId: fieldId
         }))
      }
   }, [dispatch])

   let sortedResearches = researches.sort((a, b)=> {
      if (new Date(a.date) > new Date(b.date)) {
         return 1
      }
      if (new Date(a.date) < new Date(b.date)){
         return -1
      }
      if (new Date(a.date) === new Date(b.date)) {
         return 0
      }
   })
   return (
     <div>
        <div>
           <List dataSource={sortedResearches} className={'researches-list'} renderItem={(item) =>
             <ResearchItem research={item}/>}/>
        </div>
     </div>
   );
};

export {ResearchesList};
