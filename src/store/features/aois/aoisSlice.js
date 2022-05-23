import {createSlice, createAsyncThunk, createEntityAdapter, createSelector} from "@reduxjs/toolkit";
import {GeoService} from "../../../services/GeoService";

const aoisAdapter = createEntityAdapter({
   sortComparer: (a, b) => b.id > a.id
})

const initialState = aoisAdapter.getInitialState({
   status: 'idle',
   error: null
})

export const fetchAoisByResearhId = createAsyncThunk('aois/fetchAoisByResearchId',
  async ({username, fieldId, researchId}) => {
     return await GeoService.fetchAOIs({username, fieldId, researchId})
  })

export const addAoi = createAsyncThunk('aois/addAoi',
  async ({username, fieldId, researchId, geom, area}) => {
     return await GeoService.createAOI({username, fieldId, researchId, geom, area})
  })

export const deleteAoi = createAsyncThunk('aois/deleteAoi',
  async ({username, fieldId, researchId, aoiId}) => {
     return await GeoService.deleteAOI({username, fieldId, researchId, aoiId})
  })

export const aoisSlice = createSlice({
   name: 'aois',
   initialState,
   extraReducers: builder => {
      builder
        .addCase(
          fetchAoisByResearhId.pending, (state, action) => {
             state.status = 'loading'
          }
        )
        .addCase(
          fetchAoisByResearhId.fulfilled, (state, action) => {
             state.status = 'complete'
             aoisAdapter.upsertMany(state, action.payload.features)
             // state.items = state.items.concat(action.payload.features)
          }
        )
        .addCase(
          fetchAoisByResearhId.rejected, (state, action) => {
             state.status = 'failed'
             state.error = action.error.message
          }
        )
        .addCase(addAoi.fulfilled, aoisAdapter.addOne)
        .addCase(deleteAoi.fulfilled, aoisAdapter.removeOne)
   }
})

export default aoisSlice.reducer

export const {
   selectAll: selectAllAois,
   selectById: selectAoiById,
   selectIds: selectAoiIds
   // Pass in a selector that returns the posts slice of state
} = aoisAdapter.getSelectors(state => state.aois)

// export const selectAoisByResearchId = (state, researchId) => {
//    Object.entries(state.aois.entites).forEach(aoi, {})
// }

export const selectAoisByResearchId = createSelector(
  [selectAllAois, (state, researchId) => researchId],
  (aois, researchId) => aois.filter(aoi => aoi.properties.research === researchId)
)
