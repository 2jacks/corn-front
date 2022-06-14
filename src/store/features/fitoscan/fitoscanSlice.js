import {createSlice, createAsyncThunk, createEntityAdapter, createSelector} from "@reduxjs/toolkit";
import {GeoService} from "../../../services/GeoService";
import {selectAllAois} from "../aois/aoisSlice";

const fitoscanAdapter = createEntityAdapter({
   sortComparer: (a, b) => b.id > a.id
})

const initialState = fitoscanAdapter.getInitialState({
   status: 'idle',
   error: null
})

export const fetchFitoScan = createAsyncThunk('fields/fetchFitoScan', async ({username, fieldId, researchId}) => {
   return await GeoService.fetchFitoScan({username, fieldId, researchId})
})

export const fitoscanSlice = createSlice({
   name: 'fitoscan',
   initialState,
   reducers: {},
   extraReducers: builder => {
      builder
        .addCase(fetchFitoScan.pending, (state, action) => {
           state.status = 'loading'
        })
        .addCase(fetchFitoScan.fulfilled, (state, action) => {
           const fitoscan = action.payload.features
           state.status = 'complete'
           fitoscanAdapter.upsertMany(state, fitoscan)

        })
        .addCase(fetchFitoScan.rejected, (state, action) => {
           state.status = 'failed'
           state.error = action.error.message
        })

   }
})


export default fitoscanSlice.reducer

export const {
   selectAll: selectAllFitoscans,
   selectById: selectFitoscanById,
   selectIds: selectFitoscansIds
   // Pass in a selector that returns the posts slice of state
} = fitoscanAdapter.getSelectors(state => state.fitoscan)

export const selectFitoScansByResearchId = createSelector(
  [selectAllFitoscans, (state, researchId) => researchId],
  (fitoscans, researchId) => fitoscans.filter(fitoscan => fitoscan.properties.research_id === researchId)
)
