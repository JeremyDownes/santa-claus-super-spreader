import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import './Player.css';


function Player(props) {

const x = useSelector((state) => state.app.x)
const y = useSelector((state) => state.app.y)
const rot = useSelector((state) => state.app.rotation)

useEffect(()=>{
    
})
//if(x===enemyX&&y===enemyY){alert()}


let xstring = x+'vh'
let ystring = y+'vh'



  return (
    <div id="player"  >
        <div id='piece' style={{top: ystring, left: xstring, transform: 'translateX(-7vh) translateY(-6vh) rotateZ('+rot+'deg)', zIndex: Math.floor(y)}}></div>
    </div>
        
  );
}

export default Player;
