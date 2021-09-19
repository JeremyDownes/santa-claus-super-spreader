import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import './Bullet.css';


function Bullet(props) {
const id = props.id
const x = useSelector((state) => state.app.bullets[id].location[0])
const y = useSelector((state) => state.app.bullets[id].location[1])
const player = useSelector((state) => state.player)
const direction = useSelector((state) => state.app.bullets[id].direction)
const location = useSelector((state) => state.app.bullets[id].location)
const dispatch = useDispatch()

let xstring = x+'vh'
let ystring = y+'vh'


useEffect(() => {
  if(x===-0||x===100||y===0||y===100) {
    props.registerDispatch({type:'bullet/die', payload: {id: id} })    
    return
  }

  props.registerDispatch({type:'bullet/move', payload: {id: id} })
  // if(player.x===location[0]&&player.y===location[1]){
  //   dispatch({type:'bullet/modXY', payload: {id: id, direction: [direction[0]*-1, direction[1]] } })
  // }
  // if(x===100||x===-1) {
  //   dispatch({type:'bullet/modXY', payload: {id: id, direction: [direction[0]*-1, direction[1]] } })
    
  // }  

  // const btimer = setTimeout(()=>{
  // console.log('hi')
    
  //   dispatch({type:'bullet/move', payload: {id: id} })
  // },9)
  // return () => clearTimeout(btimer)

})




  return (
    <div className='bullet' style={{top: ystring, left: xstring}} id={id}> </div>
        
  );
}

export default Bullet;
