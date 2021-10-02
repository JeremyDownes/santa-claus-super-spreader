import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import './Enemy.css';
import {calculate2dRotation} from '../../app/calculate2dRotation'
import { isWallBetween } from '../../app/isWallBetween'

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
const color = useSelector((state) => state.app.enemies[id].color)
const viralLoad = useSelector((state) => state.app.enemies[id].viralLoad)
const enemies = useSelector((state) => state.app.enemies)


const calculateFOV = ()=>{
  let fov = calculate2dRotation(rotation)
  if(isWallBetween(walls,[x,y],[player.x,player.y])) {return}
  let field = []
  let inX, inY
  if(fov[0]>=0) {
    if (player.x>=location[0]&&player.x<=location[0]+30*(fov[0]+fov[0]*.45)) {inX=true} 
    if (player.x>=location[0]&&player.x<=location[0]+30*(fov[0]-fov[0]*.45)) {inX=true}       
  }
  if(fov[0]<0) {
    if (player.x<=location[0]&&player.x>=location[0]+30*(fov[0]+fov[0]*.45)) {inX=true} 
    if (player.x<=location[0]&&player.x>=location[0]+30*(fov[0]-fov[0]*.45)) {inX=true} 
  }
  if(fov[1]>=0) {
    if (player.y>=location[1]&&player.y<=location[1]+30*(fov[1]+fov[1]*.45)) {inY=true} 
    if (player.y>=location[1]&&player.y<=location[1]+30*(fov[1]-fov[1]*.45)) {inY=true} 
  }
  if(fov[1]<0) {
    if (player.y<=location[1]&&player.y>=location[1]+30*(fov[1]+fov[1]*.45)) {inY=true} 
    if (player.y<=location[1]&&player.y>=location[1]+30*(fov[1]-fov[1]*.45)) {inY=true} 
  }
  if(inX&&inY) {
    props.registerDispatch({type:'enemy/green', payload: {id: id } })
  }
}

const infect = ()=>{
  if((player.x>x-15&&player.x<x+15)&&(player.y>y-12&&player.y<y+12)){props.registerDispatch({type:'enemy/infect', payload: {id: id } })}
}


let xstring = x+'vh'
let ystring = y+'vh'
let z = Math.floor(y)

bullets.forEach((bullet,i)=>{
  if(bullet.location && (bullet.location[0]<=x+2 && bullet.location[0]>=x-2) && (bullet.location[1]<=y+2 && bullet.location[1]>=y-2) ) {
    props.registerDispatch({type:'enemy/green', payload: {id: id } })
  }
})

  enemies.forEach((enemy,i)=>{
    if(i!=id&&(enemy.location[0]>x-15&&enemy.location[0]<x+15)&&(enemy.location[1]>y-12&&enemy.location[1]<y+12)){props.registerDispatch({type:'co/infect', payload: {id: i, myId: id } })}    
  })


 useEffect(() => {
  calculateFOV()
  infect()
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
    <div className='enemy' style={{top: ystring, left: xstring, backgroundColor: color, zIndex: z, transform: 'rotateZ('+rotation+'deg)'}} > {viralLoad} </div>
        
  );
}

export default Enemy;
