import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import './Input.css';

import { left, right, up, down, shoot, rotLeft, rotRight } from '../../features/input/inputslice'

function Input(props) {


const keyDown = (e) => {
    if(e.keyCode===37&&e.ctrlKey){ props.registerDispatch(rotLeft()); return }
    if(e.keyCode===39&&e.ctrlKey){ props.registerDispatch(rotRight()); return }
    if(e.keyCode===13){ console.log(e.keyCode) }
    if(e.keyCode===32){ props.registerDispatch(shoot()) }
    if(e.keyCode===37){ props.registerDispatch(left()) }
    if(e.keyCode===39){ props.registerDispatch(right()) }  
    if(e.keyCode===38){ props.registerDispatch(up()) } //up
    if(e.keyCode===40){ props.registerDispatch(down()) }  //down
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
    <input id="key-capture" autoFocus onKeyDown={(e)=>{keyDown(e)}} onKeyUp={(e)=>{keyUp(e)}} />
  );
}

export default Input;
