import React  from 'react';

const pad = (props) => {
  return (
    <div 
      className={`pad ${props.class}`}
      onMouseDown={props.handlePadClick}
      onMouseUp={props.handlePadRelease}
      onTouchStart={props.handPadClick}
      onTouchEnd={props.handlePadRelease}
      >
    </div>
  )
}

export default pad;