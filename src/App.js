import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Input from './Components/Input/Input'
import Player from './Components/Player/Player'
import NPC from './Components/NPC/NPC'
import Bullet from './Components/Bullet/Bullet'
import Wall from './Components/Wall/Wall'
import Door from './Components/Door/Door'
import Exits from './Components/Exit/Exit'
import Obstacle from './Components/Obstacle/Obstacle'
import { doAct } from './features/appslice'
import './App.css';

function App() {
const dispatch = useDispatch()
const npcs = useSelector((state) => state.app.npcs)  
const bullets = useSelector((state) => state.app.bullets)  
const walls = useSelector((state) => state.app.walls)
const doors = useSelector((state) => state.app.doors)    
const exits = useSelector((state) => state.app.exits)    
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
        {walls.map((i)=><Wall key={key++} color={i.color} location={i.location} content={i.content}/>)}
        {doors.map((i)=><Door key={key++} location={i.location} rotation={i.rotation} state={i.state}/>)}
        {exits?exits.map((i)=><Exits key={key++} destination={i.destination} playerTo={i.playerTo} location={i.location} rotation={i.rotation} state={i.state} registerDispatch={registerDispatch}/>):null}
        {obstacles.map((i)=><Obstacle key={key++} type={i.type} height={i.height} width={i.width} location={i.location} />)}
        {bullets.map((i)=><Bullet key={key++} id={bid++} position={i.position} registerDispatch={registerDispatch}  />)}
        {npcs?npcs.map((i)=><NPC type={i.type} key={key++} id={eid++} registerDispatch={registerDispatch} />):null}
        <Player registerDispatch={registerDispatch}/>
      </div>
      <Input registerDispatch={registerDispatch} />
    </div>
  );
}

export default App;
