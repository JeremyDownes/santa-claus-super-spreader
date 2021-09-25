import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Input from './Components/Input/Input'
import Player from './Components/Player/Player'
import Enemy from './Components/Enemy/Enemy'
import Bullet from './Components/Bullet/Bullet'
import Wall from './Components/Wall/Wall'
import Obstacle from './Components/Obstacle/Obstacle'
import { doAct } from './features/appslice'
import logo from './logo.svg';
import './App.css';

function App() {
const dispatch = useDispatch()
const enemies = useSelector((state) => state.app.enemies)  
const bullets = useSelector((state) => state.app.bullets)  
const walls = useSelector((state) => state.app.walls)  
const obstacles = useSelector((state) => state.app.obstacles)  
let events = []
let eid = 0
let bid = 0
let key = 0

const registerDispatch = (newEvent)=>{
  events.push(newEvent)
}

useEffect(() => {

  const timer = setTimeout(()=>{
    dispatch(doAct(events))
  return () => clearTimeout(timer)
  },50)
})


  return (
    <div className="App"> 
      <div id = 'gameboard'>
        <Player />
        {walls.map((i)=><Wall key={key++} color={i.color} location={i.location} />)}
        {obstacles.map((i)=><Obstacle key={key++} type={i.type} height={i.height} width={i.width} location={i.location} />)}
        {bullets.map((i)=><Bullet key={key++} id={bid++} position={i.position} registerDispatch={registerDispatch}  />)}
        {enemies.map((i)=><Enemy type={i.type} key={key++} id={eid++} registerDispatch={registerDispatch} />)}
      </div>
      <Input registerDispatch={registerDispatch} />
    </div>
  );
}

export default App;
