import {createSlice, createAsyncThunk, createEntityAdapter} from "@reduxjs/toolkit";
import {GeoService} from "../../../services/GeoService";

const fieldsAdapter = createEntityAdapter({
   sortComparer: (a, b) => b.id > a.id
})

const initialState = fieldsAdapter.getInitialState({
   status: 'idle',
   error: null
})

export const fetchFields = createAsyncThunk('fields/fetchFields', async (username) => {
   return await GeoService.fetchFields(username)
})

export const fieldsSlice = createSlice({
   name: 'fields',
   initialState,
   reducers: {},
   extraReducers: builder => {
      builder
        .addCase(fetchFields.pending, (state, action) => {
           state.status = 'loading'
        })
        .addCase(fetchFields.fulfilled, (state, action) => {
           const fields = action.payload.features
           state.status = 'complete'
           fieldsAdapter.upsertMany(state, fields)

        })
        .addCase(fetchFields.rejected, (state, action) => {
           state.status = 'failed'
           state.error = action.error.message
        })

   }
})

export default fieldsSlice.reducer

export const {
   selectAll: selectAllFields,
   selectById: selectFieldById,
   selectIds: selectFieldsIds
   // Pass in a selector that returns the posts slice of state
} = fieldsAdapter.getSelectors(state => state.fields)
