import Controls from "./Controls/Controls";
import React from 'react';

const dashboard = (props) => {
  return (
    <div id="dashboard">
      <div id="dashboard-top">
        <h1>Simon <span className="registered">&reg;</span></h1>
      </div>
      <Controls 
        reset={props.reset}
        activateStrict={props.activateStrict}
        handleSwitchOn={props.handleSwitchOn}
        currentMessage={props.currentMessage}
      />
    </div>
     
  )
}

export default dashboard;