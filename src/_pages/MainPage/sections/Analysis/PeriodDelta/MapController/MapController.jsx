import React, {useEffect} from 'react';
import {useMap} from "react-leaflet";

import * as turf from '@turf/turf'

const MapController = ({field}) => {
   const map = useMap()

   useEffect(() => {
      if (field) {
         map.setView(turf.center(field).geometry.coordinates.reverse(), 14)
      }

   }, [field])

   return null
};

export default MapController;
