import { createSlice } from '@reduxjs/toolkit'
import { calculate2dRotation } from '../app/calculate2dRotation'
import { isWallBetween } from '../app/isWallBetween'
import { walls } from '../collections/walls'
import { obstacles } from '../collections/obstacles'

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    enemies: [{type: 'box', startLocation: [10,10], location: [10,10], rotation: 180, color: 'red', viralLoad: 100},{type: 'box', startLocation: [20,20], location: [10,40], rotation: 0, color: 'red', viralLoad: 0}],
    walls: walls,
    bullets: [],
    obstacles: obstacles,
    x: 50,
    y: 10,
    rotation: 0,
    test: '',
    isMoving: false,
    viralLoad: 0
  },
  reducers: {
    doAct: (state, i) => {
      //enemy state reset
      state.enemies.forEach((enemy)=>{
        enemy.color='red'
        if(enemy.viralLoad>0){enemy.viralLoad-=.01}else{enemy.viralLoad=0}
        enemy.viralLoad = Math.round(enemy.viralLoad*100)/100
      })
      // tick down virus
      if(state.viralLoad>0){state.viralLoad-=.03}else{state.viralLoad=0}
      state.viralLoad = Math.round(state.viralLoad*100)/100

      let playerHasMoved = false
      i.payload.forEach((action)=>{
        let id = null
        let direction = []
        let eDirection
        switch (action.type) {
          case 'enemy/green':
            id = action.payload.id
            state.enemies[id].color='green'
          break
          case 'enemy/infect':
            id = action.payload.id
            if(isWallBetween(state.walls,state.enemies[id].location,[state.x,state.y])) {return}
            state.viralLoad+=state.enemies[id].viralLoad*.01
            state.enemies[id].color='yellow'
          break          
          case 'enemy/move':
            id = action.payload.id
            eDirection = calculate2dRotation(state.enemies[id].rotation)
            state.enemies[id].location[0] += .25*eDirection[0]
            state.enemies[id].location[1] += .25*eDirection[1]
            if(state.enemies[id].location[1]<-1||state.enemies[id].location[0]<-1 || state.enemies[id].location[1]>100 || state.enemies[id].location[0]>100 ) { state.enemies[id].location = state.enemies[id].startLocation }
          break
          case 'enemy/modXY':
            id = action.payload.id
            let rando = Math.random()*33
            let sign = Math.random() < 0.5 ? -1 : 1;
            rando *= sign
            state.enemies[id].rotation += 180
            state.enemies[id].rotation += rando
            state.enemies[id].rotation %= 360
            eDirection = calculate2dRotation(state.enemies[id].rotation)
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
            if(playerHasMoved){return}
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
            playerHasMoved=true
          break
          case 'input/down':
            if(playerHasMoved){return}
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
            playerHasMoved=true
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
          case 'input/animatePlayer':
            state.isMoving=action.payload
          break
          case 'player/infect':
            id = action.payload.id
            if(isWallBetween(state.walls,state.enemies[id].location,[state.x,state.y])) {return}
            state.enemies[id].viralLoad+=state.viralLoad*.001
            state.enemies[id].viralLoad=(state.enemies[id].viralLoad*1000)/1000
          break   
          case 'co/infect':
            id = action.payload.id
            let myId = action.payload.myId
            let multiplier = state.enemies[myId].viralLoad
            if(isWallBetween(state.walls,state.enemies[id].location,state.enemies[myId].location)) {return}
            state.enemies[id].viralLoad+=multiplier*.001
            state.enemies[id].viralLoad=(state.enemies[id].viralLoad*1000)/1000
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