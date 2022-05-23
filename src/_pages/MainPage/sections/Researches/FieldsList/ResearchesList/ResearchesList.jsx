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

   // if (researchesStatus === 'loading') {
   //    return (
   //      <div className={'researches-list__spin'}>
   //         <Spin/>
   //      </div>
   //    )
   // } else {
   //    return (
   //      <div>
   //         <div>
   //            <List dataSource={researches} className={'researches-list'} renderItem={(item) =>
   //              <ResearchItem research={item}/>}/>
   //         </div>
   //      </div>
   //    );
   // }
   return (
     <div>
        <div>
           <List dataSource={researches} className={'researches-list'} renderItem={(item) =>
             <ResearchItem research={item}/>}/>
        </div>
     </div>
   );
};

export {ResearchesList};
