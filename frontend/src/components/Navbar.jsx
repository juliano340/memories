import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  return (
    <nav className="navbar">
        <h2>
            <Link to="/">My Memories</Link>
        </h2>
        <ul>
            <li>
                <Link to="/">Início</Link>
            </li>
            <li>
                <Link to="/add-memory">Nova</Link>
            </li>
        </ul>

    </nav>
  )
}
