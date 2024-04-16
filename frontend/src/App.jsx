import { useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'

function App() {
  

  return (
    <>
      <h3>Memories</h3>
      <div className="container">
        <Outlet />
      </div>
    </>
  )
}

export default App
