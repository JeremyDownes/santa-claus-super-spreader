import { createSlice } from '@reduxjs/toolkit'
export const appSlice = createSlice({
  name: 'app',
  initialState: {
    enemies: [{type: 'box', direction: [1,0], location: [0,0]},{tyoe: 'box', direction: [1,0], location: [20,20]}],
    bullets: [],
    x: 20,
    y: 10,
    rotation: 0,
    test: ''
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
          case 'bullet/move':
            id = action.payload.id
            state.bullets[id].location[0] += 1*state.bullets[id].direction[0]
            state.bullets[id].location[1] += 1*state.bullets[id].direction[1]
          break 
          case 'bullet/die':
            id = action.payload.id
            state.bullets[id].direction = [0,0]
            state.bullets[id].location = [0,0]
            state.bullets[id].remove = true
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
          case 'input/shoot':
            let rot = state.rotation/5
            let x, y
            if (rot <= 18) {
                x=.05555*rot
                y=-1+Math.abs(x)
            }
            if (rot > 18 && rot <= 36) {
                y= .05555*(rot-18)

                x= 1-Math.abs(y)
            }
            if (rot > 36 && rot <= 54) {
                x=-.05555*(rot-36)
                y=1-Math.abs(x)
            }
            if (rot >= 54) {
                y=-.05555*(rot-54)
                x=-1+Math.abs(y)
            }
            console.log(x,y)
            console.log(rot)
            state.bullets.push({direction: [x,y], location: [state.x,state.y], remove: false})
          break      
          case 'input/rotRight':
            state.rotation = state.rotation % 360 + 5
          break    
          case 'input/rotLeft':
            state.rotation = state.rotation % 360 - 5
          break              
        }
      })
      state.bullets = state.bullets.filter((bullet)=>{return !bullet.remove})
    }
  },
})

// Action creators are generated for each case reducer function
export const { doAct } = appSlice.actions

export default appSlice.reducer