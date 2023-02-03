import { createSlice } from '@reduxjs/toolkit'

export const versionSlice = createSlice({
  name: 'version',
  initialState: {
    version: '3.0.0',
    year: '2022'
  },
  reducers: {
    setVersion: (state, action) => {
      state.version = action.payload.version;
      state.year = action.payload.year;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setVersion } = versionSlice.actions

export default versionSlice.reducer