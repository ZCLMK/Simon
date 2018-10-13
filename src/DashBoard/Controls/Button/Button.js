import React from 'react';

const Button = (props) =>{

  const strictLed = props.hasLed ? <div id="strict-led"></div> : null  ;
  // Render a div with the right onclick (cannot have duplicate props eg 2 onclick on one element)
  const btn = props.activateStrict ? 
   
    <div  id={props.btnId} onClick={props.activateStrict}></div> :   
    <div id={props.btnId} onClick={props.reset}></div>

  return (  

  <div id="control-top">
      {strictLed}
      {btn}
    <div className="control-name">{props.btnName}</div>
  </div>
  )
}

export default Button; 