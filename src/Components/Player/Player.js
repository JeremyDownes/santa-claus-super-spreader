import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import './Player.css';


function Player(props) {

const x = useSelector((state) => state.app.x)
const y = useSelector((state) => state.app.y)

useEffect(()=>{
    
})
//if(x===enemyX&&y===enemyY){alert()}


let xstring = x+'vh'
let ystring = y+'vh'



  return (
    <div id="player"  >
        <div id='piece' style={{top: ystring, left: xstring}}></div>
    </div>
        
  );
}

export default Player;
