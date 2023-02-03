import { createSlice } from '@reduxjs/toolkit'

export const stadiumSlice = createSlice({
  name: 'stadium',
  initialState: {
    value: '', // TODO ten basic stadium
    toText: ''
  },
  reducers: {
    editStadium: (state, action) => {
      state.value = action.payload;
    },
    editStadiumText: (state, action) => {
      state.toText = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { editStadium, editStadiumText } = stadiumSlice.actions

export default stadiumSlice.reducer