import React, { useEffect, useState } from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import { Dropdown, Form } from 'react-bootstrap'

import Card from 'components/Card/Card'
import ConfirmModal from 'components/Common/ConfirmModal'
import { MODAL_ACTION_CONFIRM } from 'utilities/constants'
import {
  saveContentAfterPressEnter,
  selectAllInlineText
} from 'utilities/contentEditable'
import { mapOrder } from 'utilities/sort'

import './Column.scss'

const Column = ({ column, onCardDrop, onUpdateColumn }) => {
  const [isShowModal, setIsShowModal] = useState(false)
  const [columnTitle, setColumnTitle] = useState('')

  const cards = mapOrder(column.cards, column.cardOrder, 'id')

  useEffect(() => {
    setColumnTitle(column.title)
  }, [column.title])

  const toogleModalOpen = () => {
    setIsShowModal(!isShowModal)
  }

  const onConfirmModalAction = (type) => {
    if (type === MODAL_ACTION_CONFIRM) {
      const newColumn = {
        ...column,
        _destroy: true
      }

      onUpdateColumn(newColumn)
    }
    toogleModalOpen()
  }

  const handleColumnTitleChange = (e) => setColumnTitle(e.target.value)

  const handleColumnTitleBlur = () => {
    const newColumn = {
      ...column,
      title: columnTitle
    }
    onUpdateColumn(newColumn)
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
          onDrop={(dropResult) => onCardDrop(column.id, dropResult)}
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
      </div>
      <footer>
        <div className="footer-action">
          <i className="fa fa-plus icon" aria-hidden="true"></i>
          Add another card
        </div>
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
