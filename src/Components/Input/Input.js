import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import './Input.css';

import { left, right, up, down, shoot, rotLeft, rotRight } from '../../features/input/inputslice'

function Input(props) {

    const [dispatches,setDispatches] = useState([])
    let dispatchesCopy

useEffect(()=>{
    dispatches.forEach((dispatch)=>{
        props.registerDispatch(dispatch)
    })

})


const keyDown = (e) => {
    dispatchesCopy=dispatches.slice()
    if(e.keyCode===37){  
        dispatchesCopy = dispatchesCopy.filter((c)=>{return c.type!=='input/rotRight'})
        dispatchesCopy = dispatchesCopy.filter((c)=>{return c.type!=='input/rotLeft'})
        dispatchesCopy.push(rotLeft())
    }
    if(e.keyCode===39){
        dispatchesCopy = dispatchesCopy.filter((c)=>{return c.type!=='input/rotLeft'})
        dispatchesCopy = dispatchesCopy.filter((c)=>{return c.type!=='input/rotRight'})
        dispatchesCopy.push(rotRight())
    }
    //if(e.keyCode===13){ console.log(e.keyCode) }
    if(e.keyCode===32){ 
        dispatchesCopy = dispatchesCopy.filter((c)=>{return c.type!=='input/shoot'})
        dispatchesCopy.push(shoot())
    }
    //if(e.keyCode===37&&e.ctrlKey){ props.registerDispatch(left()); return }
    //if(e.keyCode===39&&e.ctrlKey){ props.registerDispatch(right()); return }  
    if(e.keyCode===38){
        dispatchesCopy = dispatchesCopy.filter((c)=>{return c.type!=='input/up'})
        dispatchesCopy = dispatchesCopy.filter((c)=>{return c.type!=='input/down'})
        dispatchesCopy = dispatchesCopy.filter((c)=>{return c.type!=='input/animatePlayer'})        
        dispatchesCopy.push(up()) 
        dispatchesCopy.push({type: 'input/animatePlayer', payload: true})
    } //up
    if(e.keyCode===40){ 
        dispatchesCopy = dispatchesCopy.filter((c)=>{return c.type!=='input/up'})
        dispatchesCopy = dispatchesCopy.filter((c)=>{return c.type!=='input/down'})
        dispatchesCopy = dispatchesCopy.filter((c)=>{return c.type!=='input/animatePlayer'})      
        dispatchesCopy.push(down()) 
        dispatchesCopy.push({type: 'input/animatePlayer', payload: true})
    }  //down
    setDispatches(dispatchesCopy);
  }

const keyUp = (e) => {
    dispatchesCopy=dispatches.slice()
    dispatchesCopy = dispatchesCopy.filter((c)=>{return c.type!=='input/animatePlayer'}) 
    if(e.keyCode===13){ }
    if(e.keyCode===32){ dispatchesCopy = dispatchesCopy.filter((c)=>{return c.type!=='input/shoot'}) }
    if(e.keyCode===39) { dispatchesCopy = dispatchesCopy.filter((c)=>{return c.type!=='input/rotRight'}) }
    if(e.keyCode===37) { dispatchesCopy = dispatchesCopy.filter((c)=>{return c.type!=='input/rotLeft'}) }
    if(e.keyCode===38){ dispatchesCopy = dispatchesCopy.filter((c)=>{return c.type!=='input/up'}) } //up
    if(e.keyCode===40){ dispatchesCopy = dispatchesCopy.filter((c)=>{return c.type!=='input/down'}) }  //down
    if(dispatchesCopy.length===0) { dispatchesCopy.push({type: 'input/animatePlayer', payload: false})}
    setDispatches(dispatchesCopy);        
  }  


  return (
    <input id="key-capture" autoFocus onKeyDown={(e)=>{keyDown(e)}} onKeyUp={(e)=>{keyUp(e)}} />
  );
}

export default Input;
