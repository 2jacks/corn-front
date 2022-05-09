import {createSlice, createAsyncThunk, createEntityAdapter} from "@reduxjs/toolkit";
import {GeoService} from "../../../services/GeoService";

const researchesAdapter = createEntityAdapter({
   sortComparer: (a, b) => b.date.localeCompare(a.date)
})

const initialState = researchesAdapter.getInitialState({
   status: 'idle',
   error: null
})

export const fetchResearches = createAsyncThunk('fields/fetchResearches', async ({username, fieldId}) => {
   return await GeoService.fetchFieldResearches(username, fieldId)
})

const researchesSlice = createSlice({
   name: 'researches',
   initialState,
   reducers: {},
   extraReducers: builder => {
      builder
        .addCase(fetchResearches.pending, (state, action) => {
           state.status = 'loading'
        })
        .addCase(fetchResearches.fulfilled, (state, action) => {
           researchesAdapter.upsertMany(state, action.payload)
           state.status = 'idle'
        })
        .addCase(fetchResearches.rejected, (state, action) => {
           state.status = 'failed'
           state.error = action.error.message
        })

   }

})

export default researchesSlice.reducer

export const {
   selectAll: selectAllResearches,
   selectById: selectResearchById,
   selectIds: selectResearchesIds
   // Pass in a selector that returns the posts slice of state
} = researchesAdapter.getSelectors(state => state.researches)


export const selectResearchesByFieldId = (state, fieldId) => {
   const researches = state.researches.entities
   return Object.values(researches).filter(research => research.field_id === fieldId)
}
