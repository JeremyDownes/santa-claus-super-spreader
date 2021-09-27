import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import './Player.css';

function Player(props) {

const x = useSelector((state) => state.app.x)
const y = useSelector((state) => state.app.y)
const rotation = useSelector((state) => state.app.rotation)
const isMoving = useSelector((state) => state.app.isMoving)
let bgclass


  if (rotation>338||rotation<=22) {bgclass='stand-back'}
  if (rotation>22&&rotation<=67) {bgclass='stand-backRight'}
  if (rotation>67&&rotation<=112) {bgclass='stand-left'}
  if (rotation>112&&rotation<=158) {bgclass='stand-forwardLeft'}    
  if (rotation>158&&rotation<=202) {bgclass='stand-forward'}    
  if (rotation>202&&rotation<=248) {bgclass='stand-forwardRight'}    
  if (rotation>248&&rotation<=292) {bgclass='stand-right'}    
  if (rotation>292&&rotation<=338) {bgclass='stand-backLeft'}   

if(isMoving) {
  
  if (rotation>338||rotation<=22) {bgclass='back'}
  if (rotation>22&&rotation<=67) {bgclass='backRight'}
  if (rotation>67&&rotation<=112) {bgclass='left'}
  if (rotation>112&&rotation<=158) {bgclass='forwardLeft'}    
  if (rotation>158&&rotation<=202) {bgclass='forward'}    
  if (rotation>202&&rotation<=248) {bgclass='forwardRight'}    
  if (rotation>248&&rotation<=292) {bgclass='right'}    
  if (rotation>292&&rotation<=338) {bgclass='backLeft'}   
}


let xstring = x+'vh'
let ystring = y+'vh'

  return (
    <div id="player"  >
        <div id='piece' className={bgclass} style={{top: ystring, left: xstring, zIndex: Math.floor(y)}}></div>
    </div>
        
  );
}

export default Player;
