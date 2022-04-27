import React from "react";

import "./Task.scss";
import image1 from "assets/image-1.jpg";

const Task = () => {
  return (
    <li className="task-item">
      <img src={image1} alt="hoadamviet" />
      Title: Dam Viet Hoa (Jerry)
    </li>
  );
};

export default Task;
