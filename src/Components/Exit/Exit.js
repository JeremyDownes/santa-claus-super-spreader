import React, { useEffect } from 'react';
import { useSelector } from 'react-redux'
import './Exit.css';


function Exits(props) {

let location = props.location
const playerx = useSelector((state) => state.app.x)
const playery = useSelector((state) => state.app.y)

useEffect(()=>{
  let addX = props.state.includes('horizontal')?11:1
  let addY = props.state.includes('vertical')?11:1
  if((playerx>=location[0]-1&&playerx<=location[0]+addX)&&(playery>=location[1]-1&&playery<=location[1]+addY)) {
    props.registerDispatch({type:'loadRoom', payload: {destination: props.destination } })
  }
})

let x= location[0]+'vh'
let y= location[1]+'vh'
let z= location[1]+16


  return (
    <div className={"door "+props.state} style={{position: 'absolute', top: y, left: x, zIndex: z}} ></div>
        
  );
}

export default Exits;
