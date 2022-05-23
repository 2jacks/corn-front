import {configureStore} from '@reduxjs/toolkit'

import userReducer from "./features/user/userSlice";

import fieldsReducer from "./features/fields/fieldsSlice";
import researchesReducer from "./features/researches/researchesSlice";
import aoisReducer from './features/aois/aoisSlice'

import mapStateReducer from "./features/mapState/mapStateSlice";
import analysisReducer from "./features/analysis/analysisSlice";


export default configureStore({
   reducer: {
      user: userReducer,
      fields: fieldsReducer,
      researches: researchesReducer,
      mapState: mapStateReducer,
      aois: aoisReducer,
      analysis: analysisReducer,
   }
})
