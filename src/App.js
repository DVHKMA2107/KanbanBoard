import React from 'react'

import AppBar from 'components/AppBar/AppBar'
import BoardBar from 'components/BoardBar/BoardBar'
import KanbanBoard from 'components/KanbanBoard/KanbanBoard'

import './App.scss'

function App() {
  return (
    <div className='app'>
      <AppBar />
      <BoardBar />
      <KanbanBoard />
    </div>
  )
}

export default App
