import React from "react";

const mapData = {
   srcImg: '',
   indexImg: '',
   AOIs: [],
   setImgs: (src, index) => {
   }

}
export const MapData = React.createContext(mapData)
MapData.displayName = 'MapDataContext'
