import { createSlice } from '@reduxjs/toolkit'

export const inputSlice = createSlice({
  name: 'input',
  initialState: {
    x: 0,
    y: 0,
  },
  reducers: {
    right: (state) => {
      state.x += state.x<99? 1 : 0
    },
    left: (state) => {
      state.x -= state.x>0? 1 : 0
    },
    up: (state) => {
      state.y -= state.y>0 ? 1 : 0
    },
    down: (state) => {
      state.y += state.y<99? 1 : 0
    },    
  },
})

// Action creators are generated for each case reducer function
export const { right, left, up, down} = inputSlice.actions

export default inputSlice.reducer