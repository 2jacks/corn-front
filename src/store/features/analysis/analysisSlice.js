import {createSlice} from "@reduxjs/toolkit";

export const analysisSlice = createSlice({
   name: 'analysis',
   initialState: {
      activeAnalysisTool: 'sideBySide',
      isToolWindowActive: false,

      mapMode: 'default',
      mapData: null,
   },
   reducers: {
      setActiveAnalysisTool(state, action) {
         const {toolKey} = action.payload
         state.activeAnalysisTool = toolKey
      },
      setIsToolWindowActive(state, action) {
         state.isToolWindowActive = action.payload
      },

      setMapMode(state, action) {
         const {mapMode} = action.payload
         state.mapMode = mapMode
      },
      setMapData(state, action) {
         const {mapData} = action.payload
         state.mapData = mapData
      }
   }

})

export const {setActiveAnalysisTool, setIsToolWindowActive, setMapMode, setMapData} = analysisSlice.actions
export default analysisSlice.reducer
