import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import './Enemy.css';


function Enemy(props) {
const id = props.id
const x = useSelector((state) => state.app.enemies[id].location[0])
const y = useSelector((state) => state.app.enemies[id].location[1])
const player = useSelector((state) => state.app)
const bullets = useSelector((state) => state.app.bullets)
const direction = useSelector((state) => state.app.enemies[id].direction)
const location = useSelector((state) => state.app.enemies[id].location)

let xstring = x+'vh'
let ystring = y+'vh'
let color = 'red'

bullets.forEach((bullet,i)=>{
  if(bullet.location && (bullet.location[0]<=x+2 && bullet.location[0]>=x-2) && (bullet.location[1]<=y+2 && bullet.location[1]>=y-2) ) {
    color = 'green'
  }
})

useEffect(() => {
  if(player.x===location[0]&&player.y===location[1]){
    props.registerDispatch({type:'enemy/modXY', payload: {id: id, direction: [direction[0]*-1, direction[1]] } })
  }
  if(x===100||x===-1) {
    props.registerDispatch({type:'enemy/modXY', payload: {id: id, direction: [direction[0]*-1, direction[1]] } })
  }
  if(y===100||y===-1) {
    props.registerDispatch({type:'enemy/modXY', payload: {id: id, direction: [direction[0], direction[1]*-1] } })
  }  
  props.registerDispatch({type:'enemy/move', payload: {id: id} })
})

  return (
    <div className='enemy' style={{top: ystring, left: xstring, backgroundColor: color}} > </div>
        
  );
}

export default Enemy;
