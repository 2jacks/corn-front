import {createSlice} from "@reduxjs/toolkit";

export const userSlice = createSlice({
   name: 'user',
   initialState: {username: '', refresh_token: '', access_token: ''},
   reducers: {
      userFetched: (state, action) => {
         const {username, refresh, access} = action.payload
         state.username = username
         state.refresh = refresh
         state.access = access
      },
      userPatched: (state, action) => {

      },
   }
})

export const {userFetched, userPatched} = userSlice.actions
export default userSlice.reducer
