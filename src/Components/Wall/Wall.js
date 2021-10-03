import './Wall.css';


function Wall(props) {

let location = props.location

let x= location[0]+'vh'
let y= location[1]+'vh'
let z= location[1]


  return (
    <div>
    <div className="wall" style={{backgroundColor: props.color,  position: 'absolute', top: y, left: x, zIndex: z}} ></div>
    {props.content?<div className={props.content} style={{position: 'absolute', top: y, left: x, zIndex: z+1}}></div>:null}
    </div>
        
  );
}

export default Wall;
