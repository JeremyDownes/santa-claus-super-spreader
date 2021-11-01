import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import './NPC.css';
import {calculate2dRotation} from '../../app/calculate2dRotation'
import {rotateTo} from '../../app/rotateTo'
import { isWallBetween } from '../../app/isWallBetween'

function NPC(props) {
const id = props.id
const x = useSelector((state) => state.app.npcs[state.app.room][id].location[0])
const y = useSelector((state) => state.app.npcs[state.app.room][id].location[1])
const player = useSelector((state) => state.app)
const bullets = useSelector((state) => state.app.bullets)
const walls = useSelector((state) => state.app.walls)
const obstacles = useSelector((state) => state.app.obstacles)
const rotation = useSelector((state) => state.app.npcs[state.app.room][id].rotation)
const location = useSelector((state) => state.app.npcs[state.app.room][id].location)
const color = useSelector((state) => state.app.npcs[state.app.room][id].color)
const viralLoad = useSelector((state) => state.app.npcs[state.app.room][id].viralLoad)
const npcs = useSelector((state) => state.app.npcs[state.app.room])
let steps = useSelector((state) => state.app.npcs[state.app.room][id].steps)
let step = useSelector((state) => state.app.npcs[state.app.room][id].step)

const calculateFOV = ()=>{
  if(isWallBetween(walls,[x,y],[player.x,player.y])) {return}
  if(Math.abs(player.x - x) > 25 || Math.abs(player.y - y) > 25) {return}
  let rotate2 = Math.floor( rotateTo(location, [player.x,player.y]) )
  if ( rotation - 30 < 0 ) {
    if((rotate2 >= 360 - (30-rotation)) || rotate2 <= rotation+30 ) { props.registerDispatch({type:'npc/seen', payload: {id: id } }) }
  }
  else if ( rotation + 30 > 359 ) {
    if((rotate2 < (30+rotation) - 360) || (rotate2 > rotation-30)) { props.registerDispatch({type:'npc/seen', payload: {id: id } }) }
  }
  else if ( rotate2 > rotation - 30 && rotate2 < rotation + 30 )  { props.registerDispatch({type:'npc/seen', payload: {id: id } }) }
}

const infect = ()=>{
  if((player.x>x-15&&player.x<x+15)&&(player.y>y-12&&player.y<y+12)){props.registerDispatch({type:'npc/infect', payload: {id: id } })}
  npcs.forEach((npc,i)=>{
    if(i!==id&&(npc.location[0]>x-15&&npc.location[0]<x+15)&&(npc.location[1]>y-12&&npc.location[1]<y+12)){props.registerDispatch({type:'co/infect', payload: {id: i, myId: id } })}    
  })
}

let xstring = x+'vh'
let ystring = y+'vh'
let z = Math.floor(y)

bullets.forEach((bullet,i)=>{
  if(bullet.location && (bullet.location[0]<=x+2 && bullet.location[0]>=x-2) && (bullet.location[1]<=y+2 && bullet.location[1]>=y-2) ) {
    props.registerDispatch({type:'npc/green', payload: {id: id } })
  }
})

 useEffect(() => {
  calculateFOV()
  infect()

  if(steps&&steps[step]) {
    props.registerDispatch({type:'npc/'+steps[step].verb, payload: {id: id, step: steps[step]} })
  } 
  else { 


    walls.forEach((wall)=>{ 
    if(wall.location[0]===Math.floor(x)+Math.round(calculate2dRotation(rotation)[0])&&wall.location[1]+9===Math.floor(y)+Math.round(calculate2dRotation(rotation)[1])){
      props.registerDispatch({type:'npc/modXY', payload: {id: id } })
      }
    })

    obstacles.forEach((obstacle)=>{
      if( (Math.floor(x)+Math.round(calculate2dRotation(rotation)[0])>=obstacle.location[0]&&Math.floor(x)+Math.round(calculate2dRotation(rotation)[0])<=obstacle.location[0]+obstacle.width) && ( Math.floor(y)+Math.round(calculate2dRotation(rotation)[1])>=obstacle.location[1]&&Math.floor(y)+Math.round(calculate2dRotation(rotation)[1])<=obstacle.location[1]+obstacle.height) ){
      props.registerDispatch({type:'npc/modXY', payload: {id: id } })
      }
    })

    if(Math.floor(player.x)===location[0]&&Math.floor(player.y)===location[1]){
      props.registerDispatch({type:'npc/modXY', payload: {id: id } })
    }

    if(x>=99||x<=-1) {
      props.registerDispatch({type:'npc/modXY', payload: {id: id } })
    }

    if(y>=98||y<=1) {
      props.registerDispatch({type:'npc/modXY', payload: {id: id } })
    }  
    props.registerDispatch({type:'npc/move', payload: {id: id} }) 
  }

})

  return (
    <div className='npc' style={{top: ystring, left: xstring, backgroundColor: color, zIndex: z, transform: 'rotateZ('+rotation+'deg)'}} > Viral Load: {viralLoad} </div>
  );
}

export default NPC;
