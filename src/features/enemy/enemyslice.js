import { createSlice } from '@reduxjs/toolkit'

export const enemySlice = createSlice({
  name: 'enemy',
  initialState: {
    enemies: [{type: 'box', direction: [1,0], location: [0,0]},{type: 'box', direction: [1,0], location: [20,20]}],
  },
  reducers: {

    move: (state, i) => {
      let id = i.payload.id
      state.enemies[id].location[0] += .25*state.enemies[id].direction[0]
      state.enemies[id].location[1] += .25*state.enemies[id].direction[1]
    },
    modXY: (state, i) => {
      let id = i.payload.id
      state.enemies[id].direction = i.payload.direction
      state.enemies[id].location[0] += .25*state.enemies[id].direction[0]
      state.enemies[id].location[1] += .25*state.enemies[id].direction[1]
    },  
  },
})

// Action creators are generated for each case reducer function
export const { move,modXY} = enemySlice.actions

export default enemySlice.reducer