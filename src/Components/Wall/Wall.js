import './Wall.css';


function Wall(props) {

let location = props.location

let x= location[0]+'vh'
let y= location[1]+'vh'
let z= location[1]


  return (
    <div className="wall" style={{backgroundColor: props.color,  position: 'absolute', top: y, left: x, zIndex: z}} >
    </div>
        
  );
}

export default Wall;
