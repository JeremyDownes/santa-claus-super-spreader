import { createSlice } from '@reduxjs/toolkit'
import { calculate2dRotation } from '../app/calculate2dRotation'
import { rotateTo } from '../app/rotateTo'
import { openDoor } from '../app/openDoor'
import { isWallBetween } from '../app/isWallBetween'
import { walls } from '../collections/walls'
import { obstacles } from '../collections/obstacles'
import { doors } from '../collections/doors'
import { exits } from '../collections/exits'
import { npcs } from '../collections/npcs'

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    npcs: npcs,
    walls: walls[0],
    doors: doors[0],
    exits: exits[0],
    closeDoor: 0,
    bullets: [],
    obstacles: obstacles[0],
    spawn: {room: 0, location: [50,15]},
    x: 50,
    y: 15,
    rotation: 180,
    destination: null,
    test: '',
    isMoving: false,
    viralLoad: 0,
    packageDelivered: false,
    loadingRoom: false,
    room: 0,
    seen: false
  },
  reducers: {
    doAct: (state, i) => {
      if(state.destination) {
        if(Math.round(state.x)!==state.destination[0]||Math.round(state.y)!==state.destination[1]){
          state.rotation = rotateTo([Math.round(state.x),Math.round(state.y)], state.destination)
          i.payload.push({type:'input/up', payload: null})
          i.payload.push({type:'input/animatePlayer', payload: true})
        } else {
          state.destination=null
          i.payload.push({type:'input/animatePlayer', payload: false})
        }
      } 
      //npc state reset

      state.npcs[state.room].forEach((npc)=>{
        npc.color='red'
        if(npc.viralLoad>0){npc.viralLoad-=.01}else{npc.viralLoad=0}
        npc.viralLoad = Math.round(npc.viralLoad*100)/100
        if(npc.timer>1) {npc.timer--}
        if(npc.timer===1){
          npc.step++
          npc.timer--
        }
        if(npc.steps&&npc.step===npc.steps.length){npc.step=0}
      })
      
      // tick down virus
      if(state.viralLoad>0){state.viralLoad-=.03}else{state.viralLoad=0}
      state.viralLoad = Math.round(state.viralLoad*100)/100
      // close door timer
      if(state.closeDoor>0) {state.closeDoor--}else{
        state.doors.forEach((door,i)=>{
          state.doors[i].state = door.state.replace('open-90','closed').replace('open90','closed')
          state.doors[i].rotation = state.doors[i].state.includes('vertical')? 90 : 0
        })
      }

      let playerHasMoved = false
      i.payload.forEach((action)=>{
        let id = null
        let direction = []
        let eDirection
        if(!state.seen) {
        switch (action.type) {
            case 'loadRoom':
            state.walls = walls[action.payload.destination]
            state.obstacles = obstacles[action.payload.destination]
            state.doors = doors[action.payload.destination]
            state.exits = exits[action.payload.destination]
            state.x = action.payload.playerTo[0]
            state.y = action.payload.playerTo[1]
            state.loadingRoom = action.payload.destination
            state.room = action.payload.destination
            return
          break
          case 'npc/green':
            id = action.payload.id
            state.npcs[state.room][id].color ='green'
          break
          case 'npc/seen':
            state.room = state.spawn.room
            state.x = state.spawn.location[0]
            state.y = state.spawn.location[1]
            state.npcs = npcs
            state.destination = null
            state.isMoving = false
            state.seen = true
          break          
          case 'npc/wait':
            id = action.payload.id
            if(state.npcs[state.room][id].timer === 0) { state.npcs[state.room][id].timer = action.payload.step.length }
          break          
          case 'npc/goto':
            id = action.payload.id
            let destination = action.payload.step.destination
            let location = [Math.round(state.npcs[state.room][id].location[0]),Math.round(state.npcs[state.room][id].location[1])]
            state.npcs[state.room][id].timer=0
            state.npcs[state.room][id].rotation = rotateTo(state.npcs[state.room][id].location,action.payload.step.destination)
            eDirection = calculate2dRotation(state.npcs[state.room][id].rotation)
            state.npcs[state.room][id].location[0] += .25*eDirection[0]
            state.npcs[state.room][id].location[1] += .25*eDirection[1]
            if( location[0] === destination[0] && location[1] === destination[1] ) { state.npcs[state.room][id].step++ }
          break
          case 'npc/infect':
            id = action.payload.id
            if(isWallBetween(state.walls,state.npcs[state.room][id].location,[state.x,state.y])) {return}
            state.viralLoad+=state.npcs[state.room][id].viralLoad*.005
            state.npcs[state.room][id].color ='yellow'
          break          
          case 'npc/move':
            id = action.payload.id
            eDirection = calculate2dRotation(state.npcs[state.room][id].rotation)
            state.npcs[state.room][id].location[0] += .25*eDirection[0]
            state.npcs[state.room][id].location[1] += .25*eDirection[1]
            if(state.npcs[state.room][id].location[1]<-1||state.npcs[state.room][id].location[0]<-1 || state.npcs[state.room][id].location[1]>100 || state.npcs[state.room][id].location[0]>100 ) { state.npcs[state.room][id].location = state.npcs[state.room][id].startLocation }
          break
          case 'npc/modXY':
            id = action.payload.id
            let rando = Math.random()*33
            let sign = Math.random() < 0.5 ? -1 : 1;
            rando *= sign
            state.npcs[state.room][id].rotation += 180
            state.npcs[state.room][id].rotation += rando
            state.npcs[state.room][id].rotation %= 360
            eDirection = calculate2dRotation(state.npcs[state.room][id].rotation)
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
            state.walls.forEach((wall)=>{ 
              if(wall.location[0]===Math.floor(state.x)&&wall.location[1]+10===Math.floor(state.y)){
                state.x -= direction[0]
                state.y -= direction[1]
                state.destination=null          
                state.isMoving=false                                
              }
            })
            state.doors.forEach((door,i)=>{
            let dimension  
            let rotation
              if(door.rotation===0) {dimension=[11,0]} else {dimension=[0,11]}
              if(door.location[0]<=Math.round(state.x)&&door.location[0]+dimension[0]>=Math.round(state.x)&&door.location[1]<=Math.round(state.y)&&door.location[1]+dimension[1]>=Math.round(state.y)){
                if(!door.state.includes('locked')) {
                  if(state.rotation>0&&state.rotation<180&&door.rotation===90){rotation=90}
                  if(state.rotation>180&&state.rotation<360&&door.rotation===90){rotation=-90}
                  if(state.rotation>90&&state.rotation<270&&door.rotation===0){rotation=90}
                  if((state.rotation>270||state.rotation<90)&&door.rotation===0){rotation=-90}
                  state.doors[i].rotation+=rotation
                  state.doors[i].state=door.state.replace('closed','open'+rotation)
                  state.closeDoor = 10
                } else {
                  state.x -= direction[0]
                  state.y -= direction[1]
                  state.destination=null          
                  state.isMoving=false
                }
              }
            })


            // let isOpenDoor = openDoor([state.x,state.y],state.rotation)
            // console.log(openDoor([state.x,state.y],state.rotation))
            // if(isOpenDoor) {
            //   state.doors[isOpenDoor.index].rotation+=isOpenDoor.rotation
            //   state.doors[isOpenDoor.index].state=state.doors[isOpenDoor.index].state.replace('closed','open'+isOpenDoor.rotation)
            //   state.closeDoor = 10
            // } 
            
            state.obstacles.forEach((obstacle,i)=>{
              if( (Math.floor(state.x)>=obstacle.location[0]&&Math.floor(state.x)<=obstacle.location[0]+obstacle.width) && ( Math.floor(state.y)>=obstacle.location[1]+(obstacle.yOffset?obstacle.yOffset:0)&&Math.floor(state.y)<=obstacle.location[1]+obstacle.height) ){
                if(obstacle.type==='christmas-tree'){
                  state.obstacles[i].type='christmas-tree-gifted'
                  state.packageDelivered=true
                }
                if(obstacle.type==='fireplace'&&state.packageDelivered){
                  alert('You Win!')
                  window.location.reload()
                }                
                state.x -= direction[0]
                state.y -= direction[1]      
                state.destination=null          
                state.isMoving=false
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
            state.walls.forEach((wall)=>{ 
              if(wall.location[0]===Math.floor(state.x)&&wall.location[1]+10===Math.floor(state.y)){
                state.x += direction[0]
                state.y += direction[1]
              } 
            })
            state.obstacles.forEach((obstacle)=>{
              if( (Math.floor(state.x)>=obstacle.location[0]&&Math.floor(state.x)<=obstacle.location[0]+obstacle.width) && ( Math.floor(state.y)>=obstacle.location[1]+(obstacle.yOffset?obstacle.yOffset:0)&&Math.floor(state.y)<=obstacle.location[1]+obstacle.height) ){
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
          case 'input/goto':
            state.destination = action.payload        
            state.rotation = rotateTo([Math.round(state.x),Math.round(state.y)], action.payload)
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
            if(isWallBetween(state.walls,state.npcs[state.room][id].location,[state.x,state.y])) {return}
            state.npcs[state.room][id].viralLoad+=state.viralLoad*.001
            state.npcs[state.room][id].viralLoad=(state.npcs[state.room][id].viralLoad*1000)/1000
          break   
          case 'co/infect':
            id = action.payload.id
            let myId = action.payload.myId
            let multiplier = state.npcs[state.room][myId].viralLoad
            if(isWallBetween(state.walls,state.npcs[state.room][id].location,state.npcs[state.room][myId].location)) {return}
            state.npcs[state.room][id].viralLoad+=multiplier*.001
            state.npcs[state.room][id].viralLoad=(state.npcs[state.room][id].viralLoad*1000)/1000
          break          
        }
      } 
      })
      if(state.seen) {
        state.seen = false
        state.walls = walls[state.room]
        state.doors = doors[state.room]
        state.exits = exits[state.room]
        state.obstacles = obstacles[state.room]
        state.loadingRoom = state.room
      }
      state.bullets = state.bullets.filter((bullet)=>{return !bullet.remove})
    }
  },
})

// Action creators are generated for each case reducer function
export const { doAct } = appSlice.actions

export default appSlice.reducer