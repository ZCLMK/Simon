import React  from 'react';

const display = (props) => {
  
  return(
    <div id="control-top">
      <div className="screen">
        <p>{props.currentMessage}</p>
      </div>
      <div className="control-name">Count</div>
    </div>
  )
}

export default display;