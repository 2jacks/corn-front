import React, {useCallback, useContext, useEffect, useState} from 'react'
import ReactDOM from "react-dom";
import './DrawPanel.css'

import {EditControl} from 'react-leaflet-draw'
import {Popup, LayerGroup, Polygon, FeatureGroup, useMap} from 'react-leaflet'

import L from 'leaflet'
import turfArea from '@turf/area'

import {PopupContent} from '../../../../utils/geo/layerPopup'
import {GeoService} from '../../../../services/GeoService'
import {MapData} from "../../../../contexts/MapData";

class DrawPanel extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         items: [],
         user: {}
      }
      this.map = this.props.mapData
   }

   _onEdited() {
      console.log('edited')
   }

   _onCreate(e) {

      console.log('created', e, this.context)
      // initialize layer`s object for React
      const id = e.layer._leaflet_id
      const layerType = e.layerType
      const layer = e.layer
      const latlngs = layerType !== 'circle' ? e.layer.getLatLngs()[0] : null
      const area = String(turfArea(layer.toGeoJSON()) / 10000)
      // let stats
      // let popupContent
      GeoService.createAOI({
         username: this.state.user.username,
         fieldId: this.context.research.field_id,
         researchId: this.context.research.id,
         geom: layer.toGeoJSON(),
         area: area
      })
        .then((res) => {
           console.log('res', res)
           let {properties} = res
           let popupContent = ReactDOM.render(<PopupContent data={properties}/>)
           this.setState({items: [...this.state.items, {id, layerType, latlngs, area, popupContent}]})

           //behavior
           layer.on('popupopen', () => {
              layer.setStyle({
                 color: '#fff',
              })
           })
           layer.on('popupclose', () => {
              layer.setStyle({
                 color: '#338088',
              })
           })
           layer.bindPopup(popupContent)
        })
   }


   componentDidMount() {
      this.setState({
         map: this.props.mapData,
         user: JSON.parse(localStorage.getItem('user')),
      })
   }

   componentDidUpdate(prevProps, prevState, snapshot) {
      console.log('draw panel context', this.context)

   }

   render() {
      let renderAois
      if (this.context.AOIs && this.context.AOIs.length > 0) {
         renderAois = this.context.AOIs.map((aoi) => {
            console.log(aoi.geometry.coordinates)
            return <Polygon key={aoi.id} positions={aoi.geometry.coordinates}>
               <Popup>
                  <PopupContent data={aoi.properties}/>
               </Popup>
            </Polygon>
         })
      }


      return (
        <FeatureGroup>
           <LayerGroup>
              {renderAois}
           </LayerGroup>
           <EditControl
             position="bottomleft"
             onEdited={this._onEdited}
             onCreated={this._onCreate.bind(this)}
             // onDeleted={this._onDeleted}
             edit={{
                edit: {
                   selectedPathOptions: {
                      maintainColor: true,
                      opacity: 1,
                      icon: new L.DivIcon({
                         iconSize: new L.Point(8, 8),
                         className:
                           'leaflet-div-icon leaflet-editing-icon corn-edit-marker',
                      }),
                   },
                },
             }}
             draw={{
                polyline: false,
                circle: false,
                circlemarker: false,
                polygon: {
                   icon: new L.DivIcon({
                      iconSize: new L.Point(8, 8),
                      className:
                        'leaflet-div-icon leaflet-editing-icon corn-edit-marker',
                   }),
                },
                marker: {
                   icon: new L.DivIcon({
                      iconSize: new L.Point(8, 8),
                      className:
                        'leaflet-div-icon leaflet-editing-icon corn-edit-marker',
                   }),
                },
             }}
           />
        </FeatureGroup>)
   }
}

DrawPanel.contextType = MapData

