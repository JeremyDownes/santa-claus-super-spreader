import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import './Player.css';

import { left, right, up, down } from '../../features/player/playerslice'

function Player() {

const x = useSelector((state) => state.player.x)
const y = useSelector((state) => state.player.y)
const enemyX = useSelector((state) => state.enemy.x)
const enemyY = useSelector((state) => state.enemy.y)

if(x===enemyX&&y===enemyY){alert()}

const dispatch = useDispatch()

let xstring = x+'vh'
let ystring = y+'vh'

const keyDown = (e) => {
    if(e.keyCode===13){ console.log(e.keyCode) }
    if(e.keyCode===32){ console.log(e.keyCode) }
    if(e.keyCode===37){ dispatch(left()) }
    if(e.keyCode===39){ dispatch(right()) }  
    if(e.keyCode===38){ dispatch(up()) } //up
    if(e.keyCode===40){ dispatch(down()) }  //down
  }

const keyUp = (e) => {
    if(e.keyCode===13){ }
    if(e.keyCode===32){ }
    if(e.keyCode===39) {  }
    if(e.keyCode===37) {  }
    if(e.keyCode===38){ } //up
    if(e.keyCode===40){ }  //down
  }  


  return (
    <div id="player" style={{top: ystring, left: xstring}} >
        <input id="key-capture" autoFocus onKeyDown={(e)=>{keyDown(e)}} onKeyUp={(e)=>{keyUp(e)}} />
    </div>
        
  );
}

export default Player;
