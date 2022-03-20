import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {GeoService} from "../../../services/GeoService";

export const fetchFields = createAsyncThunk('fields/fetchFields', async (username) => {
   return await GeoService.fetchFields(username)
})

export const fieldsSlice = createSlice({
   name: 'fields',
   initialState: {
      items: [],
      status: 'idle',
      error: null
   },
   reducers: {
      fetch: (state, action) => {

      },
      add: (state, action) => {

      },
      remove: (state, action) => {

      },
      patch: (state, action) => {

      },
   },
   extraReducers: builder => {
      builder
        .addCase(fetchFields.pending, (state, action) => {
           state.status = 'loading'
        })
        .addCase(fetchFields.fulfilled, (state, action) => {
           const fields = action.payload.features
           state.status = 'complete'
           state.items = state.items.concat(fields)

        })
        .addCase(fetchFields.rejected, (state, action) => {
           state.status = 'failed'
           state.error = action.error.message
        })

   }
})

export const {fetch, add, remove, patch} = fieldsSlice.actions
export default fieldsSlice.reducer

export const selectAllFields = state => state.fields.items
export const selectFieldById = (state, fieldId) => state.fields.items.find(field => field.id === fieldId)

// export const selectFieldResearches = (state, fieldId) => {
//    const field = state.fields.items.find(field => field.id === fieldId)
//    return field.researches
// }
