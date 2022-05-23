import React from 'react';
import {ToolButton} from "../ToolButton/ToolButton";

const Toolbar = () => {
   return (
     <div className={'analysis__toolbar'}>
        <ToolButton header={'Шторка'}
                    toolKey={'sideBySide'}
        />
        <ToolButton header={'Изменения за период'}
                    toolKey={'periodDelta'}
        />
     </div>
   );
};

export {Toolbar};
