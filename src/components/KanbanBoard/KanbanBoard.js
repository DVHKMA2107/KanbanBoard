import React from "react";

import Column from "components/Column/Column";

import "./KanbanBoard.scss";

const KanbanBoard = () => {
  return (
    <div className="board-colums">
      <Column />
      <Column />
      <Column />
      <Column />
      <Column />
      <Column />
    </div>
  );
};

export default KanbanBoard;
