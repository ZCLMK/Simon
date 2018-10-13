import React from 'react';

const switchWrapper = (props) => {
  return (
    <div id="switch" onClick={props.handleSwitchOn}>
      <div id="switch-btn"></div>
    </div>
  )
}

export default switchWrapper;