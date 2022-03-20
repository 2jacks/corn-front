import {configureStore} from '@reduxjs/toolkit'

import fieldsReducer from "./features/fields/fieldsSlice";
import userReducer from "./features/user/userSlice";
import researchesReducer from "./features/researches/researchesSlice";

export default configureStore({
   reducer: {
      user: userReducer,
      fields: fieldsReducer,
      researches: researchesReducer
   }
})
