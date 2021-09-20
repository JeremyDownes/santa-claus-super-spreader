const calculate2dRotation = (rotation) => {
  let rot = rotation/5
  let x, y
  if (rot <= 18) {
      x=.05555*rot
      y=-1+Math.abs(x)
  }
  if (rot > 18 && rot <= 36) {
      y= .05555*(rot-18)
      x= 1-Math.abs(y)
  }
  if (rot > 36 && rot <= 54) {
      x=-.05555*(rot-36)
      y=1-Math.abs(x)
  }
  if (rot >= 54) {
      y=-.05555*(rot-54)
      x=-1+Math.abs(y)
  }
  return [x,y]
}

export { calculate2dRotation };