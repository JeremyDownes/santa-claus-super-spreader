import { createSlice } from '@reduxjs/toolkit'
import { calculate2dRotation } from '../app/calculate2dRotation'
import { walls } from '../collections/walls'
import { obstacles } from '../collections/obstacles'

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    enemies: [{type: 'box', direction: [1,0], location: [0,0]},{type: 'box', direction: [1,0], location: [20,20]}],
    walls: walls,
    bullets: [],
    obstacles: obstacles,
    x: 20,
    y: 10,
    rotation: 0,
    test: ''
  },
  reducers: {
    doAct: (state, i) => {
      i.payload.forEach((action)=>{
        let id = null
        let direction = []
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
            direction = calculate2dRotation(state.rotation)
            if ( state.x + direction[0] > 100 || state.x + direction[0] < 0 ) { return }
            if ( state.y + direction[1] > 100 || state.y + direction[1] < 0 ) { return }
            state.x += direction[0]
            state.y += direction[1]
            walls.forEach((wall)=>{ 
              if(wall.location[0]===Math.floor(state.x)&&wall.location[1]===Math.floor(state.y)){
                state.x -= direction[0]
                state.y -= direction[1]
              }
            })
            obstacles.forEach((obstacle)=>{
              if( (Math.floor(state.x)>=obstacle.location[0]&&Math.floor(state.x)<=obstacle.location[0]+obstacle.width) && ( Math.floor(state.y)>=obstacle.location[1]&&Math.floor(state.y)<=obstacle.location[1]+obstacle.height) ){
                state.x -= direction[0]
                state.y -= direction[1]                
              }
            })
          break
          case 'input/down':
            direction = calculate2dRotation(state.rotation)
            if ( state.x - direction[0] > 100 || state.x - direction[0] < 0 ) { return }
            if ( state.y - direction[1] > 100 || state.y - direction[1] < 0 ) { return }
            state.x -= direction[0]
            state.y -= direction[1]
            walls.forEach((wall)=>{ 
              if(wall.location[0]===Math.floor(state.x)&&wall.location[1]===Math.floor(state.y)){
                state.x += direction[0]
                state.y += direction[1]
              } 
            })
            obstacles.forEach((obstacle)=>{
              if( (Math.floor(state.x)>=obstacle.location[0]&&Math.floor(state.x)<=obstacle.location[0]+obstacle.width) && ( Math.floor(state.y)>=obstacle.location[1]&&Math.floor(state.y)<=obstacle.location[1]+obstacle.height) ){
                state.x += direction[0]
                state.y += direction[1]                
              }
            })            
          break
          case 'input/left':
            direction = calculate2dRotation(state.rotation)
            if ( state.x - direction[1] > 100 || state.x - direction[1] < 0 ) { return }
            if ( state.y - direction[0] > 100 || state.y - direction[0] < 0 ) { return }
            state.x -= direction[1]
            state.y -= direction[0]
          break
          case 'input/right':
            direction = calculate2dRotation(state.rotation)
            if ( state.x + direction[1] > 100 || state.x + direction[1] < 0 ) { return }
            if ( state.y + direction[0] > 100 || state.y + direction[0] < 0 ) { return }
            state.x += direction[1]
            state.y += direction[0]
          break
          case 'input/shoot':
            state.bullets.push({direction: calculate2dRotation(state.rotation), location: [state.x,state.y], remove: false})
          break      
          case 'input/rotRight':
            state.rotation = state.rotation % 360 + 5
          break    
          case 'input/rotLeft':
            state.rotation = state.rotation % 360 - 5
            if (state.rotation === -5) {state.rotation=355}
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