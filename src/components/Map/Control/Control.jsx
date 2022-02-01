import React from 'react'
import './Control.scss'
import { Tooltip } from 'antd'

const Control = ({ icon, tooltip, handler }) => {
  return (
    <Tooltip title={tooltip} placement={'left'}>
      <button className="control leaflet-control leaflet-bar" onClick={handler}>
        {icon}
      </button>
    </Tooltip>
  )
}

export { Control }
