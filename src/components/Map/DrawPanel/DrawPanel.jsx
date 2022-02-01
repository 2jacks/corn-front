import React, { useRef } from 'react'

import { FeatureGroup } from 'react-leaflet'
import { EditControl } from 'react-leaflet-draw'
import L from 'leaflet'
import turfArea from '@turf/area'

import './DrawPanel.css'

const DrawPanel = () => {
  // prettier-ignore
  const layerOptions =
     `<div>
        <button>1</button>
        <button>2</button>
        <button>3</button>
      </div>`

  const _onCreate = (e) => {
    console.log('created', e)
    let layer = e.layer
    layer.on('click', () => {
      console.log(turfArea(layer.toGeoJSON()))
      console.log(layer.toGeoJSON())
    })
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
    layer.bindPopup(layerOptions)
  }
  const _onEdit = (e) => {
    console.log('edit', e)
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
