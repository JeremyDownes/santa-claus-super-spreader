import { createSlice } from '@reduxjs/toolkit'
export const appSlice = createSlice({
  name: 'app',
  initialState: {
    enemies: [{type: 'box', direction: [1,0], location: [0,0]},{tyoe: 'box', direction: [1,0], location: [20,20]}],
    bullets: [{direction: [0,-1], location: [50,90]}],
    x: 20,
    y: 10,
  },
  reducers: {
    doAct: (state, i) => {
      i.payload.forEach((action)=>{
        let id = null
        switch (action.type) {
          case 'enemy/move':
            id = action.payload.id
            state.enemies[id].location[0] += .25*state.enemies[id].direction[0]
            state.enemies[id].location[1] += .25*state.enemies[id].direction[1]
          break
          case 'enemy/modXY':
            id = action.payload.id
            state.enemies[id].direction = action.payload.direction
            state.enemies[id].location[0] += .25*state.enemies[id].direction[0]
            state.enemies[id].location[1] += .25*state.enemies[id].direction[1]
          break
          case 'input/up':
            state.y -= state.y>0 ? 1 : 0
          break
          case 'input/down':
            state.y += state.y<99? 1 : 0
          break
          case 'input/left':
            state.x -= state.x>0? 1 : 0
          break
          case 'input/right':
            state.x += state.x<99? 1 : 0
          break
        }
      })
    }
  },
})

// Action creators are generated for each case reducer function
export const { doAct } = appSlice.actions

export default appSlice.reducer