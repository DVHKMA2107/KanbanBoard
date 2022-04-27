import React, {useState, useEffect} from "react";
import {isEmpty} from "lodash";
import {initialData} from "actions/initialData";
import {mapOrder} from "utilities/sort";

import Column from "components/Column/Column";

import "./KanbanBoard.scss";

const KanbanBoard = () => {
  const [board, setBoard] = useState({});
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const boardFromDB = initialData.boards.find(
      (board) => board.id === "board-1"
    );
    if (boardFromDB) {
      setBoard(boardFromDB);
      setColumns(mapOrder(boardFromDB.columns, boardFromDB.columnOrder, "id"));
    }
  }, []);

  if (isEmpty(board)) {
    return <div>Board not found</div>;
  }

  return (
    <div className="board-colums">
      {columns.map((item, index) => (
        <Column key={index} column={item} />
      ))}
    </div>
  );
};

export default KanbanBoard;
