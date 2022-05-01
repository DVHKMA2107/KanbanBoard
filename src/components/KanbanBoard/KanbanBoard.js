import React, { useState, useEffect, useRef } from 'react'
import { isEmpty } from 'lodash'
import { Container, Draggable } from 'react-smooth-dnd'
import {
  Container as ContainerBootstrap,
  Row,
  Col,
  Form,
  Button
} from 'react-bootstrap'
import { initialData } from 'actions/initialData'
import { applyDrag } from 'utilities/dragDrop'

import Column from 'components/Column/Column'

import { mapOrder } from 'utilities/sort'

import './KanbanBoard.scss'

const KanbanBoard = () => {
  const [board, setBoard] = useState({})
  const [columns, setColumns] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [enteredTitle, setEnteredTitle] = useState('')

  const inputRef = useRef()

  useEffect(() => {
    const boardFromDB = initialData.boards.find(
      (board) => board.id === 'board-1'
    )
    if (boardFromDB) {
      setBoard(boardFromDB)
      setColumns(mapOrder(boardFromDB.columns, boardFromDB.columnOrder, 'id'))
    }
  }, [])

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isOpen])

  if (isEmpty(board)) {
    return <div>Board not found</div>
  }

  const onColumnDrop = (dropResult) => {
    let newColumns = [...columns]
    newColumns = applyDrag(newColumns, dropResult)

    let newBoard = { ...board }
    newBoard.columnOrder = newColumns.map((column) => column.id)
    newBoard.columns = newColumns

    setColumns(newColumns)
    setBoard(newBoard)
  }

  const onCardDrop = (columnId, dropResult) => {
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      let newColumns = [...columns]
      const currentColumn = newColumns.find((column) => column.id === columnId)
      currentColumn.cards = applyDrag(currentColumn.cards, dropResult)
      currentColumn.cardOrder = currentColumn.cards.map((card) => card.id)
      setColumns(newColumns)
    }
  }

  const toogleOpenInput = () => {
    setIsOpen(!isOpen)
  }

  const addNewColumn = () => {
    if (!enteredTitle) {
      inputRef.current.focus()
      return
    }

    const newColumnToAdd = {
      id: Math.random().toString(36).substring(2, 5),
      boardId: board.id,
      title: enteredTitle,
      cards: [],
      cardOrder: []
    }

    let newColumns = [...columns]
    newColumns.push(newColumnToAdd)
    let newBoard = { ...board }
    newBoard.columnOrder = newColumns.map((column) => column.id)
    newBoard.columns = newColumns

    setColumns(newColumns)
    setBoard(newBoard)
    setEnteredTitle('')

    toogleOpenInput()
  }

  const onNewColumnTitleChangeHandle = (event) => {
    setEnteredTitle(event.target.value)
  }

  return (
    <div className="board-colums">
      <Container
        orientation="horizontal"
        onDrop={onColumnDrop}
        getChildPayload={(index) => columns[index]}
        dragHandleSelector=".column-drag-handle"
        dropPlaceholder={{
          animationDuration: 150,
          showOnTop: true,
          className: 'column-drop-preview'
        }}
      >
        {columns.map((item, index) => (
          <Draggable key={index}>
            <Column column={item} onCardDrop={onCardDrop} />
          </Draggable>
        ))}
      </Container>
      <ContainerBootstrap className="bootstrap-container">
        {!isOpen && (
          <Row>
            <Col className="add-column" onClick={toogleOpenInput}>
              <i className="fa fa-plus icon" aria-hidden="true"></i>
              Add another column
            </Col>
          </Row>
        )}
        {isOpen && (
          <Row>
            <Col className="enter-new-column">
              <Form.Control
                size="sm"
                type="text"
                placeholder="Enter column title..."
                className="input-enter-new-column"
                ref={inputRef}
                value={enteredTitle}
                onChange={onNewColumnTitleChangeHandle}
                onKeyDown={(e) => e.key === 'Enter' && addNewColumn()}
              />
              <Button variant="success" size="sm" onClick={addNewColumn}>
                Add Column
              </Button>
              <span className="cancel-input-enter" onClick={toogleOpenInput}>
                <i className="fa fa-trash icon"></i>
              </span>
            </Col>
          </Row>
        )}
      </ContainerBootstrap>
    </div>
  )
}

export default KanbanBoard
