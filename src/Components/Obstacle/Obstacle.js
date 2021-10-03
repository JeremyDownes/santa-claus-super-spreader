import './Obstacle.css';


function Obstacle(props) {

let location = props.location

let x= location[0]+'vh'
let y= location[1]+'vh'
let z= Math.round(location[1]+props.height)

  return (
    <div className={"obstacle "+props.type} style={{width: props.width+'vh', height: props.height+'vh',  top: y, left: x, zIndex: z}} >
    </div>
  );
}

export default Obstacle;