import React from 'react'

import './Card.scss'

const Task = ({ card }) => {
  return (
    <div className="card-item">
      {card.cover && (
        <img
          src={card.cover}
          alt="hoadamviet"
          onMouseDown={(e) => e.preventDefault()}
        />
      )}
      {card.title}
    </div>
  )
}

export default Task
