import {createSlice} from "@reduxjs/toolkit";

export const mapStateSlice = createSlice({
   name: 'mapState',
   initialState: {
      field: {},
      research: {},
      aois: [],
      mapCenter: [54.770661, 56.035975],
      zoom: 12
   },
   reducers: {
      setField(state, action) {
         const {fieldId} = action.payload
         state.field = fieldId
      },
      setResearch(state, action) {
         const {researchId} = action.payload
         state.research = researchId
      },
      setAois(state, action) {
         const {aoisId} = action.payload
         state.aois = aoisId
      },
      setMapCenter(state, action) {
         const {mapCenter} = action.payload
         state.mapCenter = mapCenter
      },
      setZoom(state, action) {
         const {zoom} = action.payload
         state.zoom = zoom
      }
   }
})

export const {setField, setResearch, setAois, setMapCenter, setZoom} = mapStateSlice.actions
export default mapStateSlice.reducer

// export const selectCurrentField = state => state.field
// export const selectCurrentResearch = state => state.research
// export const selectCurrentAois = state => state.aois
