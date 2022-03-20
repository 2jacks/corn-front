import React, {useContext, useEffect} from 'react';

import {MapData} from "../../../../Corn";

const ResearchItem = ({research}) => {
   let context = useContext(MapData)
   useEffect(() => {
      console.log(context)
   }, [context])
   return (
     <div className={'research'}>
        <h3>{research.date}</h3>
        <button onClick={() => context.changeResearch(research)}>Change</button>
     </div>
   );
};

export {ResearchItem};
