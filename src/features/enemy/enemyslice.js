import { createSlice } from '@reduxjs/toolkit'

export const enemySlice = createSlice({
  name: 'enemy',
  initialState: {
    x: 0,
    y: 0,
    xMod: 1,
  },
  reducers: {

    moveX: (state) => {
      state.x += .25*state.xMod
    },
    up: (state) => {
      state.y -= 1
    },
    down: (state) => {
      state.y += 1
    },  
    modX: (state) => {
      state.xMod *= -1
    },  
  },
})

// Action creators are generated for each case reducer function
export const { moveX, up, down, modX} = enemySlice.actions

export default enemySlice.reducer