import Switch from './Switch/Switch';
import Button from './Button/Button';
import Display from './Display/Display';
import React from 'react';

const controls = (props) =>{
   return(
     <div id="controls">
        <div id="controls-top">
          <Display currentMessage={props.currentMessage} />
          <Button btnId="start" btnName="Start" reset={props.reset}/>  
          <Button btnId="strict" btnName="Strict" activateStrict={props.activateStrict} hasLed />  
        </div>
        <div id="controls-bottom">
        
          <div className="control-name">Off</div>
          <Switch handleSwitchOn={props.handleSwitchOn}/>
          <div className="control-name">On</div>

        </div>
     </div>
   )
 }

 export default controls;