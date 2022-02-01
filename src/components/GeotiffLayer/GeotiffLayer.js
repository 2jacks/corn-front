import { useEffect, useRef } from "react";
import proj4 from "proj4";
import { useLeafletContext } from "@react-leaflet/core";
import { useMap } from "react-leaflet";
import parseGeoraster from "georaster";
import GeoRasterLayer from "georaster-layer-for-leaflet";

window.proj4 = proj4;

const GeotiffLayer = ({ url, options, opacity }) => {
   const geoTiffLayerRef = useRef();
   const context = useLeafletContext();
   const map = useMap();

   useEffect(()=> {
      let geoTiffLayer;
      console.log(opacity)
      const container = context.layerContainer || context.map
      fetch(url)
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => {
           parseGeoraster(arrayBuffer).then(georaster => {
              console.log("georaster:", georaster);

              geoTiffLayer = new GeoRasterLayer({
                 georaster: georaster,
                 resolution: 64,
                 opacity: opacity // optional parameter for adjusting display resolution
              });
              geoTiffLayer.addTo(map)
              // map.addLayer()
              map.fitBounds(geoTiffLayer.getBounds());

           });
        });
      return () => {
         map.remove(geoTiffLayer)
      }
   }, [context, url, map, opacity]);


   return null;
};


export default GeotiffLayer;
