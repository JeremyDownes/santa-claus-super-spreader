import './Door.css';


function Door(props) {
let location = props.location

let x= location[0]+'vh'
let y= location[1]+'vh'
let z= location[1]+16


  return (
    <div className={"door "+props.state} style={{position: 'absolute', top: y, left: x, zIndex: z}} ></div>
        
  );
}

export default Door;
