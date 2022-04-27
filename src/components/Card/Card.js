import React from "react";

import "./Card.scss";

const Task = ({card}) => {
  return (
    <li className="card-item">
      {card.cover && <img src={card.cover} alt="hoadamviet" />}
      {card.title}
    </li>
  );
};

export default Task;
