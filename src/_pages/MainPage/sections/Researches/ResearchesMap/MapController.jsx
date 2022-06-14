import React, {useEffect} from 'react';
import {useMap} from "react-leaflet";

import {useSelector} from "react-redux";

const MapController = () => {
   const map = useMap()
   const center = useSelector(state => state.mapState.mapCenter)
   const zoom = useSelector(state => state.mapState.zoom)

   //GEOMAN SETTINGS
   useEffect(() => {
      map.pm.setGlobalOptions({
         panes: {vertexPane: 'drawPanel', layerPane: 'drawPanel', markerPane: 'drawPanel'}
      });
   }, [])

   useEffect(() => {
      map.flyTo(center, zoom)
   }, [center, zoom])


   return null;
};

export {MapController};
