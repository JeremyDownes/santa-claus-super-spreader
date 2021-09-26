import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import './Player.css';
import forward from '../../resources/images/santaforward.gif';
import forwardRight from '../../resources/images/santaforwardright.gif';
import forwardLeft from '../../resources/images/santaforwardleft.gif';
import back from '../../resources/images/santaback.gif';
import backRight from '../../resources/images/santabackright.gif';
import backLeft from '../../resources/images/santabackleft.gif';

function Player(props) {

const x = useSelector((state) => state.app.x)
const y = useSelector((state) => state.app.y)
const rotation = useSelector((state) => state.app.rotation)
let image = back

  if (rotation>338||rotation<=22) {image=back}
  if (rotation>22&&rotation<=67) {image=backRight}
  if (rotation>112&&rotation<=158) {image=forwardLeft}    
  if (rotation>158&&rotation<=202) {image=forward}    
  if (rotation>202&&rotation<=248) {image=forwardRight}    
  if (rotation>292&&rotation<=338) {image=backLeft}   

let xstring = x+'vh'
let ystring = y+'vh'

  return (
    <div id="player"  >
        <div id='piece' style={{top: ystring, left: xstring, zIndex: Math.floor(y), backgroundImage: 'url('+image+')' }}></div>
    </div>
        
  );
}

export default Player;
