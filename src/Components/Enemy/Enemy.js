import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import './Enemy.css';


function Enemy(props) {
const id = props.id
const x = useSelector((state) => state.app.enemies[id].location[0])
const y = useSelector((state) => state.app.enemies[id].location[1])
const player = useSelector((state) => state.app)
const bullets = useSelector((state) => state.app.bullets)
const walls = useSelector((state) => state.app.walls)
const obstacles = useSelector((state) => state.app.obstacles)
const rotation = useSelector((state) => state.app.enemies[id].rotation)
const location = useSelector((state) => state.app.enemies[id].location)

let xstring = x+'vh'
let ystring = y+'vh'
let z = Math.floor(y)
let color = 'red'

bullets.forEach((bullet,i)=>{
  if(bullet.location && (bullet.location[0]<=x+2 && bullet.location[0]>=x-2) && (bullet.location[1]<=y+2 && bullet.location[1]>=y-2) ) {
    color = 'green'
  }
})

 useEffect(() => {
  let turn
  walls.forEach((wall)=>{ 
  if(wall.location[0]===Math.floor(x)&&wall.location[1]===Math.floor(y)){
    props.registerDispatch({type:'enemy/modXY', payload: {id: id } })
    }
  })

  obstacles.forEach((obstacle)=>{
    if( (Math.floor(x)>=obstacle.location[0]&&Math.floor(x)<=obstacle.location[0]+obstacle.width) && ( Math.floor(y)>=obstacle.location[1]&&Math.floor(y)<=obstacle.location[1]+obstacle.height) ){
    props.registerDispatch({type:'enemy/modXY', payload: {id: id } })
    }
  })

  if(Math.floor(player.x)===location[0]&&Math.floor(player.y)===location[1]){
    props.registerDispatch({type:'enemy/modXY', payload: {id: id } })
  }

  if(x>=100||x<=-1) {
    props.registerDispatch({type:'enemy/modXY', payload: {id: id } })
  }

  if(y>=100||y<=-1) {
    props.registerDispatch({type:'enemy/modXY', payload: {id: id } })
  }  

  props.registerDispatch({type:'enemy/move', payload: {id: id} })
})

  return (
    <div className='enemy' style={{top: ystring, left: xstring, backgroundColor: color, zIndex: z, transform: 'rotateZ('+rotation+'deg)'}} > </div>
        
  );
}

export default Enemy;
