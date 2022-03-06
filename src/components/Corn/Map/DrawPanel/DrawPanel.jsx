import React, { useState } from 'react'
import './DrawPanel.css'

import { EditControl } from 'react-leaflet-draw'
import { FeatureGroup, useMap } from 'react-leaflet'

import L from 'leaflet'
import turfArea from '@turf/area'

import { createPopupContent } from '../../../utils/layerPopup'
import { requestStats } from '../../../api/api'

const DrawPanel = () => {
  const map = useMap()
  const [items, setItems] = useState([])

  const _onCreate = (e) => {
    console.log('created', e)
    //initialize layer`s object for React
    const id = e.layer._leaflet_id
    const layerType = e.layerType
    const layer = e.layer
    const latlngs = layerType !== 'circle' ? e.layer.getLatLngs()[0] : null
    const area = String(turfArea(layer.toGeoJSON()) / 10000)
    let stats
    let popupContent
    requestStats(layer.toGeoJSON()).then((res) => {
      stats = res
      popupContent = createPopupContent(area, stats)
      setItems((prev) => {
        return [...prev, { id, layerType, latlngs, area, popupContent }]
      })

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

  const _onEdit = (e) => {
    console.log(e)

    const {
      layers: { _layers },
    } = e

    Object.values(_layers).forEach(({ _leaflet_id, editing }) => {
      setItems((items) =>
        items.map((item) => {
          if (item.id === _leaflet_id) {
            _layers[_leaflet_id].setPopupContent(
              createPopupContent(turfArea(_layers[_leaflet_id].toGeoJSON()))
            )
            return {
              ...item,
              latlngs: [...editing.latlngs[0]],
              area: turfArea(_layers[_leaflet_id].toGeoJSON()),
            }
          } else {
            return item
          }
        })
      )
    })
  }
  return (
    <FeatureGroup>
      <EditControl
        position="bottomleft"
        onEdited={_onEdit}
        onCreated={_onCreate}
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
          polyline: {
            icon: new L.DivIcon({
              iconSize: new L.Point(8, 8),
              className:
                'leaflet-div-icon leaflet-editing-icon corn-edit-marker',
            }),
          },
          polygon: {
            icon: new L.DivIcon({
              iconSize: new L.Point(8, 8),
              className:
                'leaflet-div-icon leaflet-editing-icon corn-edit-marker',
            }),
          },
          circle: {
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
    </FeatureGroup>
  )
}

export { DrawPanel }
