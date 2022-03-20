import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {GeoService} from "../../../services/GeoService";
import {fetchFields} from "../fields/fieldsSlice";

export const fetchResearches = createAsyncThunk('fields/fetchResearches', async ({username, fieldId}) => {
   return await GeoService.fetchFieldResearches(username, fieldId)
})

const researchesSlice = createSlice({
   name: 'researches',
   initialState: {
      items: [],
      error: null,
      status: 'idle'
   },
   reducers: {},
   extraReducers: builder => {
      builder
        .addCase(fetchResearches.pending, (state, action) => {
           state.status = 'loading'
        })
        .addCase(fetchResearches.fulfilled, (state, action) => {
           console.log(action.payload)
           state.items = state.items.concat(action.payload)
           state.status = 'complete'
        })
        .addCase(fetchResearches.rejected, (state, action) => {
           state.status = 'failed'
           state.error = action.error.message
        })

   }

})

export default researchesSlice.reducer


export const selectFieldResearches = (state, fieldId) => {
   let res = state.researches.items.filter(research => research.field_id === fieldId)
   return res
}
