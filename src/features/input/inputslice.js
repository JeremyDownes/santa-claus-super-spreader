import { createSlice } from '@reduxjs/toolkit'

export const inputSlice = createSlice({
  name: 'input',
  initialState: {
    x: 0,
    y: 0,
  },
  reducers: {
    right: (state) => {
    },
    left: (state) => {
    },
    up: (state) => {
    },
    down: (state) => {
    },
    shoot: () => {},
    rotLeft: () => {}, 
    rotRight: () => {}, 
  },
})

// Action creators are generated for each case reducer function
export const { right, left, up, down, shoot, rotLeft, rotRight} = inputSlice.actions

export default inputSlice.reducer