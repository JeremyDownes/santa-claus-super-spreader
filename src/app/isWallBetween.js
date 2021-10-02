
const isWallBetween = (walls,a,b) => {
  let isBetween = false
  walls.forEach((wall)=>{
    if ( ( (wall.location[0]<=a[0]&&wall.location[0]>=b[0])||(wall.location[0]>=a[0]&&wall.location[0]<=b[0]) ) && ( (wall.location[1]<=a[1]&&wall.location[1]>=b[1])||(wall.location[1]>=a[1]&&wall.location[1]<=b[1]) ) ) { isBetween=true }
  })
  return isBetween
}

export { isWallBetween };