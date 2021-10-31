const rotateTo = (pos, des) => {
  let rotation = 0
  let diffX = (des[0] - pos[0])
  let diffY = (des[1] - pos[1])
  if (diffX>0&&diffY>0) {
    let divisor = diffX>=diffY?(diffY/diffX)/2:1-((diffX/diffY)/2)
    rotation = 90+(divisor*90)
  } 
  if (diffX<0&&diffY>0) {
    let divisor = Math.abs(diffX)>=diffY?1-(diffY/Math.abs(diffX))/2:((Math.abs(diffX)/diffY)/2)
    rotation = 180+(divisor*90)
  }
  if (diffX<0&&diffY<0) {
    let divisor = Math.abs(diffX)>=Math.abs(diffY)?(Math.abs(diffY)/Math.abs(diffX))/2:1-((Math.abs(diffX)/Math.abs(diffY))/2)
    rotation = 270+(divisor*90)
  }
  if (diffX>0&&diffY<0) {
    let divisor = diffX>=Math.abs(diffY)?1-(Math.abs(diffY)/diffX)/2:((diffX/Math.abs(diffY))/2)
    rotation = (divisor*90)
  }
  if(diffX===0&&diffY>0) {rotation = 180}
  if(diffX===0&&diffY<0) {rotation = 0}
  if(diffY===0&&diffX<0) {rotation = 270}
  if(diffY===0&&diffX>0) {rotation = 90}
  return rotation
}

export { rotateTo };