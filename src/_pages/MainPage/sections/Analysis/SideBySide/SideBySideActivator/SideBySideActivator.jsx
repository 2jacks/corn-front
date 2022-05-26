import React, {useEffect} from 'react';
import {useLeafletContext} from "@react-leaflet/core";
import {useMap} from "react-leaflet";

import store from "../../../../../../store/store";

import * as turf from '@turf/turf'
import '../../../../../../utils/leaflet-side-by-side'
import {API_URL} from "../../../../../../constants/BACKEND";
import {useSelector} from "react-redux";
import L from "leaflet";

const SideBySideActivator = ({data}) => {
   const user = useSelector(state => state.user)

   const lCtx = useLeafletContext()
   const mapCtx = lCtx.map
   const map = useMap()
   useEffect(() => {
      // map.eachLayer((lyr) => {
      //    map.remove(lyr)
      // })
      // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      //    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      // }).addTo(map);
      if (data) {
         console.log('data', data)
         let res_1 = store.getState().researches.entities[data.res_1]
         let res_2 = store.getState().researches.entities[data.res_2]
         let field = store.getState().fields.entities[data.field]
         console.log('data', data, res_1, res_2, field)

         map.createPane('left');
         map.createPane('right');

         map.setView(turf.center(field.geometry).geometry.coordinates.reverse(), 15)

         let img_1_url = `${API_URL}/geo/${user.username}/fields/${data.field}/researches/${data.res_1}/files/ndvi`
         let img_2_url = `${API_URL}/geo/${user.username}/fields/${data.field}/researches/${data.res_2}/files/ndvi`

         let bounds_1 = L.latLngBounds(
           [res_1.bounds.corner1.lat, res_1.bounds.corner1.lng],
           [res_1.bounds.corner2.lat, res_1.bounds.corner2.lng]
         )
         let bounds_2 = L.latLngBounds(
           [res_2.bounds.corner1.lat, res_2.bounds.corner1.lng],
           [res_2.bounds.corner2.lat, res_2.bounds.corner2.lng]
         )

         let lyr_1 = new L.ImageOverlay(img_1_url, bounds_1, {pane: 'left'})
         lyr_1.addTo(map)
         let lyr_2 = new L.ImageOverlay(img_2_url, bounds_2, {pane: 'right'})
         lyr_2.addTo(map)
         let sideBySide = new L.Control.SideBySide(lyr_1, lyr_2)
         sideBySide.addTo(map)
      }
   }, [data])
   return null
};

export {SideBySideActivator};
