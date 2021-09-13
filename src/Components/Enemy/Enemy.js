import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { moveX, up, down, modX } from '../../features/enemy/enemyslice'
import './Enemy.css';


function Enemy() {

const x = useSelector((state) => state.enemy.x)
const y = useSelector((state) => state.enemy.y)
const dispatch = useDispatch()
const [localState, setLocalState] = useState( useSelector((state) => state.enemy) )

let xstring = x+'vh'
let ystring = y+'vh'


useEffect(() => {
  if(x===100||x===-1) {
    dispatch(modX())
    dispatch(moveX())    
    return
  }
setTimeout(()=>{

    dispatch(moveX())
  },10)
   

})




  return (
    <div className='enemy' style={{top: ystring, left: xstring}} > </div>
        
  );
}

export default Enemy;
