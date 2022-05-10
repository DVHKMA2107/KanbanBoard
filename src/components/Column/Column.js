import React, { useEffect, useState, useRef } from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import { Dropdown, Form, Button } from 'react-bootstrap'
import { cloneDeep } from 'lodash'

import Card from 'components/Card/Card'
import ConfirmModal from 'components/Common/ConfirmModal'
import { createNewCard, updateColumn } from 'actions/ApiCall'
import { MODAL_ACTION_CONFIRM } from 'utilities/constants'
import {
  saveContentAfterPressEnter,
  selectAllInlineText
} from 'utilities/contentEditable'
import { mapOrder } from 'utilities/sort'

import './Column.scss'

const Column = ({ column, onCardDrop, onUpdateColumnState }) => {
  const [isShowModal, setIsShowModal] = useState(false)
  const [columnTitle, setColumnTitle] = useState('')
  const [openNewCardForm, setOpenNewCardForm] = useState(false)
  const [enteredCardTitle, setEnteredCardTitle] = useState('')

  const inputRef = useRef(null)

  const cards = mapOrder(column.cards, column.cardOrder, '_id')

  useEffect(() => {
    setColumnTitle(column.title)
  }, [column.title])

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [openNewCardForm])

  const toogleModalOpen = () => {
    setIsShowModal(!isShowModal)
  }

  const toogleOpenNewCardForm = () => setOpenNewCardForm(!openNewCardForm)

  const onConfirmModalAction = (type) => {
    if (type === MODAL_ACTION_CONFIRM) {
      const newColumn = {
        ...column,
        _destroy: true
      }

      updateColumn(newColumn._id, newColumn).then((columnUpdated) => {
        onUpdateColumnState(columnUpdated)
      })
    }
    toogleModalOpen()
  }

  const handleColumnTitleChange = (e) => setColumnTitle(e.target.value)

  const handleCardTitleChange = (e) => setEnteredCardTitle(e.target.value)

  const handleColumnTitleBlur = () => {
    if (columnTitle !== column.title) {
      const newColumn = {
        ...column,
        title: columnTitle
      }

      updateColumn(newColumn._id, newColumn).then((columnUpdated) => {
        columnUpdated.cards = newColumn.cards
        onUpdateColumnState(columnUpdated)
      })
    }
  }

  const addNewCard = () => {
    if (!enteredCardTitle) {
      inputRef.current.focus()
      return
    }

    const newCardToAdd = {
      boardId: column.boardId,
      columnId: column._id,
      title: enteredCardTitle
    }

    createNewCard(newCardToAdd).then((card) => {
      let newColumn = cloneDeep(column)
      newColumn.cards.push(card)
      newColumn.cardOrder.push(card._id)

      onUpdateColumnState(newColumn)
      setEnteredCardTitle('')
      toogleOpenNewCardForm()
    })
  }

  return (
    <div className="column">
      <header className="column-drag-handle">
        <div className="column-title">
          <Form.Control
            size="sm"
            type="text"
            className="content-editable"
            value={columnTitle}
            onChange={handleColumnTitleChange}
            onClick={selectAllInlineText}
            onBlur={handleColumnTitleBlur}
            onKeyDown={saveContentAfterPressEnter}
            onMouseDown={(e) => e.preventDefault()}
            spellCheck="false"
          />
        </div>
        <div className="column-dropdown-actions">
          <Dropdown>
            <Dropdown.Toggle
              id="dropdown-basic"
              size="sm"
              className="button-dropdown"
            />

            <Dropdown.Menu>
              <Dropdown.Item>Add Card ...</Dropdown.Item>
              <Dropdown.Item onClick={toogleModalOpen}>
                Remove Column ...
              </Dropdown.Item>
              <Dropdown.Item>Move all card in this column (Beta)</Dropdown.Item>
              <Dropdown.Item>Archive all card (Beta)</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </header>
      <div className="card-list">
        <Container
          groupName="col"
          onDrop={(dropResult) => onCardDrop(column._id, dropResult)}
          getChildPayload={(index) => cards[index]}
          dragClass="card-ghost"
          dropClass="card-ghost-drop"
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: 'card-drop-preview'
          }}
          dropPlaceholderAnimationDuration={200}
        >
          {cards.map((card, index) => (
            <Draggable key={index}>
              <Card card={card} />
            </Draggable>
          ))}
        </Container>
        {openNewCardForm && (
          <div className="add-new-card-area">
            <Form.Control
              size="sm"
              as="textarea"
              rows={3}
              placeholder="Enter a title for this card ..."
              className="enter-new-card-area"
              ref={inputRef}
              value={enteredCardTitle}
              onChange={handleCardTitleChange}
              onKeyDown={(e) => e.key === 'Enter' && addNewCard()}
            />
          </div>
        )}
      </div>
      <footer>
        {openNewCardForm && (
          <div className="add-new-card-actions">
            <Button variant="success" size="sm" onClick={addNewCard}>
              Add Card
            </Button>
            <span className="cancel-icon" onClick={toogleOpenNewCardForm}>
              <i className="fa fa-trash icon"></i>
            </span>
          </div>
        )}
        {!openNewCardForm && (
          <div className="footer-action" onClick={toogleOpenNewCardForm}>
            <i className="fa fa-plus icon" aria-hidden="true"></i>
            Add another card
          </div>
        )}
      </footer>

      <ConfirmModal
        isShow={isShowModal}
        onAction={onConfirmModalAction}
        title="Remove column"
        content={`Are you sure you want to remove <strong>${column.title} </strong>. <br> All related card will alse be removed`}
      />
    </div>
  )
}

export default Column
