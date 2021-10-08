import { doors } from '../collections/doors'

const openDoor = (location,rotation) => {
  doors.forEach((door,i)=>{
  let dimension 
    if(door.rotation===0) {dimension=[11,0]} else {dimension=[0,11]}
    if(door.location[0]<=Math.round(location[0])&&door.location[0]+dimension[0]>=Math.round(location[0])&&door.location[1]<=Math.round(location[1])&&door.location[1]+dimension[1]>=Math.round(location[1])){
      if(!door.state.includes('locked')) {
        alert(rotation)
        if(rotation>0&&rotation<180&&door.rotation===90){return {rotation:90, index: i}}
        if(rotation>180&&rotation<360&&door.rotation===90){return {rotation:-90, index: i}}
        if(rotation>90&&rotation<270&&door.rotation===0){return {rotation:90, index: i}}
        if((rotation>270||rotation<90)&&door.rotation===0){return {rotation:-90, index: i}}
      } else {
        return false
      }
    } else {
      return false
    }
  })
}

export { openDoor };