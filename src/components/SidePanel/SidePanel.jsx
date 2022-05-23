import React from 'react'
import './SidePanel.scss'


const SidePanel = ({header, body}) => {

   return (
     <div className="active-panel">
        <header className="active-panel__header">
           {header}
        </header>
        <hr/>
        <div className="active-panel__body">
           {body}
        </div>
     </div>

   )
}

export {SidePanel}
