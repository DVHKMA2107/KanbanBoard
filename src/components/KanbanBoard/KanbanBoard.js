import React, { useState, useEffect, useRef } from 'react'
import { isEmpty, cloneDeep, isEqual } from 'lodash'
import { Container, Draggable } from 'react-smooth-dnd'
import {
  Container as ContainerBootstrap,
  Row,
  Col,
  Form,
  Button
} from 'react-bootstrap'
import { applyDrag } from 'utilities/dragDrop'
import { mapOrder } from 'utilities/sort'
import {
  fetchBoardDetailt,
  createNewColumn,
  updateBoard,
  updateColumn,
  updateCard
} from 'actions/ApiCall'
import Column from 'components/Column/Column'
import './KanbanBoard.scss'

const KanbanBoard = () => {
  const [board, setBoard] = useState({})
  const [columns, setColumns] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [enteredTitle, setEnteredTitle] = useState('')

  const inputRef = useRef()

  useEffect(() => {
    fetchBoardDetailt('62765f51e4a1f6340860be10').then((board) => {
      setBoard(board)
      setColumns(mapOrder(board.columns, board.columnOrder, '_id'))
    })
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
    let newColumns = cloneDeep(columns)
    newColumns = applyDrag(newColumns, dropResult)

    let newBoard = cloneDeep(board)
    newBoard.columnOrder = newColumns.map((column) => column._id)
    newBoard.columns = newColumns

    if (isEqual(newBoard.columnOrder, board.columnOrder)) {
      return
    }

    setColumns(newColumns)
    setBoard(newBoard)

    updateBoard(newBoard._id, newBoard).catch(() => {
      setColumns(columns)
      setBoard(board)
    })
  }

  const onCardDrop = (columnId, dropResult) => {
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      let newColumns = cloneDeep(columns)
      const currentColumn = newColumns.find((column) => column._id === columnId)
      currentColumn.cards = applyDrag(currentColumn.cards, dropResult)
      currentColumn.cardOrder = currentColumn.cards.map((card) => card._id)

      setColumns(newColumns)

      if (dropResult.addedIndex !== null && dropResult.removedIndex !== null) {
        if (dropResult.addedIndex === dropResult.removedIndex) {
          return
        }
        updateColumn(currentColumn._id, currentColumn).catch(() =>
          setColumns(columns)
        )
      } else {
        updateColumn(currentColumn._id, currentColumn).catch(() =>
          setColumns(columns)
        )

        if (dropResult.addedIndex !== null) {
          let currentCard = cloneDeep(dropResult.payload)
          currentCard.columnId = currentColumn._id
          updateCard(currentCard._id, currentCard)
        }
      }
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
      boardId: board._id,
      title: enteredTitle.trim()
    }

    createNewColumn(newColumnToAdd).then((column) => {
      let newColumns = [...columns]
      newColumns.push(column)
      let newBoard = { ...board }
      newBoard.columnOrder = newColumns.map((column) => column._id)
      newBoard.columns = newColumns

      setColumns(newColumns)
      setBoard(newBoard)
      setEnteredTitle('')
      toogleOpenInput()
    })
  }

  const onNewColumnTitleChangeHandle = (event) => {
    setEnteredTitle(event.target.value)
  }

  const onUpdateColumnState = (newColumnToUpdate) => {
    const columnIdToUpdate = newColumnToUpdate._id
    let newColumns = [...columns]
    const columnIndexToUpdate = newColumns.findIndex(
      (column) => column._id === columnIdToUpdate
    )
    if (newColumnToUpdate._destroy) {
      newColumns.splice(columnIndexToUpdate, 1)
    } else {
      newColumns.splice(columnIndexToUpdate, 1, newColumnToUpdate)
    }
    let newBoard = { ...board }
    newBoard.columnOrder = newColumns.map((column) => column._id)
    newBoard.columns = newColumns
    setColumns(newColumns)
    setBoard(newBoard)
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
            <Column
              column={item}
              onCardDrop={onCardDrop}
              onUpdateColumnState={onUpdateColumnState}
            />
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
              <span className="cancel-icon" onClick={toogleOpenInput}>
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
