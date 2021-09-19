import { createSlice } from '@reduxjs/toolkit'

export const bulletSlice = createSlice({
  name: 'bullet',
  initialState: {
    bullets: [{direction: [0,-1], location: [50,90]}],
  },
  reducers: {
    
    shoot: (state, i) => {
      state.bullets.push(i.payload)
    },

    move: (state, i) => {
      let id = i.payload.id
      console.log(i)
      state.bullets[id].location[0] += .25*state.bullets[id].direction[0]
      state.bullets[id].location[1] += .25*state.bullets[id].direction[1]
    },
    modXY: (state, i) => {
      let id = i.payload.id
      state.bullets[id].direction = i.payload.direction
      state.bullets[id].location[0] += .25*state.bullets[id].direction[0]
      state.bullets[id].location[1] += .25*state.bullets[id].direction[1]
    },  
  },
})

// Action creators are generated for each case reducer function
export const { move,modXY} = bulletSlice.actions

export default bulletSlice.reducer