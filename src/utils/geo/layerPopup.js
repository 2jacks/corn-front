import React from 'react';

const PopupContent = ({data}) => {
   return (<div>
      <div>
         <span>Площадь: </span>
         <span>{data.area}</span>
      </div>
      <div>
         <span>Минимум:</span>
         <span>{data.min_index}</span>
      </div>
      <div>
         <span>Максимум:</span>
         <span>{data.max_index}</span>
      </div>
      <div>
         <span>Среднее:</span>
         <span>{data.mean_index}</span>
      </div>
   </div>)
}

export {PopupContent}
