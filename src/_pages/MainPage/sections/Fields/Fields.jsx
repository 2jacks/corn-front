import React from 'react';
import {useSelector} from "react-redux";
import {selectAllFields} from "../../../../store/features/fields/fieldsSlice";

const Fields = () => {
   const fields = useSelector(selectAllFields)
   return (
     <div>
        {fields.map(field => <span>{JSON.stringify(field.properties)}</span>)}
     </div>
   );
};

export {Fields};