// const DrawPanel = function ({context}) {
//    const [items, setItems] = useState([])
//
//    const mapData = useContext(MapData)
//
//    const user = JSON.parse(localStorage.getItem('user'))
//    useEffect(() => {
//       debugger
//       console.log('draw panel init')
//    }, [])
//    useEffect(() => {
//       console.log('draw context', mapData)
//       debugger
//    }, [mapData])
//
//    const _onCreate = (e) => {
//       debugger
//       console.log('created', e, mapData)
//       //initialize layer`s object for React
//       // const id = e.layer._leaflet_id
//       // const layerType = e.layerType
//       const layer = e.layer
//       // const latlngs = layerType !== 'circle' ? e.layer.getLatLngs()[0] : null
//       const area = String(turfArea(layer.toGeoJSON()) / 10000)
//       // let stats
//       // let popupContent
//       GeoService.createAOI({
//          username: user.username,
//          fieldId: mapData.research.field_id,
//          researchId: mapData.research.id,
//          geom: layer.toGeoJSON(),
//          area: area
//       })
//       //   .then((res) => {
//       //    let stats = res
//       //    let popupContent = createPopupContent(area, stats)
//       //    setItems((prev) => {
//       //       return [...prev, {id, layerType, latlngs, area, popupContent}]
//       //    })
//       //
//       //    //behavior
//       //    layer.on('popupopen', () => {
//       //       layer.setStyle({
//       //          color: '#fff',
//       //       })
//       //    })
//       //    layer.on('popupclose', () => {
//       //       layer.setStyle({
//       //          color: '#338088',
//       //       })
//       //    })
//       //    layer.bindPopup(popupContent)
//       // })
//    }
//
//    const _onEdit = (e) => {
//       console.log(e)
//
//       const {
//          layers: {_layers},
//       } = e
//
//       Object.values(_layers).forEach(({_leaflet_id, editing}) => {
//          setItems((items) =>
//            items.map((item) => {
//               if (item.id === _leaflet_id) {
//                  _layers[_leaflet_id].setPopupContent(
//                    createPopupContent(turfArea(_layers[_leaflet_id].toGeoJSON()))
//                  )
//                  return {
//                     ...item,
//                     latlngs: [...editing.latlngs[0]],
//                     area: turfArea(_layers[_leaflet_id].toGeoJSON()),
//                  }
//               } else {
//                  return item
//               }
//            })
//          )
//       })
//    }
//    return (
//      <FeatureGroup>
//         <EditControl
//           position="bottomleft"
//           onEdited={_onEdit}
//           onCreated={_onCreate.bind(this)}
//           // onDeleted={this._onDeleted}
//           edit={{
//              edit: {
//                 selectedPathOptions: {
//                    maintainColor: true,
//                    opacity: 1,
//                    icon: new L.DivIcon({
//                       iconSize: new L.Point(8, 8),
//                       className:
//                         'leaflet-div-icon leaflet-editing-icon corn-edit-marker',
//                    }),
//                 },
//              },
//           }}
//           draw={{
//              polyline: {
//                 icon: new L.DivIcon({
//                    iconSize: new L.Point(8, 8),
//                    className:
//                      'leaflet-div-icon leaflet-editing-icon corn-edit-marker',
//                 }),
//              },
//              polygon: {
//                 icon: new L.DivIcon({
//                    iconSize: new L.Point(8, 8),
//                    className:
//                      'leaflet-div-icon leaflet-editing-icon corn-edit-marker',
//                 }),
//              },
//              circle: {
//                 icon: new L.DivIcon({
//                    iconSize: new L.Point(8, 8),
//                    className:
//                      'leaflet-div-icon leaflet-editing-icon corn-edit-marker',
//                 }),
//              },
//              marker: {
//                 icon: new L.DivIcon({
//                    iconSize: new L.Point(8, 8),
//                    className:
//                      'leaflet-div-icon leaflet-editing-icon corn-edit-marker',
//                 }),
//              },
//           }}
//         />
//      </FeatureGroup>
//    )
// }

export {DrawPanel}
